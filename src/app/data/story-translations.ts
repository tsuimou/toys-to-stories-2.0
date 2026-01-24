// Story translations for different languages

export interface StoryPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
  vocabWords: VocabWord[];
}

export interface VocabWord {
  word: string;
  pronunciation: string;
  definition: string;
  icon?: string;
}

const imageUrls = {
  teddyBear: "https://images.unsplash.com/photo-1753928578920-c3e936415a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjB0b3l8ZW58MXx8fHwxNzY5MTc3MDYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  forest: "https://images.unsplash.com/photo-1573689705959-7786e029b31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwZm9yZXN0fGVufDF8fHx8MTc2OTE2MjMxMnww&ixlib=rb-4.1.0&q=80&w=1080",
  blocks: "https://images.unsplash.com/photo-1485783522162-1dbb8ffcbe5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJsb2NrcyUyMHRveXN8ZW58MXx8fHwxNzY5MjE3MDMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  rainbow: "https://images.unsplash.com/photo-1718138990279-97c54c2dd00e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluYm93JTIwc2t5fGVufDF8fHx8MTc2OTIxNzAzNHww&ixlib=rb-4.1.0&q=80&w=1080",
  dinosaur: "https://images.unsplash.com/photo-1607948471407-3af873dda505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3klMjBkaW5vc2F1cnxlbnwxfHx8fDE3NjkyMTcwMzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
};

