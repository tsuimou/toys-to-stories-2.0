import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Builder, LocalSigner } from '@contentauth/c2pa-node';

// Test certificates for development - replace with production certs in deployment
const TEST_PRIVATE_KEY = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIB5Ab4Coj7sUwPe2nOWr9R7Rc4dtaUXvfEs1OtBm/46LoAoGCCqGSM49
AwEHoUQDQgAEPfUyOnCwouF+0XRhi0aYYMgRvbs8AUlqudxAwbiS+VbgELh4v73u
nAsiEkfIapVAkgRazLWVRtAbQVlqC6nHgw==
-----END EC PRIVATE KEY-----`;

const TEST_CERTIFICATE = `-----BEGIN CERTIFICATE-----
MIIBcTCCARYCCQD4FSNZwNXtAzAKBggqhkjOPQQDAjBAMRswGQYDVQQDDBJUb3lz
VG9TdG9yaWVzIFRlc3QxFDASBgNVBAoMC0RldmVsb3BtZW50MQswCQYDVQQGEwJV
UzAeFw0yNjAxMjkxMTIwNTRaFw0yNzAxMjkxMTIwNTRaMEAxGzAZBgNVBAMMElRv
eXNUb1N0b3JpZXMgVGVzdDEUMBIGA1UECgwLRGV2ZWxvcG1lbnQxCzAJBgNVBAYT
AlVTMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEPfUyOnCwouF+0XRhi0aYYMgR
vbs8AUlqudxAwbiS+VbgELh4v73unAsiEkfIapVAkgRazLWVRtAbQVlqC6nHgzAK
BggqhkjOPQQDAgNJADBGAiEA5V7qAKnBS6p1cQYdhIrJBu/9UqKKtog1BnImjJeN
I7oCIQC7c+FBgVso1yURGx0Iq7pqQLncspn9L0J327F+yeiJ6w==
-----END CERTIFICATE-----`;

interface SignImageRequest {
  imageBase64: string;
  mimeType: string;
  pageNumber?: number;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, mimeType, pageNumber } = req.body as SignImageRequest;

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({ error: 'Missing imageBase64 or mimeType' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(imageBase64, 'base64');

    // Create the signer with test certificates
    const certBuffer = Buffer.from(TEST_CERTIFICATE);
    const keyBuffer = Buffer.from(TEST_PRIVATE_KEY);

    const signer = LocalSigner.newSigner(
      certBuffer,
      keyBuffer,
      'es256'
    );

    // Create builder with manifest
    const builder = Builder.new();

    // Add c2pa.actions assertion indicating AI generation
    builder.addAssertion('c2pa.actions', {
      actions: [
        {
          action: 'c2pa.created',
          digitalSourceType: 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
          softwareAgent: {
            name: 'Google Gemini AI',
            version: '2.5-flash-image'
          }
        }
      ]
    });

    // Add creative work assertion with creator info
    builder.addAssertion('stds.schema-org.CreativeWork', {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      author: [
        {
          '@type': 'Organization',
          name: 'Toys to Stories',
          url: 'https://toys-to-stories.vercel.app'
        }
      ],
      ...(pageNumber !== undefined && {
        name: `Story Illustration - Page ${pageNumber}`
      })
    });

    // Input asset configuration
    const inputAsset = {
      buffer: imageBuffer,
      mimeType: mimeType
    };

    // Output asset will receive the signed image
    const outputAsset = {
      buffer: null as Buffer | null
    };

    // Sign the image with C2PA manifest
    builder.sign(signer, inputAsset, outputAsset);

    if (!outputAsset.buffer) {
      throw new Error('Failed to generate signed image');
    }

    // Convert signed image back to base64
    const signedImageBase64 = outputAsset.buffer.toString('base64');

    return res.status(200).json({
      success: true,
      signedImageBase64,
      mimeType
    });

  } catch (error) {
    console.error('C2PA signing error:', error);
    return res.status(500).json({
      error: 'Failed to sign image with C2PA credentials',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