export const storyTranslations: Record<string, { pages: StoryPage[], vocabulary: VocabWord[] }> = {
  Spanish: {
    pages: [
      {
        pageNumber: 1,
        text: "Había una vez un valiente osito de peluche llamado Benny. Vivía en un acogedor dormitorio con juguetes coloridos por todas partes.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "valiente",
            pronunciation: "va-lien-te",
            definition: "Alguien que no tiene miedo y tiene coraje para hacer cosas difíciles."
          },
          {
            word: "acogedor",
            pronunciation: "a-co-ge-dor",
            definition: "Cálido, cómodo y que te hace sentir seguro y feliz."
          }
        ]
      },
      {
        pageNumber: 2,
        text: "Un día, Benny decidió explorar el misterioso bosque detrás del baúl de juguetes. Su corazón estaba lleno de asombro y emoción.",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "misterioso",
            pronunciation: "mis-te-rio-so",
            definition: "Algo extraño e interesante sobre lo que quieres aprender más."
          },
          {
            word: "asombro",
            pronunciation: "a-som-bro",
            definition: "Un sentimiento de sorpresa y admiración por algo hermoso o especial."
          }
        ]
      },
      {
        pageNumber: 3,
        text: "En el bosque, Benny conoció nuevos amigos - bloques que podían construir cualquier cosa y un sabio dinosaurio viejo que contaba historias increíbles.",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "Juntos, construyeron un puente arcoíris mágico que brillaba bajo la luz del sol. Benny aprendió que la amistad hace que cada aventura sea especial.",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "Cuando el sol se puso, Benny regresó a casa con el corazón lleno de alegría. Sabía que mañana traería nuevas aventuras con sus amigos juguetes.",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "Y así, Benny el oso valiente se durmió, soñando con todos los maravillosos amigos que había hecho y los emocionantes viajes por venir. Fin.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "valiente",
        pronunciation: "va-lien-te",
        definition: "Alguien que no tiene miedo y tiene coraje para hacer cosas difíciles.",
        icon: "🦁"
      },
      {
        word: "acogedor",
        pronunciation: "a-co-ge-dor",
        definition: "Cálido, cómodo y que te hace sentir seguro y feliz.",
        icon: "🏠"
      },
      {
        word: "misterioso",
        pronunciation: "mis-te-rio-so",
        definition: "Algo extraño e interesante sobre lo que quieres aprender más.",
        icon: "🔍"
      },
      {
        word: "asombro",
        pronunciation: "a-som-bro",
        definition: "Un sentimiento de sorpresa y admiración por algo hermoso o especial.",
        icon: "✨"
      }
    ]
  },
  French: {
    pages: [
      {
        pageNumber: 1,
        text: "Il était une fois un petit ours en peluche courageux nommé Benny. Il vivait dans une chambre confortable avec des jouets colorés partout.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "courageux",
            pronunciation: "ku-ra-jø",
            definition: "Quelqu'un qui n'a pas peur et a le courage de faire des choses difficiles."
          },
          {
            word: "confortable",
            pronunciation: "kɔ̃-fɔr-tabl",
            definition: "Chaud, agréable et qui te fait sentir en sécurité et heureux."
          }
        ]
      },
      {
        pageNumber: 2,
        text: "Un jour, Benny a décidé d'explorer la forêt mystérieuse derrière le coffre à jouets. Son cœur était rempli d'émerveillement et d'excitation.",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "mystérieuse",
            pronunciation: "mis-te-ri-øz",
            definition: "Quelque chose d'étrange et intéressant que tu veux en savoir plus."
          },
          {
            word: "émerveillement",
            pronunciation: "e-mɛr-vɛj-mɑ̃",
            definition: "Un sentiment de surprise et d'émerveillement devant quelque chose de beau ou spécial."
          }
        ]
      },
      {
        pageNumber: 3,
        text: "Dans la forêt, Benny a rencontré de nouveaux amis - des blocs qui pouvaient tout construire et un vieux dinosaure sage qui racontait des histoires incroyables.",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "Ensemble, ils ont construit un pont arc-en-ciel magique qui brillait au soleil. Benny a appris que l'amitié rend chaque aventure spéciale.",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "Au coucher du soleil, Benny est rentré chez lui le cœur plein de joie. Il savait que demain apporterait de nouvelles aventures avec ses amis jouets.",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "Et ainsi, Benny l'ours courageux s'est endormi, rêvant de tous les merveilleux amis qu'il avait rencontrés et des voyages passionnants à venir. Fin.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "courageux",
        pronunciation: "ku-ra-jø",
        definition: "Quelqu'un qui n'a pas peur et a le courage de faire des choses difficiles.",
        icon: "🦁"
      },
      {
        word: "confortable",
        pronunciation: "kɔ̃-fɔr-tabl",
        definition: "Chaud, agréable et qui te fait sentir en sécurité et heureux.",
        icon: "🏠"
      },
      {
        word: "mystérieuse",
        pronunciation: "mis-te-ri-øz",
        definition: "Quelque chose d'étrange et intéressant que tu veux en savoir plus.",
        icon: "🔍"
      },
      {
        word: "émerveillement",
        pronunciation: "e-mɛr-vɛj-mɑ̃",
        definition: "Un sentiment de surprise et d'émerveillement devant quelque chose de beau ou spécial.",
        icon: "✨"
      }
    ]
  },
  German: {
    pages: [
      {
        pageNumber: 1,
        text: "Es war einmal ein mutiger kleiner Teddybär namens Benny. Er lebte in einem gemütlichen Schlafzimmer mit bunten Spielzeugen überall.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "mutig",
            pronunciation: "mu-tɪç",
            definition: "Jemand, der keine Angst hat und Mut hat, schwierige Dinge zu tun."
          },
          {
            word: "gemütlich",
            pronunciation: "gə-my:t-lɪç",
            definition: "Warm, bequem und gibt dir ein sicheres und glückliches Gefühl."
          }
        ]
      },
      {
        pageNumber: 2,
        text: "Eines Tages beschloss Benny, den geheimnisvollen Wald hinter der Spielzeugkiste zu erkunden. Sein Herz war voller Staunen und Aufregung.",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "geheimnisvoll",
            pronunciation: "gə-haɪm-nɪs-fɔl",
            definition: "Etwas Seltsames und Interessantes, über das du mehr erfahren möchtest."
          },
          {
            word: "Staunen",
            pronunciation: "ʃtaʊ-nən",
            definition: "Ein Gefühl der Überraschung und Bewunderung für etwas Schönes oder Besonderes."
          }
        ]
      },
      {
        pageNumber: 3,
        text: "Im Wald traf Benny neue Freunde - Bausteine, die alles bauen konnten, und einen weisen alten Dinosaurier, der erstaunliche Geschichten erzählte.",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "Zusammen bauten sie eine magische Regenbogenbrücke, die im Sonnenlicht funkelte. Benny lernte, dass Freundschaft jedes Abenteuer besonders macht.",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "Als die Sonne unterging, kehrte Benny mit einem Herzen voller Freude nach Hause zurück. Er wusste, dass morgen neue Abenteuer mit seinen Spielzeugfreunden bringen würde.",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "Und so schlief Benny der mutige Bär ein und träumte von all den wunderbaren Freunden, die er gefunden hatte, und den aufregenden Reisen, die noch kommen würden. Ende.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "mutig",
        pronunciation: "mu-tɪç",
        definition: "Jemand, der keine Angst hat und Mut hat, schwierige Dinge zu tun.",
        icon: "🦁"
      },
      {
        word: "gemütlich",
        pronunciation: "gə-my:t-lɪç",
        definition: "Warm, bequem und gibt dir ein sicheres und glückliches Gefühl.",
        icon: "🏠"
      },
      {
        word: "geheimnisvoll",
        pronunciation: "gə-haɪm-nɪs-fɔl",
        definition: "Etwas Seltsames und Interessantes, über das du mehr erfahren möchtest.",
        icon: "🔍"
      },
      {
        word: "Staunen",
        pronunciation: "ʃtaʊ-nən",
        definition: "Ein Gefühl der Überraschung und Bewunderung für etwas Schönes oder Besonderes.",
        icon: "✨"
      }
    ]
  },
  Japanese: {
    pages: [
      {
        pageNumber: 1,
        text: "むかしむかし、ベニーという名前の勇敢な小さなテディベアがいました。彼はカラフルなおもちゃに囲まれた居心地の良い寝室に住んでいました。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "勇敢な (ゆうかんな)",
            pronunciation: "yū-kan-na",
            definition: "恐れることなく、困難なことをする勇気を持っている人。"
          },
          {
            word: "居心地の良い (いごこちのよい)",
            pronunciation: "i-go-ko-chi-no-yo-i",
            definition: "暖かく、快適で、安全で幸せな気分にさせてくれる。"
          }
        ]
      },
      {
        pageNumber: 2,
        text: "ある日、ベニーはおもちゃ箱の後ろにある不思議な森を探検することにしました。彼の心は驚きと興奮でいっぱいでした。",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "不思議な (ふしぎな)",
            pronunciation: "fu-shi-gi-na",
            definition: "奇妙で興味深く、もっと知りたいと思うこと。"
          },
          {
            word: "驚き (おどろき)",
            pronunciation: "o-do-ro-ki",
            definition: "美しいものや特別なものに対する驚きと感動の気持ち。"
          }
        ]
      },
      {
        pageNumber: 3,
        text: "森の中で、ベニーは新しい友達に出会いました - 何でも作れるブロックと、素晴らしい物語を語る賢い古い恐竜です。",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "一緒に、彼らは太陽の光できらめく魔法の虹の橋を作りました。ベニーは友情がすべての冒険を特別なものにすることを学びました。",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "日が沈むと、ベニーは喜びでいっぱいの心で家に帰りました。彼は明日がおもちゃの友達との新しい冒険をもたらすことを知っていました。",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "そして、勇敢なクマのベニーは眠りにつき、出会ったすべての素晴らしい友達とこれから来る刺激的な旅について夢を見ました。おしまい。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "勇敢な (ゆうかんな)",
        pronunciation: "yū-kan-na",
        definition: "恐れることなく、困難なことをする勇気を持っている人。",
        icon: "🦁"
      },
      {
        word: "居心地の良い (いごこちのよい)",
        pronunciation: "i-go-ko-chi-no-yo-i",
        definition: "暖かく、快適で、安全で幸せな気分にさせてくれる。",
        icon: "🏠"
      },
      {
        word: "不思議な (ふしぎな)",
        pronunciation: "fu-shi-gi-na",
        definition: "奇妙で興味深く、もっと知りたいと思うこと。",
        icon: "🔍"
      },
      {
        word: "驚き (おどろき)",
        pronunciation: "o-do-ro-ki",
        definition: "美しいものや特別なものに対する驚きと感動の気持ち。",
        icon: "✨"
      }
    ]
  },
  Korean: {
    pages: [
      {
        pageNumber: 1,
        text: "옛날 옛적에 베니라는 이름의 용감한 작은 테디베어가 있었습니다. 그는 형형색색의 장난감들로 가득한 아늑한 침실에 살았습니다.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "용감한",
            pronunciation: "yong-gam-han",
            definition: "두려워하지 않고 어려운 일을 할 용기가 있는 사람."
          },
          {
            word: "아늑한",
            pronunciation: "a-neuk-han",
            definition: "따뜻하고 편안하며 안전하고 행복한 느낌을 주는 것."
          }
        ]
      },
      {
        pageNumber: 2,
        text: "어느 날, 베니는 장난감 상자 뒤에 있는 신비로운 숲을 탐험하기로 결심했습니다. 그의 마음은 경이로움과 흥분으로 가득 찼습니다.",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "신비로운",
            pronunciation: "sin-bi-ro-un",
            definition: "이상하고 흥미로워서 더 알고 싶어지는 것."
          },
          {
            word: "경이로움",
            pronunciation: "gyeong-i-ro-um",
            definition: "아름답거나 특별한 것에 대한 놀라움과 감탄의 느낌."
          }
        ]
      },
      {
        pageNumber: 3,
        text: "숲에서 베니는 새로운 친구들을 만났습니다 - 무엇이든 만들 수 있는 블록들과 놀라운 이야기를 들려주는 현명한 늙은 공룡이었습니다.",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "함께, 그들은 햇빛에 반짝이는 마법의 무지개 다리를 만들었습니다. 베니는 우정이 모든 모험을 특별하게 만든다는 것을 배웠습니다.",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "해가 지자, 베니는 기쁨으로 가득 찬 마음으로 집으로 돌아왔습니다. 그는 내일이 장난감 친구들과의 새로운 모험을 가져올 것이라는 것을 알았습니다.",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "그리하여 용감한 곰 베니는 잠들었고, 만났던 모든 멋진 친구들과 앞으로 올 흥미진진한 여행들을 꿈꾸었습니다. 끝.",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "용감한",
        pronunciation: "yong-gam-han",
        definition: "두려워하지 않고 어려운 일을 할 용기가 있는 사람.",
        icon: "🦁"
      },
      {
        word: "아늑한",
        pronunciation: "a-neuk-han",
        definition: "따뜻하고 편안하며 안전하고 행복한 느낌을 주는 것.",
        icon: "🏠"
      },
      {
        word: "신비로운",
        pronunciation: "sin-bi-ro-un",
        definition: "이상하고 흥미로워서 더 알고 싶어지는 것.",
        icon: "🔍"
      },
      {
        word: "경이로움",
        pronunciation: "gyeong-i-ro-um",
        definition: "아름답거나 특별한 것에 대한 놀라움과 감탄의 느낌.",
        icon: "✨"
      }
    ]
  },
  Hindi: {
    pages: [
      {
        pageNumber: 1,
        text: "एक बार की बात है, बेनी नाम का एक बहादुर छोटा टेडी बियर था। वह रंग-बिरंगे खिलौनों से भरे एक आरामदायक कमरे में रहता था।",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "बहादुर",
            pronunciation: "ba-hā-dur",
            definition: "कोई जो डरता नहीं है और मुश्किल काम करने की हिम्मत रखता है।"
          },
          {
            word: "आरामदायक",
            pronunciation: "ā-rām-dā-yak",
            definition: "गर्म, आरामदायक और आपको सुरक्षित और खुश महसूस कराने वाला।"
          }
        ]
      },
      {
        pageNumber: 2,
        text: "एक दिन, बेनी ने खिलौने के बक्से के पीछे रहस्यमय जंगल का पता लगाने का फैसला किया। उसका दिल आश्चर्य और उत्साह से भरा था।",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "रहस्यमय",
            pronunciation: "ra-has-ya-may",
            definition: "कुछ अजीब और दिलचस्प जिसके बारे में आप और जानना चाहते हैं।"
          },
          {
            word: "आश्चर्य",
            pronunciation: "āsh-char-ya",
            definition: "किसी सुंदर या खास चीज़ के बारे में आश्चर्य और विस्मय की भावना।"
          }
        ]
      },
      {
        pageNumber: 3,
        text: "जंगल में, बेनी को नए दोस्त मिले - ब्लॉक जो कुछ भी बना सकते थे और एक बुद्धिमान पुराना डायनासोर जो अद्भुत कहानियाँ सुनाता था।",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "साथ में, उन्होंने एक जादुई इंद्रधनुष पुल बनाया जो सूरज की रोशनी में चमकता था। बेनी ने सीखा कि दोस्ती हर रोमांच को खास बनाती है।",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "जब सूरज डूबा, बेनी खुशी से भरे दिल के साथ घर लौटा। वह जानता था कि कल उसके खिलौना दोस्तों के साथ नए रोमांच लाएगा।",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "और इस तरह, बहादुर भालू बेनी सो गया, उन सभी अद्भुत दोस्तों के बारे में सपने देखते हुए जो उसने बनाए थे और आने वाली रोमांचक यात्राओं के बारे में। समाप्त।",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "बहादुर",
        pronunciation: "ba-hā-dur",
        definition: "कोई जो डरता नहीं है और मुश्किल काम करने की हिम्मत रखता है।",
        icon: "🦁"
      },
      {
        word: "आरामदायक",
        pronunciation: "ā-rām-dā-yak",
        definition: "गर्म, आरामदायक और आपको सुरक्षित और खुश महसूस कराने वाला।",
        icon: "🏠"
      },
      {
        word: "रहस्यमय",
        pronunciation: "ra-has-ya-may",
        definition: "कुछ अजीब और दिलचस्प जिसके बारे में आप और जानना चाहते हैं।",
        icon: "🔍"
      },
      {
        word: "आश्चर्य",
        pronunciation: "āsh-char-ya",
        definition: "किसी सुंदर या खास चीज़ के बारे में आश्चर्य और विस्मय की भावना।",
        icon: "✨"
      }
    ]
  },
  Mandarin: {
    pages: [
      {
        pageNumber: 1,
        text: "从前,有一只勇敢的小泰迪熊叫本尼。他住在一个舒适的卧室里,周围都是五颜六色的玩具。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "勇敢 (yǒng gǎn)",
            pronunciation: "yǒng gǎn",
            definition: "不害怕并且有勇气做困难事情的人。"
          },
          {
            word: "舒适 (shū shì)",
            pronunciation: "shū shì",
            definition: "温暖、舒服并让你感到安全和快乐。"
          }
        ]
      },
      {
        pageNumber: 2,
        text: "有一天,本尼决定探索玩具箱后面的神秘森林。他的心里充满了惊奇和兴奋。",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "神秘 (shén mì)",
            pronunciation: "shén mì",
            definition: "奇怪而有趣,让你想了解更多的东西。"
          },
          {
            word: "惊奇 (jīng qí)",
            pronunciation: "jīng qí",
            definition: "对美丽或特别的事物感到惊讶和赞叹的感觉。"
          }
        ]
      },
      {
        pageNumber: 3,
        text: "在森林里,本尼遇到了新朋友——可以建造任何东西的积木和一只讲述精彩故事的聪明老恐龙。",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "他们一起建造了一座在阳光下闪闪发光的魔法彩虹桥。本尼学到了友谊让每一次冒险都变得特别。",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "太阳落山时,本尼带着满心的喜悦回到了家。他知道明天会和他的玩具朋友们一起展开新的冒险。",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "就这样,勇敢的熊本尼睡着了,梦见了他结交的所有美好的朋友和即将到来的激动人心的旅程。完。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "勇敢 (yǒng gǎn)",
        pronunciation: "yǒng gǎn",
        definition: "不害怕并且有勇气做困难事情的人。",
        icon: "🦁"
      },
      {
        word: "舒适 (shū shì)",
        pronunciation: "shū shì",
        definition: "温暖、舒服并让你感到安全和快乐。",
        icon: "🏠"
      },
      {
        word: "神秘 (shén mì)",
        pronunciation: "shén mì",
        definition: "奇怪而有趣,让你想了解更多的东西。",
        icon: "🔍"
      },
      {
        word: "惊奇 (jīng qí)",
        pronunciation: "jīng qí",
        definition: "对美丽或特别的事物感到惊讶和赞叹的感觉。",
        icon: "✨"
      }
    ]
  },
  "Mandarin (Simplified)": {
    pages: [
      {
        pageNumber: 1,
        text: "从前,有一只勇敢的小泰迪熊叫本尼。他住在一个舒适的卧室里,周围都是五颜六色的玩具。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "勇敢 (yǒng gǎn)",
            pronunciation: "yǒng gǎn",
            definition: "不害怕并且有勇气做困难事情的人。"
          },
          {
            word: "舒适 (shū shì)",
            pronunciation: "shū shì",
            definition: "温暖、舒服并让你感到安全和快乐。"
          }
        ]
      },
      {
        pageNumber: 2,
        text: "有一天,本尼决定探索玩具箱后面的神秘森林。他的心里充满了惊奇和兴奋。",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "神秘 (shén mì)",
            pronunciation: "shén mì",
            definition: "奇怪而有趣,让你想了解更多的东西。"
          },
          {
            word: "惊奇 (jīng qí)",
            pronunciation: "jīng qí",
            definition: "对美丽或特别的事物感到惊讶和赞叹的感觉。"
          }
        ]
      },
      {
        pageNumber: 3,
        text: "在森林里,本尼遇到了新朋友——可以建造任何东西的积木和一只讲述精彩故事的聪明老恐龙。",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "他们一起建造了一座在阳光下闪闪发光的魔法彩虹桥。本尼学到了友谊让每一次冒险都变得特别。",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "太阳落山时,本尼带着满心的喜悦回到了家。他知道明天会和他的玩具朋友们一起展开新的冒险。",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "就这样,勇敢的熊本尼睡着了,梦见了他结交的所有美好的朋友和即将到来的激动人心的旅程。完。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "勇敢 (yǒng gǎn)",
        pronunciation: "yǒng gǎn",
        definition: "不害怕并且有勇气做困难事情的人。",
        icon: "🦁"
      },
      {
        word: "舒适 (shū shì)",
        pronunciation: "shū shì",
        definition: "温暖、舒服并让你感到安全和快乐。",
        icon: "🏠"
      },
      {
        word: "神秘 (shén mì)",
        pronunciation: "shén mì",
        definition: "奇怪而有趣,让你想了解更多的东西。",
        icon: "🔍"
      },
      {
        word: "惊奇 (jīng qí)",
        pronunciation: "jīng qí",
        definition: "对美丽或特别的事物感到惊讶和赞叹的感觉。",
        icon: "✨"
      }
    ]
  },
  "Mandarin (Traditional)": {
    pages: [
      {
        pageNumber: 1,
        text: "從前,有一隻勇敢的小泰迪熊叫本尼。他住在一個舒適的臥室裡,周圍都是五顏六色的玩具。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: [
          {
            word: "勇敢 (yǒng gǎn)",
            pronunciation: "yǒng gǎn",
            definition: "不害怕並且有勇氣做困難事情的人。"
          },
          {
            word: "舒適 (shū shì)",
            pronunciation: "shū shì",
            definition: "溫暖、舒服並讓你感到安全和快樂。"
          }
        ]
      },
      {
        pageNumber: 2,
        text: "有一天,本尼決定探索玩具箱後面的神秘森林。他的心裡充滿了驚奇和興奮。",
        imageUrl: imageUrls.forest,
        vocabWords: [
          {
            word: "神秘 (shén mì)",
            pronunciation: "shén mì",
            definition: "奇怪而有趣,讓你想了解更多的東西。"
          },
          {
            word: "驚奇 (jīng qí)",
            pronunciation: "jīng qí",
            definition: "對美麗或特別的事物感到驚訝和讚嘆的感覺。"
          }
        ]
      },
      {
        pageNumber: 3,
        text: "在森林裡,本尼遇到了新朋友——可以建造任何東西的積木和一隻講述精彩故事的聰明老恐龍。",
        imageUrl: imageUrls.blocks,
        vocabWords: []
      },
      {
        pageNumber: 4,
        text: "他們一起建造了一座在陽光下閃閃發光的魔法彩虹橋。本尼學到了友誼讓每一次冒險都變得特別。",
        imageUrl: imageUrls.rainbow,
        vocabWords: []
      },
      {
        pageNumber: 5,
        text: "太陽落山時,本尼帶著滿心的喜悅回到了家。他知道明天會和他的玩具朋友們一起展開新的冒險。",
        imageUrl: imageUrls.dinosaur,
        vocabWords: []
      },
      {
        pageNumber: 6,
        text: "就這樣,勇敢的熊本尼睡著了,夢見了他結交的所有美好的朋友和即將到來的激動人心的旅程。完。",
        imageUrl: imageUrls.teddyBear,
        vocabWords: []
      }
    ],
    vocabulary: [
      {
        word: "勇敢 (yǒng gǎn)",
        pronunciation: "yǒng gǎn",
        definition: "不害怕並且有勇氣做困難事情的人。",
        icon: "🦁"
      },
      {
        word: "舒適 (shū shì)",
        pronunciation: "shū shì",
        definition: "溫暖、舒服並讓你感到安全和快樂。",
        icon: "🏠"
      },
      {
        word: "神秘 (shén mì)",
        pronunciation: "shén mì",
        definition: "奇怪而有趣,讓你想了解更多的東西。",
        icon: "🔍"
      },
      {
        word: "驚奇 (jīng qí)",
        pronunciation: "jīng qí",
        definition: "對美麗或特別的事物感到驚訝和讚嘆的感覺。",
        icon: "✨"
      }
    ]
  }
};

// Helper function to get story for a language
export function getStoryForLanguage(language: string): { pages: StoryPage[], vocabulary: VocabWord[] } {
  return storyTranslations[language] || storyTranslations.Spanish; // Default to Spanish if language not found
}