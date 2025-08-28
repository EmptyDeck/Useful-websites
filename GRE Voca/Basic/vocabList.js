const vocabList = [
  {
    "word": "abandon",
    "definition": "1. 포기하다  2. 방종"
  },
  {
    "word": "abase",
    "definition": "낮추다, 줄이다"
  },
  {
    "word": "abash",
    "definition": "무안,당황케하다"
  },
  {
    "word": "abate",
    "definition": "줄이다"
  },
  {
    "word": "abbreviate",
    "definition": "생략, 약자로 만들다"
  },
  {
    "word": "abdicate",
    "definition": "권리따위를 포기하다"
  },
  {
    "word": "aberrant",
    "definition": "정상에서 벗어난"
  },
  {
    "word": "abet",
    "definition": "부추기다, 자극하다"
  },
  {
    "word": "abeyance",
    "definition": "중지"
  },
  {
    "word": "abject",
    "definition": "비굴한, 비참한"
  },
  {
    "word": "abjure",
    "definition": "포기, 끊다"
  },
  {
    "word": "abrade",
    "definition": "마모로 닳게하다"
  },
  {
    "word": "abreast of",
    "definition": "~과 나란히, 함께 하는, 정보에 뒤쳐지지 않는"
  },
  {
    "word": "abridge",
    "definition": "줄이다"
  },
  {
    "word": "abrogate",
    "definition": "철폐, 폐지하다"
  },
  {
    "word": "absolve",
    "definition": "죄를 사하다"
  },
  {
    "word": "abstain",
    "definition": "삼가, 절제하다"
  },
  {
    "word": "abstract",
    "definition": "1. 추상적인 2. [n] 요약, 논문초록"
  },
  {
    "word": "abstruse ",
    "definition": "심오한"
  },
  {
    "word": "abysmal",
    "definition": "최악의, 최저의, 가장 심한 상태의"
  },
  {
    "word": "accede",
    "definition": "응하다, 동의하다"
  },
  {
    "word": "accelerate",
    "definition": "가속하다"
  },
  {
    "word": "acclaim",
    "definition": "환호, 갈채를 보내다"
  },
  {
    "word": "acclimate",
    "definition": "환경에 적응하다"
  },
  {
    "word": "accolade",
    "definition": "찬사, 칭찬하는 말"
  },
  {
    "word": "accord",
    "definition": "1. 일치시키다, 조화를 이루게하다  2. grant 부여하다, 주다"
  },
  {
    "word": "accountability",
    "definition": "책임"
  },
  {
    "word": "accrete",
    "definition": "점진적으로 증가하다"
  },
  {
    "word": "accrue",
    "definition": "누적으로 쌓이다"
  },
  {
    "word": "acerbic",
    "definition": "신랄한, 쓴 맛의"
  },
  {
    "word": "acknowledge",
    "definition": "사실따위로 인정, 인지하다"
  },
  {
    "word": "acme",
    "definition": "최 정점"
  },
  {
    "word": "acolyte",
    "definition": "조수, 신봉자 "
  },
  {
    "word": "acquiesce",
    "definition": "저항없이 받아들이다. 묵인하다"
  },
  {
    "word": "acquit",
    "definition": "무죄로 풀어주다"
  },
  {
    "word": "acrid",
    "definition": "신랄한, 쓴, 맛이 톡 쏘는"
  },
  {
    "word": "acrimonious",
    "definition": "신랄한"
  },
  {
    "word": "acumen",
    "definition": "명민함, 감각, 비평력"
  },
  {
    "word": "acute",
    "definition": "1. 심각한  2. 날카로운 3.  예리함 "
  },
  {
    "word": "adamant",
    "definition": "마음을 바꾸지 않는"
  },
  {
    "word": "adduce",
    "definition": "예로 증거를 대다"
  },
  {
    "word": "adept",
    "definition": "기술좋은, 숙련된"
  },
  {
    "word": "adherent",
    "definition": "신봉자, 지지자"
  },
  {
    "word": "admonish",
    "definition": "권고, 경고하다"
  },
  {
    "word": "adorn",
    "definition": "장식하다"
  },
  {
    "word": "adrift",
    "definition": "표류하는, 방황하는, 정해지지 않은"
  },
  {
    "word": "adroit",
    "definition": "솜씨좋은, 능숙한"
  },
  {
    "word": "adulate",
    "definition": "아부하다"
  },
  {
    "word": "adulterate",
    "definition": "불순물로 섞다"
  },
  {
    "word": "adumbrate",
    "definition": "어렴풋이 나타내다"
  },
  {
    "word": "advent",
    "definition": "도래, 출현"
  },
  {
    "word": "adversary",
    "definition": "적 "
  },
  {
    "word": "adversity",
    "definition": "역경 "
  },
  {
    "word": "advocate",
    "definition": "고수하다, 옹호하다 "
  },
  {
    "word": "aesthete",
    "definition": "미적인 사람, 유미주의자"
  },
  {
    "word": "affable ",
    "definition": "상냥한, 친절한"
  },
  {
    "word": "affect",
    "definition": "1. 영향미치다 2. 그런 체하다,"
  },
  {
    "word": "affiliated",
    "definition": "연합한, 동맹의 관계인"
  },
  {
    "word": "affinity",
    "definition": "1.친밀감, 친화성  2. 유사성"
  },
  {
    "word": "affirm",
    "definition": "확증해주다"
  },
  {
    "word": "afflict",
    "definition": "고통주다"
  },
  {
    "word": "affluent ",
    "definition": "부유한"
  },
  {
    "word": "affront",
    "definition": "대들다, 허세부리며 대하다"
  },
  {
    "word": "aggrandize",
    "definition": "1. 크게하다   2. 찬사하다, 칭찬하다"
  },
  {
    "word": "aggravate",
    "definition": "1. 악화시키다  2. 자극하다, 분노하게하다"
  },
  {
    "word": "aggregate ",
    "definition": "[v][n]종합하다. "
  },
  {
    "word": "aggrieved",
    "definition": "분개한, 억울해 하는, 감정이 상한"
  },
  {
    "word": "agile",
    "definition": "기민한, 재빠른"
  },
  {
    "word": "agitate",
    "definition": " 마음 동요하게하다"
  },
  {
    "word": "agony",
    "definition": "극심한 고통"
  },
  {
    "word": "ailing",
    "definition": "병든, 약회된"
  },
  {
    "word": "albeit",
    "definition": "~에도 불구하고"
  },
  {
    "word": "alienate",
    "definition": "1. 소원하여 멀어지게하다  2. 양도하다"
  },
  {
    "word": "align",
    "definition": "연합하다, 정렬하다"
  },
  {
    "word": "allay",
    "definition": " 완화시키다, 누그러뜨리다"
  },
  {
    "word": "alleviate",
    "definition": "완화시키다, 가볍게하다"
  },
  {
    "word": "allocate",
    "definition": "나누다, 할당하다"
  },
  {
    "word": "alloy",
    "definition": "합금"
  },
  {
    "word": "allusive",
    "definition": "암시적인"
  },
  {
    "word": "aloof",
    "definition": "거리를 두는, 냉담한"
  },
  {
    "word": "altruistic",
    "definition": "이타주의적인  altruism [n]관대함, 이타주의"
  },
  {
    "word": "amalgamate",
    "definition": "혼합시키다, 융합시키다"
  },
  {
    "word": "ambience ",
    "definition": "분위기, 정서, 환경"
  },
  {
    "word": "ambiguous",
    "definition": "애매한,  여러가지로 해석될 수 있는"
  },
  {
    "word": "ambivalent",
    "definition": "상반된 상태가 섞여 있는"
  },
  {
    "word": "amble ",
    "definition": "천천히 걷다"
  },
  {
    "word": "ameliorate",
    "definition": "개선하다, 개량하다"
  },
  {
    "word": "amenable",
    "definition": "잘따르는, 순종적인"
  },
  {
    "word": "amend",
    "definition": "고치다, 개선하다; 수정, 개정하다 "
  },
  {
    "word": "amenity ",
    "definition": "편의시설; 쾌적함, 예의"
  },
  {
    "word": "amity",
    "definition": "우호, 우정, 친목"
  },
  {
    "word": "amorphous    ",
    "definition": "형태, 정의등이 확실치 않은"
  },
  {
    "word": "anachronistic",
    "definition": "시대착오적인; 구시대적인"
  },
  {
    "word": "analgesic",
    "definition": "통증을 없애주는; 진통제"
  },
  {
    "word": "analogous",
    "definition": "유사한"
  },
  {
    "word": "anathema",
    "definition": "저주, 증오, 파문, 이단배척"
  },
  {
    "word": "ancillary",
    "definition": "부속의, 보조의"
  },
  {
    "word": "anecdote ",
    "definition": "일화, 짧은 이야기"
  },
  {
    "word": "annotate",
    "definition": "주석(주해)을 달다"
  },
  {
    "word": "annul",
    "definition": "무효로하다, 취소하다, 폐지하다"
  },
  {
    "word": "anomalous",
    "definition": "변칙적인, 비정상의, 특이한"
  },
  {
    "word": "anonymous",
    "definition": "무명의, 익명의"
  },
  {
    "word": "antedate",
    "definition": "선행하다, 앞서다"
  },
  {
    "word": "antidote",
    "definition": "치료제, 해독제, 방책"
  },
  {
    "word": "antipathy ",
    "definition": "반감, 혐오"
  },
  {
    "word": "antiquated",
    "definition": "오래된, 고풍스런"
  },
  {
    "word": "antithetical",
    "definition": "반대의"
  },
  {
    "word": "apathetic",
    "definition": "무감각한, 무정한, 무관심한\n* apathy n. 무관심"
  },
  {
    "word": "apex",
    "definition": "최고점 "
  },
  {
    "word": "aphorism",
    "definition": "경구, 금언, 격언\n* aphoristic [adj] 글의 길이가 짧은"
  },
  {
    "word": "apocalyptic ",
    "definition": "묵시적인, 종말론적인"
  },
  {
    "word": "apocryphal",
    "definition": "저작자가 의심스런, 가짜의\n"
  },
  {
    "word": "apologist",
    "definition": "변론자\n"
  },
  {
    "word": "apostate",
    "definition": "변절자"
  },
  {
    "word": "appall",
    "definition": "오싹하게하다, 겁나게하다"
  },
  {
    "word": "apparition",
    "definition": "유령, 갑자기 나타나는 것"
  },
  {
    "word": "appease",
    "definition": "달래다, 진정시키다"
  },
  {
    "word": "appraise",
    "definition": "감정, 평가하다"
  },
  {
    "word": "appreciable",
    "definition": "상당한, 쉽게 알아볼 수 있는 "
  },
  {
    "word": "apprehend ",
    "definition": "1. 잡다, 체포하다 2. 파악하다  \napprehensive [adj] 걱정하는, 두려워하는"
  },
  {
    "word": "apprise",
    "definition": "알리다"
  },
  {
    "word": "approbation",
    "definition": "승인"
  },
  {
    "word": "appropriate",
    "definition": "[v] 1. 전용하다  2. 혼자 가지다  3. 허락없이 가지다"
  },
  {
    "word": "appurtenance ",
    "definition": "부속물, 보조품 "
  },
  {
    "word": "apropos",
    "definition": "적절한, 알맞은"
  },
  {
    "word": "arable",
    "definition": "경작가능한"
  },
  {
    "word": "arbiter",
    "definition": "1. 중재자 2. 권위자  "
  },
  {
    "word": "arbitrary",
    "definition": "무작위의, 멋대로의"
  },
  {
    "word": "arcane",
    "definition": "비밀, 신비의"
  },
  {
    "word": "archaic",
    "definition": "오래된, 고풍스런\n"
  },
  {
    "word": "archetype ",
    "definition": "원형"
  },
  {
    "word": "ardent",
    "definition": "열의에 찬"
  },
  {
    "word": "arid",
    "definition": "매우 건조한"
  },
  {
    "word": "arraign ",
    "definition": "비난하다, 기소된 내용을 캐묻다, 조사하다"
  },
  {
    "word": "arrest ",
    "definition": "1. 멈추게하다, 체포하다 2. 관심 따위를 끌다 "
  },
  {
    "word": "arrogant",
    "definition": "거만한"
  },
  {
    "word": "articulate",
    "definition": "분명하게 발음, 의미를 전달하다"
  },
  {
    "word": "artless",
    "definition": "자연스런, 가식이 없는"
  },
  {
    "word": "ascendant     ",
    "definition": "상승하는, 올라가는, 우세해지는"
  },
  {
    "word": "ascertain",
    "definition": "확인하다, 명백히 하다 \n"
  },
  {
    "word": "ascetic ",
    "definition": "금욕적인; 금욕적인 사람\n"
  },
  {
    "word": "asperity",
    "definition": "(말, 태도) 신랄함\n"
  },
  {
    "word": "aspersion",
    "definition": "비방\n"
  },
  {
    "word": "assail",
    "definition": "맹렬히 공격하다\n\nassailable"
  },
  {
    "word": "assert ",
    "definition": "주장하다"
  },
  {
    "word": "assess",
    "definition": "\n평가하다 "
  },
  {
    "word": "assiduous",
    "definition": "근면 성실한 \n "
  },
  {
    "word": "assimilate",
    "definition": " 흡수하다, 소화하다 \n"
  },
  {
    "word": "assorted",
    "definition": "여러 구색을 갖춘, 가지각색의\n"
  },
  {
    "word": "assuage",
    "definition": "달래다, 완화시키다; 만족시키다\n"
  },
  {
    "word": "assume ",
    "definition": "1. 가정하다 2. (권력, 의무) 떠맡다 3. 가장하다"
  },
  {
    "word": "astringent",
    "definition": "신랄한, 맛이 톡 쏘는"
  },
  {
    "word": "astute",
    "definition": "명민한, 기민한"
  },
  {
    "word": "asylum",
    "definition": "(정치범, 난민, 정신병자 등의) 보호시설,"
  },
  {
    "word": "atone",
    "definition": "속죄하다\n"
  },
  {
    "word": "atrocious",
    "definition": "극악무도한, 매우 잔인한; 아주나쁜"
  },
  {
    "word": "atrophy",
    "definition": "긴축, 축소"
  },
  {
    "word": "attentive",
    "definition": "1. 민감하게 반응하는 2. 경청하고 배려하는 \n"
  },
  {
    "word": "attenuate",
    "definition": "가늘게하다, 약화시키다\n"
  },
  {
    "word": "attest",
    "definition": "증명하다, 증언하다, 입증하다"
  },
  {
    "word": "attrition ",
    "definition": "닳거나 약해져 없어지는 것, 감소"
  },
  {
    "word": "attune",
    "definition": "조화를 이루다, 조율하다"
  },
  {
    "word": "audacious",
    "definition": "대담한, 무모한\n"
  },
  {
    "word": "audible",
    "definition": "(소리) 들리는\n"
  },
  {
    "word": "augment",
    "definition": "증가/증대시키다; 증가하다\n"
  },
  {
    "word": "augur",
    "definition": "전조가 되다, 예고하다\n"
  },
  {
    "word": "auspicious",
    "definition": "길조의, 유리한\nauspice [n]"
  },
  {
    "word": "austere ",
    "definition": "1. 엄격한 2. 금욕적인 3. 꾸밈없는, 소박한, 단순한\n"
  },
  {
    "word": "authenticity",
    "definition": "진짜임\n"
  },
  {
    "word": "authenticate",
    "definition": "(진짜임을) 입증하다\n"
  },
  {
    "word": "authoritarian",
    "definition": "독재적인, 권위주의적인"
  },
  {
    "word": "authoritative",
    "definition": "권위있는, 믿을만한"
  },
  {
    "word": "autonomy",
    "definition": "자율성, 자치권, 자립\nautonomous[adj]"
  },
  {
    "word": "avarice",
    "definition": "탐욕\n"
  },
  {
    "word": "avenge",
    "definition": "복수하다\n"
  },
  {
    "word": "aversion",
    "definition": "혐오감\naverse[v]"
  },
  {
    "word": "avert",
    "definition": "막다, 피하다; (시선을) 돌리다 \n"
  },
  {
    "word": "avian ",
    "definition": "새[조류]의, 하늘을 나는"
  },
  {
    "word": "avid",
    "definition": "열심인, 열정적인; 탐욕적인 "
  },
  {
    "word": "avow",
    "definition": "주장, 인정하다"
  },
  {
    "word": "awry",
    "definition": "휘어진, 비틀어진; 잘못된, 빗나가는"
  },
  {
    "word": "axiomatic",
    "definition": "자명한\naxiom [n]"
  },
  {
    "word": "babble",
    "definition": "[n], [v]횡설수설하다"
  },
  {
    "word": "backwater",
    "definition": "침체상태\n"
  },
  {
    "word": "badger",
    "definition": "(계속해서) 괴롭히다, 졸라대다\n"
  },
  {
    "word": "baffle",
    "definition": "당황하게 하다, 어리둥절하게 하다"
  },
  {
    "word": "bale",
    "definition": "재앙; 불운, 고통, 불행\n"
  },
  {
    "word": "balk ",
    "definition": "주저하다, 갑자기 서서 나아가지 않다; 방해하다, 막다, 좌절시키다\n"
  },
  {
    "word": "balky",
    "definition": "고집센, 말을 안듣는"
  },
  {
    "word": "balm",
    "definition": "위안, 아늑함을 주는 것\n[adj] balmy  "
  },
  {
    "word": "banal",
    "definition": "진부한, 식상함을 주는"
  },
  {
    "word": "bane",
    "definition": "고통의 근원; 맹독\nbaneful[adj]"
  },
  {
    "word": "barb",
    "definition": "신랄한 비난 "
  },
  {
    "word": "barefaced ",
    "definition": "뻔뻔스런; 숨김없는"
  },
  {
    "word": "baroque",
    "definition": "매우 장식적인, 화려한"
  },
  {
    "word": "barren",
    "definition": "열매맺지 않는, 수확이 없는"
  },
  {
    "word": "base",
    "definition": "상스러운, 천한, 천한"
  },
  {
    "word": "bask",
    "definition": "햇볕 쪼이다, 즐기다, 누리다 "
  },
  {
    "word": "bastion ",
    "definition": "보강된 장소, 요새 "
  },
  {
    "word": "bauble",
    "definition": "싸구려; 시시한것"
  },
  {
    "word": "beatific",
    "definition": "기쁨이 넘치는, 행복한"
  },
  {
    "word": "bedecked",
    "definition": "장식된"
  },
  {
    "word": "bedlam ",
    "definition": "소란스러운 곳; 대소동, 혼란"
  },
  {
    "word": "befitting",
    "definition": "적절한, 알맞은"
  },
  {
    "word": "befuddled",
    "definition": "혼란스러워하는\n"
  },
  {
    "word": "beget ",
    "definition": "자식 낳다"
  },
  {
    "word": "begrudge",
    "definition": "시샘하다; (주기 싫은데) 억지로 주다, 아까워하다"
  },
  {
    "word": "beguile",
    "definition": "매혹시키다; 속이다, 기만하다"
  },
  {
    "word": "behold",
    "definition": "주시하다"
  },
  {
    "word": "beleaguer",
    "definition": "1. 괴롭히다, 공격하다, 2.둘러싸다"
  },
  {
    "word": "belie",
    "definition": "반박하다, 모순의 관계에 있다"
  },
  {
    "word": "bellicose",
    "definition": "호전적인, 싸우기 좋아하는"
  },
  {
    "word": "belligerent ",
    "definition": "호전적인, 전쟁중에 있는"
  },
  {
    "word": "benediction",
    "definition": "축복, 축도"
  },
  {
    "word": "beneficent",
    "definition": "자비로운\n* beneficence [n]. 선행, 자비"
  },
  {
    "word": "benevolent",
    "definition": "자비심 많은, 자선을 행하는"
  },
  {
    "word": "benighted ",
    "definition": "무지한, 조잡한, 원시적인"
  },
  {
    "word": "benign",
    "definition": "친절한, 상냥한 "
  },
  {
    "word": "benignant",
    "definition": "인자한, 유순한"
  },
  {
    "word": "bent",
    "definition": "1. 경향, 성향 2. 능력\n"
  },
  {
    "word": "benumbed",
    "definition": "무감각해진"
  },
  {
    "word": "bequeath",
    "definition": "\n물려주다, 유증하다"
  },
  {
    "word": "berate ",
    "definition": "호되게 꾸짖다"
  },
  {
    "word": "bereaved ",
    "definition": "죽음등으로 홀로 남겨진, 상실한"
  },
  {
    "word": "bereft of ",
    "definition": "~을 상실한"
  },
  {
    "word": "beset",
    "definition": "괴롭히다; 에워싸다, 둘러싸다"
  },
  {
    "word": "besmirch",
    "definition": "더럽히다; (명성) 훼손하다"
  },
  {
    "word": "bespeak",
    "definition": "나타내다, 보여주다 "
  },
  {
    "word": "betray",
    "definition": "1. 배신하다  2. 의도와 달리 드러내다"
  },
  {
    "word": "bewail",
    "definition": "구슬퍼하다"
  },
  {
    "word": "bewilder",
    "definition": "당황하게 만들다, 놀라다"
  },
  {
    "word": "bewitch",
    "definition": "마술걸다, 매혹시키다"
  },
  {
    "word": "biased ",
    "definition": "편파적인 "
  },
  {
    "word": "bifurcate",
    "definition": "두 갈래로 가르다, 분기하다"
  },
  {
    "word": "bigot",
    "definition": "편협한 사람 "
  },
  {
    "word": "bilious ",
    "definition": "허약한, 병적으로 괴팍한"
  },
  {
    "word": "bilk ",
    "definition": "속이다; 피하다; 좌절시키다, 막다"
  },
  {
    "word": "biting ",
    "definition": "신랄한; 통렬한"
  },
  {
    "word": "bizarre",
    "definition": "이상한, 별난\n"
  },
  {
    "word": "blackmail",
    "definition": "공갈 협박하다\n"
  },
  {
    "word": "blandish",
    "definition": "감언으로 설득하다\nblandishment [n]"
  },
  {
    "word": "blare",
    "definition": "(소리) 울려퍼지다; 요란하게 울리다, 떠들어대다; 요란한 소리"
  },
  {
    "word": "blatant",
    "definition": "뻔한, 명백한; 떠들석한; 뻔뻔스런\n"
  },
  {
    "word": "blazon",
    "definition": "과시하다, 자랑하다\n"
  },
  {
    "word": "blemish",
    "definition": "흠, 결점, 오점\n"
  },
  {
    "word": "blight",
    "definition": "1. [n] 병듦, 고사 2. [v] 고사시키다, 해를 가하다, 파괴하다, 망치다"
  },
  {
    "word": "bliss",
    "definition": "더없는 행복"
  },
  {
    "word": "blithe",
    "definition": "남 신경 안쓰는, 혼자 신난; 명랑한, 쾌활한,"
  },
  {
    "word": "blunder",
    "definition": "실수하다, (일) 그르치다\nblundering [adj] 실수하는"
  },
  {
    "word": "blunt",
    "definition": "퉁명스럽고 직설적인; (칼, 연필) 무딘"
  },
  {
    "word": "blurt",
    "definition": "무심코 말하다"
  },
  {
    "word": "bluster",
    "definition": "호통치다, 큰 소리로 말하다"
  },
  {
    "word": "boast",
    "definition": "자랑하다, 허풍떨다"
  },
  {
    "word": "boggle",
    "definition": "압도, 놀라게하다"
  },
  {
    "word": "bogus",
    "definition": "가짜의"
  },
  {
    "word": "boisterous",
    "definition": "시끄러운"
  },
  {
    "word": "bolster",
    "definition": "개선, 강화하다"
  },
  {
    "word": "bombastic",
    "definition": "허풍떠는, 허세부리는\nbombast [n]"
  },
  {
    "word": "boon",
    "definition": "은혜, 혜택, 행운\n"
  },
  {
    "word": "boorish",
    "definition": "무례한 사람, 천박한\n"
  },
  {
    "word": "bootless",
    "definition": "소용없는, 쓸모없는"
  },
  {
    "word": "border (on)",
    "definition": "~와 경계의"
  },
  {
    "word": "brackish",
    "definition": "짭짤한, 맛없는; 불쾌한"
  },
  {
    "word": "brazen   ",
    "definition": "뻔뻔한, 철면피의"
  },
  {
    "word": "bravado ",
    "definition": "허세"
  },
  {
    "word": "breach",
    "definition": "1. 위반하다, 어기다 2. 구멍뚫다, 파괴하다\n"
  },
  {
    "word": "breakthrough",
    "definition": "돌파구; (과학 등) 큰 발전\n"
  },
  {
    "word": "brevity",
    "definition": "간결함\n"
  },
  {
    "word": "broach",
    "definition": "(민감한 이야기를) 꺼내다, 발의하다 "
  },
  {
    "word": "bromide",
    "definition": "진부하고 상투적인 말"
  },
  {
    "word": "brook",
    "definition": "참다, (반대의견을) 용납하다"
  },
  {
    "word": "bucolic",
    "definition": "전원적인\n"
  },
  {
    "word": "bully",
    "definition": "약한자를 괴롭히는 사람, 불량배\n"
  },
  {
    "word": "bumptious",
    "definition": "거만한, 오만한, 자기주장이 지나치게 강한\n"
  },
  {
    "word": "bungle ",
    "definition": "어설픈짓하다, 실수하다\n"
  },
  {
    "word": "buoyant",
    "definition": "부력이 있는; 기운찬, 명랑한\nbuoy[ v] 띄우다, 뜨다, 기운을 북돋다"
  },
  {
    "word": "burgeon",
    "definition": "급속히 성장하다, 번성하다"
  },
  {
    "word": "burnish",
    "definition": "윤[광]내다"
  },
  {
    "word": "bustling",
    "definition": "부산한 움직임"
  },
  {
    "word": "buttress",
    "definition": "지탱하다, 지지하다\n"
  },
  {
    "word": "cabal ",
    "definition": "도당, 무리 [그들의 계획]"
  },
  {
    "word": "cache",
    "definition": "(귀중품, 무기 등) 은닉처\n"
  },
  {
    "word": "cajole",
    "definition": "감언으로 꼬셔서 ~하게하다\n"
  },
  {
    "word": "calamity",
    "definition": "재앙, 재난\n\n* calamitous [adj]"
  },
  {
    "word": "calculated",
    "definition": "계산된, 계획된, 의도된\n"
  },
  {
    "word": "calibrate",
    "definition": "(총의)구경을 재다, (온도계, 자 등) 눈금을 정하다; 조정하다 \n"
  },
  {
    "word": "callous ",
    "definition": "무관심한, 냉담한, 무감각한\n"
  },
  {
    "word": "callow",
    "definition": "미성숙한, 경험이 없는"
  },
  {
    "word": "calumny",
    "definition": "중상, 비방\n"
  },
  {
    "word": "camaraderie ",
    "definition": "우정, 동지애"
  },
  {
    "word": "camouflage",
    "definition": "위장하다; 위장, 속임\n"
  },
  {
    "word": "candor",
    "definition": "솔직함\ncandid [a]"
  },
  {
    "word": "canonical ",
    "definition": "권위로 인정된, 정통의\ncanon = 규범, 표준"
  },
  {
    "word": "cant",
    "definition": "위선적 말투; 은어, 전문어"
  },
  {
    "word": "canvass",
    "definition": "유세하다; 여론조사하다; 면밀히 살피다\n"
  },
  {
    "word": "capability",
    "definition": "능력"
  },
  {
    "word": "capitulate",
    "definition": "항복하다"
  },
  {
    "word": "caprice",
    "definition": "변덕\ncapricious [adj] 변덕스런"
  },
  {
    "word": "captious",
    "definition": "트집잡는\n"
  },
  {
    "word": "captivate",
    "definition": "매료시키다"
  },
  {
    "word": "carefree",
    "definition": "걱정 근심이 없는"
  },
  {
    "word": "carcinogenic",
    "definition": "발암성의 "
  },
  {
    "word": "castigate",
    "definition": "징계, 비난하다\n"
  },
  {
    "word": "casualty ",
    "definition": "(사건, 사고) 사상자, 부상자"
  },
  {
    "word": "catalyze",
    "definition": "촉매작용하다; 촉진시키다\ncatalyst [n] 촉매제"
  },
  {
    "word": "categorical",
    "definition": "절대적인\n"
  },
  {
    "word": "cater (to)",
    "definition": "음식물을 조달[제공]하다; (요구, 필요를) 제공하다, 맞추다; 만족시키려 애쓰다\n"
  },
  {
    "word": "catholic ",
    "definition": "(취향이) 폭넓은, 보편적인\n"
  },
  {
    "word": "caustic",
    "definition": "신랄한"
  },
  {
    "word": "cavalier ",
    "definition": "무관심한, 무뚝뚝한; 건방진"
  },
  {
    "word": "cavil",
    "definition": "비판하다, 사소한 것으로 시비걸다"
  },
  {
    "word": "cavort",
    "definition": "흥청거리다; 뛰놀다"
  },
  {
    "word": "cede",
    "definition": "포기, 양도, 할양하다"
  },
  {
    "word": "celerity",
    "definition": "신속함"
  },
  {
    "word": "celibacy ",
    "definition": "독신, 금욕 [성적인 의미에서]"
  },
  {
    "word": "censorious",
    "definition": "매우 비난(비판)적인"
  },
  {
    "word": "censorship",
    "definition": "검열"
  },
  {
    "word": "censure",
    "definition": "비난하다"
  },
  {
    "word": "cerebral ",
    "definition": "머리좋은, 지적인"
  },
  {
    "word": "ceremonious",
    "definition": "1. 의식의, 지나치게 격식을 갖춘 2. 웅장한, 장엄한"
  },
  {
    "word": "certitude",
    "definition": "확신"
  },
  {
    "word": "cessation",
    "definition": "끝, 중지"
  },
  {
    "word": "champion",
    "definition": "\n옹호하다"
  },
  {
    "word": "charlatan",
    "definition": "돌팔이, 사기꾼"
  },
  {
    "word": "chary ",
    "definition": "조심하는, 신중한"
  },
  {
    "word": "chasten",
    "definition": "훈육하다, (마음을) 정화시키다; 겸손하게 하다, 억제하다\n"
  },
  {
    "word": "chastise",
    "definition": "체벌하다; 몹시 비난하다 \n"
  },
  {
    "word": "chauvinism",
    "definition": "맹목적인 애국심"
  },
  {
    "word": "cherish",
    "definition": "소중히 여기다 "
  },
  {
    "word": "chicanery",
    "definition": "속임수"
  },
  {
    "word": "chide",
    "definition": "꾸짖다"
  },
  {
    "word": "chivalrous",
    "definition": "기사도적인, 용감한, 예의바른"
  },
  {
    "word": "clique ",
    "definition": "배타적 무리"
  },
  {
    "word": "choleric",
    "definition": "담즙질의, 화를 잘내는"
  },
  {
    "word": "churlish",
    "definition": "무례한"
  },
  {
    "word": "cipher",
    "definition": "암호"
  },
  {
    "word": "circumlocution",
    "definition": "애둘러말하기"
  },
  {
    "word": "circumnavigate ",
    "definition": "이곳저곳을 여행하다"
  },
  {
    "word": "circumscribe",
    "definition": "제한하다"
  },
  {
    "word": "circumspect",
    "definition": "신중한, 조심스런"
  },
  {
    "word": "circumvent",
    "definition": "피하다\n"
  },
  {
    "word": "civility",
    "definition": "공손함\n"
  },
  {
    "word": "clairvoyant ",
    "definition": "천리안이 있는, 통찰력이 있는\n"
  },
  {
    "word": "clamor",
    "definition": "아우성, 소란, 떠들썩한 외침\n"
  },
  {
    "word": "clandestine",
    "definition": "비밀의, 은밀한"
  },
  {
    "word": "clannish",
    "definition": "씨족의, 당파적인."
  },
  {
    "word": "clarion  ",
    "definition": "(소리) 명쾌하게 울려퍼지는"
  },
  {
    "word": "cleave",
    "definition": "1. 쪼개다, 틈을 내다; 2. 지키다, 고수하다"
  },
  {
    "word": "clemency",
    "definition": "자비, 관대함\n"
  },
  {
    "word": "cliché",
    "definition": "진부한 표현"
  },
  {
    "word": "clout",
    "definition": "영향력, 힘\n"
  },
  {
    "word": "coagulate",
    "definition": "(혈액 등) 응고하다"
  },
  {
    "word": "coalesce",
    "definition": "합쳐지다, 하나가되다"
  },
  {
    "word": "coarse",
    "definition": "조악한, 거친; (사람) 저속한"
  },
  {
    "word": "coddle",
    "definition": "관대하게/너그럽게 대하다, 버릇없이 기르다"
  },
  {
    "word": "codify ",
    "definition": "성문화하다 "
  },
  {
    "word": "coercion",
    "definition": "강요, 강제"
  },
  {
    "word": "cogent",
    "definition": "설득력 있는"
  },
  {
    "word": "cognizant",
    "definition": "알고있는, 지각하고 잇는\ncognizance [n] "
  },
  {
    "word": "coherent",
    "definition": "일관성 있는, 조리가 맞는"
  },
  {
    "word": "coincide",
    "definition": "동시에 발생하다; 일치하다\n coincidental [adj] 동시발생의"
  },
  {
    "word": "coincidence",
    "definition": "우연\ncoincidental [adj] 우연의"
  },
  {
    "word": "collaborate",
    "definition": "공동작업하다, 협력하다; (적과 내통하여) 공모하다"
  },
  {
    "word": "colloquial ",
    "definition": "구어체, 대화체의 colloquialism [n] "
  },
  {
    "word": "collude ",
    "definition": "결탁, 공모하다\n"
  },
  {
    "word": "combustible",
    "definition": "불붙기 쉬운"
  },
  {
    "word": "commensurate",
    "definition": "동등한, 같은 크기의; 비례하는"
  },
  {
    "word": "commiseration",
    "definition": "연민, 동정\n"
  },
  {
    "word": "commitment",
    "definition": "약속, 의무, 헌신,열심 \n"
  },
  {
    "word": "commodious",
    "definition": "넓은, 널찍한"
  },
  {
    "word": "commonplace ",
    "definition": "흔한, 일상의, 다소 진부한"
  },
  {
    "word": "compatible",
    "definition": "양립할 수 있는"
  },
  {
    "word": "compelling",
    "definition": "1. 매력적인 2. 설득력 있는, 그럴 듯한"
  },
  {
    "word": "compendious",
    "definition": "요점을 잘 잡은, 간결한\n"
  },
  {
    "word": "compensate",
    "definition": "보상, 보완, 보충하다; 조정하여 균형을 잡다, 상쇄하다"
  },
  {
    "word": "complacence",
    "definition": "자기만족, 자족\ncomplacent [adj] "
  },
  {
    "word": "complaisant",
    "definition": "공손, 정중한; 유순한"
  },
  {
    "word": "complement",
    "definition": "보완하다, 보충하다; 완전하게 하다  \ncomplementary [a]"
  },
  {
    "word": "compliant",
    "definition": "순응하는compliance [n]"
  },
  {
    "word": "composure",
    "definition": "평상심\n"
  },
  {
    "word": "compromise ",
    "definition": "(명예, 신용) 위태롭게 하다, 훼손하다"
  },
  {
    "word": "compunction",
    "definition": "양심의 가책"
  },
  {
    "word": "comradeship",
    "definition": "동료애, 우정"
  },
  {
    "word": "concede",
    "definition": "\n1. 인정하다 2.양보하다"
  },
  {
    "word": "concerted",
    "definition": "협동/협의에 의한 "
  },
  {
    "word": "conciliate",
    "definition": "1. 화해시키다 2. 달래다, 위안을 주다"
  },
  {
    "word": "concoct ",
    "definition": "원료를 섞어 만들다, 고안하다"
  },
  {
    "word": "concord",
    "definition": "일치, 조화, 화합"
  },
  {
    "word": "concur",
    "definition": "1. 동의하다 2.동시에 발생하다"
  },
  {
    "word": "condensed   ",
    "definition": "요약된"
  },
  {
    "word": "condescend",
    "definition": "(우월함을 드러내며) 생색내다; 오만하게 행동하다\ncondescension[n] "
  },
  {
    "word": "condolence",
    "definition": "위로, 조의"
  },
  {
    "word": "condone",
    "definition": "묵과하다, 묵인하다, 용서하다"
  },
  {
    "word": "conducive ",
    "definition": "공헌하는, 도움이되는"
  },
  {
    "word": "confer ",
    "definition": "\n주다, 수여하다"
  },
  {
    "word": "confidential",
    "definition": "기밀의"
  },
  {
    "word": "configuration",
    "definition": "형상, 외형, 배열\n"
  },
  {
    "word": "confine",
    "definition": "제한하다, 가두다"
  },
  {
    "word": "confluence",
    "definition": "합류 "
  },
  {
    "word": "conform ",
    "definition": "~에 일치, 순응하다"
  },
  {
    "word": "confound",
    "definition": "혼돈시키다, 당황케하다"
  },
  {
    "word": "congeal",
    "definition": "응결, 응고시키다"
  },
  {
    "word": "congenial",
    "definition": "(사람) 마음이 통하는, 친근한; (장소) 마음에 드는\n"
  },
  {
    "word": "congenital",
    "definition": "타고난, 선천적인\n"
  },
  {
    "word": "congregate",
    "definition": "모이다"
  },
  {
    "word": "congruence",
    "definition": "일치\ncongruent [adj]\ncongruous [adj] "
  },
  {
    "word": "conjecture",
    "definition": "추정, 추측\n"
  },
  {
    "word": "conjunction",
    "definition": "결합, 연결; 동시발생\n"
  },
  {
    "word": "conjure",
    "definition": " 불러내다; 마술부리다, 마법을 걸다"
  },
  {
    "word": "connive",
    "definition": "공모하다"
  },
  {
    "word": "connoisseur",
    "definition": "전문가, 권위자 "
  },
  {
    "word": "consecrate ",
    "definition": "신성하게 만들다"
  },
  {
    "word": "conscientious",
    "definition": "양심적인; 면밀한, 근면성실한\n"
  },
  {
    "word": "consensus",
    "definition": "동의, 합의"
  },
  {
    "word": "considerable",
    "definition": "상당한, 눈여겨볼만한"
  },
  {
    "word": "consign",
    "definition": "위임, 위탁하다 \n"
  },
  {
    "word": "consolation ",
    "definition": "위로 "
  },
  {
    "word": "consolidate",
    "definition": "1. 공고히하다  2. 합하다"
  },
  {
    "word": "consonance",
    "definition": "일치, 조화; 화음"
  },
  {
    "word": "conspire",
    "definition": "공모하다"
  },
  {
    "word": "consternation",
    "definition": "대경실색, 깜짝 놀람"
  },
  {
    "word": "constrain",
    "definition": "억압하다, 억제하다"
  },
  {
    "word": "consummate",
    "definition": "(기술, 실력) 완전한, 완벽한"
  },
  {
    "word": "contempt",
    "definition": "경멸, 멸시"
  },
  {
    "word": "contend",
    "definition": "싸우다, 다투다;논쟁하다; 주장하다 "
  },
  {
    "word": "contentious",
    "definition": "다투기 좋아하는, 논쟁하기 좋아하는\ncontention [n] "
  },
  {
    "word": "contest",
    "definition": "다투다, 논쟁하다\ncontestable [a] "
  },
  {
    "word": "contiguous",
    "definition": "인접하는"
  },
  {
    "word": "contingent",
    "definition": "1. 우발적인, 우연의; 2. ~의 조건에 따라 달라지는"
  },
  {
    "word": "contort",
    "definition": "(몸이) 휘다, 비틀어지다\n "
  },
  {
    "word": "contraband ",
    "definition": "밀수품의, 불법의 "
  },
  {
    "word": "contradict",
    "definition": "1. 모순되다 2 반박하다"
  },
  {
    "word": "contravene",
    "definition": "1. 위반하다  2. 반박하다"
  },
  {
    "word": "contretemps ",
    "definition": "뜻밖의 불운한 사건; 작은 말다툼"
  },
  {
    "word": "contrite",
    "definition": "뉘우치는\ncontrition [n]"
  },
  {
    "word": "contrive",
    "definition": "고안하다, 꾸며내다"
  },
  {
    "word": "controversial",
    "definition": "논쟁적인"
  },
  {
    "word": "controvert",
    "definition": "부인하다, 반박하다"
  },
  {
    "word": "contumacious ",
    "definition": "고집센"
  },
  {
    "word": "conundrum",
    "definition": "난제, 수수께끼"
  },
  {
    "word": "convene",
    "definition": "소집하다"
  },
  {
    "word": "conventional",
    "definition": "틀에박힌, 진부한,  전통적인\n"
  },
  {
    "word": "convergence",
    "definition": "합침, 집합, 집중\nconvergent [adj]"
  },
  {
    "word": "conversant ",
    "definition": "정통한"
  },
  {
    "word": "convert",
    "definition": "변형시키다, 바꾸다, 개종시키다\n"
  },
  {
    "word": "conviction",
    "definition": "확신, 신념; 유죄판결"
  },
  {
    "word": "convivial",
    "definition": "명랑한, 사교적인\n"
  },
  {
    "word": "convoke",
    "definition": "소집하다\n"
  },
  {
    "word": "convoluted",
    "definition": "복잡한, 뒤엉켜있는"
  },
  {
    "word": "convulsion",
    "definition": "경련, 경기"
  },
  {
    "word": "copious",
    "definition": "풍부한, 많은"
  },
  {
    "word": "cornucopia ",
    "definition": "많음, 풍요로움"
  },
  {
    "word": "corporate",
    "definition": "법인의; 집합적인, 단체의 "
  },
  {
    "word": "corporeal",
    "definition": "육신의, 물질적인; 유형의"
  },
  {
    "word": "corpulent",
    "definition": "뚱뚱한, 살찐"
  },
  {
    "word": "correlate",
    "definition": "상관관계에 있다; 서로 연관시키다"
  },
  {
    "word": "correspond",
    "definition": "부합하다, 상응하다; 서신을 교환하다"
  },
  {
    "word": "corroborate",
    "definition": "확증하다"
  },
  {
    "word": "cosset ",
    "definition": "응석을 받아주다"
  },
  {
    "word": "countenance",
    "definition": "찬성하다, 지지하다, 용인하다, 참다"
  },
  {
    "word": "counter",
    "definition": "거스르다, 맞서다, 반대하다, 저항하다"
  },
  {
    "word": "counterpart",
    "definition": "대응물 (동일한 것)"
  },
  {
    "word": "counterpoint",
    "definition": "대위법; 대조되는 것"
  },
  {
    "word": "court",
    "definition": "1. 구애하다 2.자초하다, 얻으려하다"
  },
  {
    "word": "covert",
    "definition": "숨겨진, 비밀의"
  },
  {
    "word": "covetous",
    "definition": "탐하는, 갈망하는"
  },
  {
    "word": "cow ",
    "definition": "겁나게하다"
  },
  {
    "word": "cower",
    "definition": "두려워 움츠리다"
  },
  {
    "word": "coy",
    "definition": "부끄러운척하는, 조신한척하는, 수줍어하는"
  },
  {
    "word": "crass ",
    "definition": "무신경한, 세밀하지 못한  crassness [n] "
  },
  {
    "word": "craven",
    "definition": "비겁한; 비겁한 사람"
  },
  {
    "word": "craving",
    "definition": "갈망, 열망"
  },
  {
    "word": "credence",
    "definition": "신용, 신임"
  },
  {
    "word": "credulous",
    "definition": "잘믿는, 잘속는\n"
  },
  {
    "word": "crest",
    "definition": "(산, 파도 등의) 최정상\n"
  },
  {
    "word": "crestfallen",
    "definition": "풀죽은, 의기소침한"
  },
  {
    "word": "crotchety",
    "definition": "화잘내는, 까다로운"
  },
  {
    "word": "crumble ",
    "definition": "바스러지다, (건물, 땅) 허물어지다"
  },
  {
    "word": "crux",
    "definition": "가장 중요한 점"
  },
  {
    "word": "cryptic",
    "definition": "숨은, 비밀의, 암호를 사용한"
  },
  {
    "word": "culminate",
    "definition": "1. 정점에 달하다 2. ~로 끝나다"
  },
  {
    "word": "culpable",
    "definition": "비난받을 만한"
  },
  {
    "word": "culprit ",
    "definition": "원인, 범인"
  },
  {
    "word": "cunning",
    "definition": "교활한, 교묘한; 속임수의, 정교한, 순진하지 않은"
  },
  {
    "word": "curb",
    "definition": "억제, 제한하다"
  },
  {
    "word": "curt",
    "definition": "(말) 퉁명스런, 짧은"
  },
  {
    "word": "curtail ",
    "definition": "단축하다, 줄이다; (비용) 절감하다"
  },
  {
    "word": "cynical",
    "definition": "냉소적인"
  },
  {
    "word": "dabble",
    "definition": "호기심으로 재미삼아 잠시 해 보다\n"
  },
  {
    "word": "daft",
    "definition": "어리석은, 미친"
  },
  {
    "word": "dally",
    "definition": "시간낭비하다; 가지고놀다, 희롱하다"
  },
  {
    "word": "dampen ",
    "definition": "축축하게 하다; (활력, 열의) 꺾다"
  },
  {
    "word": "dart",
    "definition": "돌진하다"
  },
  {
    "word": "dash ",
    "definition": "돌진하다"
  },
  {
    "word": "dated",
    "definition": "구식의, 오래된"
  },
  {
    "word": "daunt",
    "definition": "위협하다, 겁나게 하다 "
  },
  {
    "word": "dauntless",
    "definition": "겁없는"
  },
  {
    "word": "dawdle",
    "definition": "시간 낭비하다, 허비하다; 꾸물거리다, 늑장부리다"
  },
  {
    "word": "dazzle",
    "definition": "눈부시게 하다, 매료시키다"
  },
  {
    "word": "deadpan",
    "definition": "무표정한 "
  },
  {
    "word": "debase",
    "definition": "저하시키다, 품질따위를 떨어뜨리다"
  },
  {
    "word": "debauchery ",
    "definition": "방탕함"
  },
  {
    "word": "debilitate",
    "definition": "약화시키다"
  },
  {
    "word": "debunk",
    "definition": "(허구임을) 드러내다"
  },
  {
    "word": "decelerate",
    "definition": "속도를 줄이다"
  },
  {
    "word": "decimate",
    "definition": "많은 사람을 죽이다, 파괴하다 "
  },
  {
    "word": "decipher",
    "definition": "(암호, 수수께끼) 풀다, 해독하다\n"
  },
  {
    "word": "decline",
    "definition": "1. 쇠퇴하다 2. 거절하다 "
  },
  {
    "word": "decorum",
    "definition": "단정함, 예의바름"
  },
  {
    "word": "decorous",
    "definition": "단정한, 예의바른"
  },
  {
    "word": "decrepit",
    "definition": "\n허약한, 쇠잔한 \ndecrepitude [n]"
  },
  {
    "word": "decry",
    "definition": "비난하다"
  },
  {
    "word": "deduce",
    "definition": "추론하다"
  },
  {
    "word": "defame",
    "definition": "명예를 훼손하다"
  },
  {
    "word": "default",
    "definition": "의무불이행, 체납"
  },
  {
    "word": "defeasible",
    "definition": "무효화할 수 있는, 파기할 수 있는"
  },
  {
    "word": "defer",
    "definition": "1. 연기하다, 미루다    2. 타자의 의견에 따르다, 그 결정에 맡기다 3. 경의를 표하다"
  },
  {
    "word": "deferential",
    "definition": "공손한\ndeference [n]"
  },
  {
    "word": "deficiency",
    "definition": "부족; 결점\n"
  },
  {
    "word": "definitive",
    "definition": "확고한, 분명한"
  },
  {
    "word": "deflate",
    "definition": "1. 수축시키다 2.  풀죽게 하다\n"
  },
  {
    "word": "deft",
    "definition": "솜씨 좋은, 민첩한"
  },
  {
    "word": "defuse",
    "definition": "뇌관을 제거하다; (긴장 등을) 완화시키다"
  },
  {
    "word": "defy ",
    "definition": "(공공연하게) 저항/도전하다, 불복종하다\ndefiant [adj]"
  },
  {
    "word": "degenerate",
    "definition": "퇴보, 타락, 퇴화하다 "
  },
  {
    "word": "dehydrate",
    "definition": "건조시키다, 탈수시키다"
  },
  {
    "word": "deify ",
    "definition": "신격화하다"
  },
  {
    "word": "deign",
    "definition": "황송하게도 (자신을 낮추어) ~해주다 "
  },
  {
    "word": "deity",
    "definition": "신"
  },
  {
    "word": "deject ",
    "definition": "낙담시키다"
  },
  {
    "word": "delectable",
    "definition": "1. 맛있는 2. 매우 아름다운, 매력적인\n"
  },
  {
    "word": "delegate",
    "definition": "대표, 사절; 위임하다\n"
  },
  {
    "word": "deleterious",
    "definition": "해로운"
  },
  {
    "word": "deliberation",
    "definition": "심사숙고, 합의, 토의"
  },
  {
    "word": "delineate  ",
    "definition": "정확하게 묘사하다"
  },
  {
    "word": "delude   ",
    "definition": "속이다, 기만하다"
  },
  {
    "word": "demise",
    "definition": "죽음, 서거, 몰락"
  },
  {
    "word": "demography",
    "definition": "인구통계학"
  },
  {
    "word": "demoralize",
    "definition": "사기를 꺾다"
  },
  {
    "word": "demote",
    "definition": "강등시키다"
  },
  {
    "word": "demur",
    "definition": "1. 이의를 제기하다   2. 주저함, 머뭇거림 demurrable a. 이의를 주장할 수 있는"
  },
  {
    "word": "demure",
    "definition": "얌전한, 조신한\n"
  },
  {
    "word": "demystify",
    "definition": "(신비함, 편견) 없애다, 이해하기 쉽게 설명하다"
  },
  {
    "word": "denigrate",
    "definition": "검게하다; 비난하다, 폄하하다; (명예) 훼손하다\ndenigration [n]."
  },
  {
    "word": "denounce ",
    "definition": "맹렬히 비난하다"
  },
  {
    "word": "denude",
    "definition": "박탈하다; 발가벗기다"
  },
  {
    "word": "deplete",
    "definition": "고갈시키다"
  },
  {
    "word": "deplore ",
    "definition": "비난하다; 개탄하다"
  },
  {
    "word": "deploy",
    "definition": "1.  배치하다 2. 이용하다"
  },
  {
    "word": "depravity",
    "definition": "타락, 부패, 사악 \ndepraved [a] 타락한, 부패한"
  },
  {
    "word": "deprecate",
    "definition": "비난하다; 반대하다"
  },
  {
    "word": "depreciate",
    "definition": "(가치) 떨어뜨리다, 평가절하하다; 비난하다"
  },
  {
    "word": "deracinate",
    "definition": "뿌리째 뽑다; 근절하다"
  },
  {
    "word": "derelict ",
    "definition": "1. 태만한, 나태한   2.  방치된, 버려진, 못쓰게 된"
  },
  {
    "word": "disrepute",
    "definition": "불명예"
  },
  {
    "word": "deride",
    "definition": "조롱하다"
  },
  {
    "word": "derogate",
    "definition": "비하하다, 격하시키다"
  },
  {
    "word": "descry",
    "definition": "멀리서 보다, 발견하다 "
  },
  {
    "word": "desecrate",
    "definition": "신성 모독하다"
  },
  {
    "word": "desiccate",
    "definition": "건조시키다"
  },
  {
    "word": "designate",
    "definition": "지정하다, 지명하다 "
  },
  {
    "word": "despicable   ",
    "definition": "경멸스러운, 비열한, 야비한"
  },
  {
    "word": "despise",
    "definition": "경멸하다"
  },
  {
    "word": "despondent",
    "definition": "낙심한, 풀죽은"
  },
  {
    "word": "desultory",
    "definition": "계획없는, 목적없는, 성의없는"
  },
  {
    "word": "detachment",
    "definition": "쌀쌀함, 냉담함, 객관점임\n"
  },
  {
    "word": "detain",
    "definition": "붙들다, 지체시키다; 구류하다"
  },
  {
    "word": "deter",
    "definition": "단념시키다  "
  },
  {
    "word": "deteriorate",
    "definition": "악화시키다, 손상시키다 "
  },
  {
    "word": "deterministic",
    "definition": "결정론의, 결정론적인"
  },
  {
    "word": "detract",
    "definition": "1. (가치) 떨어지다; 2. (주의) 딴데로 돌리다; 깎아내리다 비방하다 "
  },
  {
    "word": "detrimental",
    "definition": "해로운"
  },
  {
    "word": "deviate",
    "definition": "(표준, 기준에서) 벗어나다 "
  },
  {
    "word": "devious",
    "definition": "부정한, 사악한; 돌아가는, 우회하는\n "
  },
  {
    "word": "dexterous",
    "definition": "솜씨 좋은, 능숙한\n"
  },
  {
    "word": "diagnose",
    "definition": "진단하다\n"
  },
  {
    "word": "diaphanous",
    "definition": "1. 투명한, 섬세한  2, 애매한, 모호한 "
  },
  {
    "word": "diatribe",
    "definition": "통렬한 비난, 혹평"
  },
  {
    "word": "dichotomy",
    "definition": "이분법"
  },
  {
    "word": "didactic",
    "definition": "가르치기 위한, 교훈적인"
  },
  {
    "word": "diehard",
    "definition": "완고한, 보수적인"
  },
  {
    "word": "differentiate",
    "definition": "구별하다, 식별하다"
  },
  {
    "word": "diffident",
    "definition": "자신없는, 기가죽은, 수줍어하는"
  },
  {
    "word": "diffuse",
    "definition": "퍼뜨리다, 확산시키다 diffusive [adj] "
  },
  {
    "word": "digress",
    "definition": "(주제, 본론에서) 벗어나다"
  },
  {
    "word": "dilapidated",
    "definition": "(건물 등) 방치된, 낡은"
  },
  {
    "word": "dilate",
    "definition": "1. 확장하다 2. 자세히 밝히다"
  },
  {
    "word": "dilatory",
    "definition": "행동이 느린, 늑장부리는"
  },
  {
    "word": "dilettante ",
    "definition": "애호가, 호사가"
  },
  {
    "word": "dilute",
    "definition": "1. 묽게하다 2. 약하게하다"
  },
  {
    "word": "dingy",
    "definition": "칙칙한, 지저분한"
  },
  {
    "word": "diplomatic",
    "definition": "수완이 있는, 능숙한,  능란한"
  },
  {
    "word": "dire ",
    "definition": "끔직한, 불길한\n"
  },
  {
    "word": "dirge",
    "definition": "만가, 비가\n"
  },
  {
    "word": "disabuse",
    "definition": "(그릇된 생각) 바로잡아주다, (오해) 풀어주다"
  },
  {
    "word": "disaffect",
    "definition": "정떨어지게 하다; 불만을 품게 하다\n"
  },
  {
    "word": "disarming",
    "definition": "적개심을 없애주는, 달래는\n"
  },
  {
    "word": "disavow",
    "definition": "부인하다, 거부하다, 의절하다"
  },
  {
    "word": "discern",
    "definition": "인지하다, 구별하다, 알아채다"
  },
  {
    "word": "disciplinary",
    "definition": "징계의"
  },
  {
    "word": "discipline",
    "definition": "규율, 기강, 훈련"
  },
  {
    "word": "disclosure",
    "definition": "폭로"
  },
  {
    "word": "discombobulate",
    "definition": "혼란시키다, 당황스럽게 하다 "
  },
  {
    "word": "discomfit",
    "definition": "당황하게 하다"
  },
  {
    "word": "discompose",
    "definition": "마음의 평정을 없애다, 동요시키다 "
  },
  {
    "word": "disconcert",
    "definition": "동요시키다, 혼란스럽게 하다 "
  },
  {
    "word": "discordant",
    "definition": "불협화음의, 조화를 이루지 못하는"
  },
  {
    "word": "discourteous",
    "definition": "무례한"
  },
  {
    "word": "discredit",
    "definition": "불신케 하다; 불명예스럽게 하다 "
  },
  {
    "word": "discreet",
    "definition": "신중한, 조심스러운"
  },
  {
    "word": "discrepancy",
    "definition": "불일치, 차이, 어긋남"
  },
  {
    "word": "discrete",
    "definition": "불연속의, 분리된, 별개의 "
  },
  {
    "word": "discretion",
    "definition": "1. 신중함  2. 선택권, 자율재량권을 가짐"
  },
  {
    "word": "discretionary",
    "definition": "재량껏 할 수 있는"
  },
  {
    "word": "discriminating",
    "definition": "식별력 있는; 안목이 있는"
  },
  {
    "word": "discursive",
    "definition": "주제를 벗어난, 산만한; 논증적인"
  },
  {
    "word": "disdain",
    "definition": "경멸하다, 조롱하다"
  },
  {
    "word": "disengage",
    "definition": "(연결, 접속) 풀다; (의무) 해방하다 "
  },
  {
    "word": "disgruntled",
    "definition": "화난, 불만족한\n"
  },
  {
    "word": "disillusion",
    "definition": "(몽상, 잘못된 믿음) 깨우치게 하다 "
  },
  {
    "word": "disinclined [to]",
    "definition": "내켜하지 않는, 꺼리는"
  },
  {
    "word": "disinfect",
    "definition": "살균 소독하다"
  },
  {
    "word": "disingenuous",
    "definition": "솔직하지 않은, 부정직한"
  },
  {
    "word": "disintegrate",
    "definition": "붕괴, 분해, 해체시키다"
  },
  {
    "word": "disinterested",
    "definition": "공정한"
  },
  {
    "word": "disjunction",
    "definition": "분리, 분열, 차이"
  },
  {
    "word": "dislocate",
    "definition": "(관절) 탈구시키다; 위치를 바꾸다, 뒤죽박죽으로 만들다, 교란시키다"
  },
  {
    "word": "dismal",
    "definition": "음산한, 음울한, 참담한, 매우 안좋은"
  },
  {
    "word": "dismantle ",
    "definition": "분해, 와해시키다"
  },
  {
    "word": "dismay",
    "definition": "쩔쩔매게 하다, 용기(열정)를 잃게하다; 놀라게 하다"
  },
  {
    "word": "dismiss",
    "definition": "일축하다; 해고하다"
  },
  {
    "word": "disparage ",
    "definition": "깎아내리다, 비난하다"
  },
  {
    "word": "disparate",
    "definition": "본질적으로 다른\n disparity [n]"
  },
  {
    "word": "dispassionate",
    "definition": "감정에 휘둘리지 않는, 객관적인, 공정한 "
  },
  {
    "word": "dispensable",
    "definition": "없어도 되는"
  },
  {
    "word": "dispirit",
    "definition": "(열정, 사기, 희망 등을) 잃게 하다\n"
  },
  {
    "word": "displace",
    "definition": "(위치) 옮기다, 바꾸다; 강제이주시키다"
  },
  {
    "word": "disposition",
    "definition": "기질"
  },
  {
    "word": "disputable ",
    "definition": "논쟁의 여지가 있는"
  },
  {
    "word": "disquiet",
    "definition": "불안, 동요, 걱정하는\ndisquietude [n]"
  },
  {
    "word": "disrupt",
    "definition": "방해하여 중단시키다, 파괴하다  "
  },
  {
    "word": "dissect",
    "definition": "(표본) 해부하다, 분석하다 \n"
  },
  {
    "word": "dissemble ",
    "definition": "가장하다, 꾸미다 "
  },
  {
    "word": "disseminate",
    "definition": "퍼뜨리다, 확산시키다  "
  },
  {
    "word": "dissent",
    "definition": "의견을 달리하다, 반대하다"
  },
  {
    "word": "dissident",
    "definition": "반대하는 "
  },
  {
    "word": "dissipate",
    "definition": "흩어지게 하다\nto disperse or scatter"
  },
  {
    "word": "dissolution",
    "definition": "(단체) 해산; (용액) 용해; 붕괴, 분해, 부패 "
  },
  {
    "word": "dissonance",
    "definition": "불협화음"
  },
  {
    "word": "distend ",
    "definition": "부풀게 하다"
  },
  {
    "word": "distill",
    "definition": "증류, 순도높게 만들다"
  },
  {
    "word": "distinctive",
    "definition": "특색있는, 다른"
  },
  {
    "word": "distort",
    "definition": "왜곡하다"
  },
  {
    "word": "distract",
    "definition": "집중하지 못하게 하다"
  },
  {
    "word": "divergent",
    "definition": "분기하는, 갈라지는, (의견) 다른"
  },
  {
    "word": "divert",
    "definition": "(방향, 기분, 돈, 관심) 전환시키다, 딴 곳으로 돌리다\ndiversion [n]"
  },
  {
    "word": "divisive",
    "definition": "나누는, 분리, 분열하는 "
  },
  {
    "word": "divulge",
    "definition": "누설하다, 폭로하다\n"
  },
  {
    "word": "doctrinaire",
    "definition": "순이론가, 독단적인"
  },
  {
    "word": "doctrine",
    "definition": "정설, 원칙"
  },
  {
    "word": "dodge",
    "definition": "피하다"
  },
  {
    "word": "dogged",
    "definition": "끈질긴, 끈덕진\n"
  },
  {
    "word": "dogma",
    "definition": "독단, 원칙, 신조"
  },
  {
    "word": "doldrum",
    "definition": "침체, 우울, inactive한 상태"
  },
  {
    "word": "dolorous ",
    "definition": "슬퍼하는, 우울한"
  },
  {
    "word": "domicile",
    "definition": "거주지; 집"
  },
  {
    "word": "domineering",
    "definition": "오만한, 거만한"
  },
  {
    "word": "dormant",
    "definition": "활동이 없는; 동면기에 있는"
  },
  {
    "word": "dote",
    "definition": "맹목적으로 좋아하다 "
  },
  {
    "word": "dour",
    "definition": "시무룩한, 우울한"
  },
  {
    "word": "downplay",
    "definition": "얕보다, 중시하지 않다"
  },
  {
    "word": "drab",
    "definition": "칙칙한, 재미없는 "
  },
  {
    "word": "draconian  ",
    "definition": "가혹한, 아주 엄격한"
  },
  {
    "word": "drain  ",
    "definition": "서서히 배출하다, 물기없애다\n"
  },
  {
    "word": "dramatize",
    "definition": "극적으로 보여주다 \n"
  },
  {
    "word": "drawl",
    "definition": "모음을 늘여서 천천히 말하다"
  },
  {
    "word": "drench",
    "definition": "흠뻑 적시다"
  },
  {
    "word": "drivel",
    "definition": "허튼 소리"
  },
  {
    "word": "droll",
    "definition": "익살스런, 우스꽝스런"
  },
  {
    "word": "drone",
    "definition": "계속 단조로운 소리내다, 지루하게 말하다"
  },
  {
    "word": "dubious",
    "definition": "의심하는, 의심스러운"
  },
  {
    "word": "ductile ",
    "definition": "순종적인; (금속) 두드려 변형시킬 수 있는, 가소성의"
  },
  {
    "word": "dulcet",
    "definition": "(소리가) 감미로운"
  },
  {
    "word": "duly",
    "definition": "적절하게, 정당하게"
  },
  {
    "word": "duplicity",
    "definition": "속이는 행위, 허위"
  },
  {
    "word": "dwindle",
    "definition": "점차 줄어들다"
  },
  {
    "word": "dysfunctional",
    "definition": "기능장애적인, 고장난"
  },
  {
    "word": "earmark",
    "definition": "(자금·물건 등을) 책정하다"
  },
  {
    "word": "earthly",
    "definition": "지상의, 세속적인"
  },
  {
    "word": "eavesdrop",
    "definition": "몰래 엿듣다"
  },
  {
    "word": "ebullient",
    "definition": "열성인, 사기 충천한"
  },
  {
    "word": "eccentric ",
    "definition": "별난, 엉뚱한"
  },
  {
    "word": "ecclesiastical ",
    "definition": "교회의  "
  },
  {
    "word": "echelon",
    "definition": "(위계질서의) 계층"
  },
  {
    "word": "eclectic",
    "definition": "여러가지 방법을 쓰는, 다양한 "
  },
  {
    "word": "eclipse",
    "definition": "빛을 잃게하다, 가리다, 능가하다"
  },
  {
    "word": "economy",
    "definition": "간결함, 효율성; 검소함; 경제\n"
  },
  {
    "word": "ecumenical ",
    "definition": "보편적인, 전반적인"
  },
  {
    "word": "edify",
    "definition": "교화하다"
  },
  {
    "word": "efface",
    "definition": "삭제하다, 지워없애다; 눈에 띄지 않게 행동하다"
  },
  {
    "word": "effervescence",
    "definition": "쾌활함, 활기, 기운이 넘침"
  },
  {
    "word": "effete",
    "definition": "활력없는\n"
  },
  {
    "word": "efficacious",
    "definition": "효과적인, 효능, 효험있는 "
  },
  {
    "word": "effusive",
    "definition": "야단스런, 표현등이 과장된  effusion[n] 분출, 유출, 감정의 토로"
  },
  {
    "word": "egalitarian",
    "definition": "평등주의의, 공평한"
  },
  {
    "word": "egregious ",
    "definition": "몹씨 나쁜, 악랄한"
  },
  {
    "word": "elaborate",
    "definition": "공들인, 복잡한, 정교한"
  },
  {
    "word": "eleemosynary ",
    "definition": "자선의"
  },
  {
    "word": "elastic",
    "definition": "탄성있는"
  },
  {
    "word": "elated",
    "definition": "아주 즐거워하는, 기뻐하는"
  },
  {
    "word": "elemental",
    "definition": "기본적인, 근본적인\n"
  },
  {
    "word": "elevate",
    "definition": "들어올리다, 고양하다   "
  },
  {
    "word": "elicit",
    "definition": "이끌어내다, 도출하다  "
  },
  {
    "word": "elliptical",
    "definition": "생략적인; (의미) 지나치게 생략된, 모호한"
  },
  {
    "word": "elongate",
    "definition": "(길이) 늘이다, 연장하다"
  },
  {
    "word": "eloquent",
    "definition": "(글, 문장) 설득력있는, 웅변력있는"
  },
  {
    "word": "elucidate",
    "definition": "명료하게 하다, (명확히) 설명하다"
  },
  {
    "word": "elusive ",
    "definition": "(사람) 잡히지 않는; 이해, 정의하기 힘든  "
  },
  {
    "word": "emaciated",
    "definition": "수척해진, 몹시 여윈\n"
  },
  {
    "word": "emanate ",
    "definition": "발산하다"
  },
  {
    "word": "embed",
    "definition": "안에 박아 끼워넣다 "
  },
  {
    "word": "embellish",
    "definition": "꾸미다, 장식하다; (이야기) 꾸미다, 각색하다"
  },
  {
    "word": "embezzle",
    "definition": "횡령하다, 사취하다"
  },
  {
    "word": "embody",
    "definition": "구체화하다, 구현하다"
  },
  {
    "word": "embolden",
    "definition": "대담하게하다"
  },
  {
    "word": "embrace",
    "definition": "포옹하다, (생각, 의견) 채택하다"
  },
  {
    "word": "embroil ",
    "definition": "혼란스런 상황에 빠뜨리다"
  },
  {
    "word": "embryonic",
    "definition": "초기 상태의"
  },
  {
    "word": "emblematic",
    "definition": "상징적인 "
  },
  {
    "word": "emend",
    "definition": "교정, 수정하다  "
  },
  {
    "word": "empathetic ",
    "definition": "공감, 이해하는\nempathy [n] "
  },
  {
    "word": "empirical ",
    "definition": "경험, 실험적인\nempiricism [a] "
  },
  {
    "word": "emulate",
    "definition": "1. 모방하다 2. 경쟁하다  "
  },
  {
    "word": "enamor",
    "definition": "매료시키다 "
  },
  {
    "word": "encapsulate",
    "definition": "요약하다 "
  },
  {
    "word": "enchant",
    "definition": "매료시키다 "
  },
  {
    "word": "encode",
    "definition": "암호화하다"
  },
  {
    "word": "encomium",
    "definition": "찬사, 칭찬하는 말\nencomiast [n] 칭송는 사람"
  },
  {
    "word": "encompass",
    "definition": "둘러싸다, 포위하다, 포함하다"
  },
  {
    "word": "encounter",
    "definition": "(우연히) 마주치다; (위험, 곤란) 만나다, 대면하다 "
  },
  {
    "word": "encroach",
    "definition": "침해하다 "
  },
  {
    "word": "encumber",
    "definition": "짐지우다; 막다, 방해하다"
  },
  {
    "word": "endeavor",
    "definition": "노력"
  },
  {
    "word": "endorse",
    "definition": "승인, 지지하다\n"
  },
  {
    "word": "endow ",
    "definition": "기부하다; 주다, 부여하다"
  },
  {
    "word": "enduring",
    "definition": "영속적인 "
  },
  {
    "word": "enervate ",
    "definition": "약화시키다\n"
  },
  {
    "word": "enfeeble",
    "definition": "약화시키다\n"
  },
  {
    "word": "enfranchise",
    "definition": "투표권을 주다; 자유롭게 해주다"
  },
  {
    "word": "engender",
    "definition": "발생하게 하다  "
  },
  {
    "word": "engrossed",
    "definition": "몰두한, 열중한"
  },
  {
    "word": "enhance",
    "definition": "개선, 향상시키다 "
  },
  {
    "word": "enigmatic",
    "definition": "수수께끼같은, 난해한"
  },
  {
    "word": "enjoin",
    "definition": "명령하다"
  },
  {
    "word": "enlighten",
    "definition": "계몽하다, 설명하다, 가르치다"
  },
  {
    "word": "enmity",
    "definition": "적대감\n"
  },
  {
    "word": "ennui",
    "definition": "권태"
  },
  {
    "word": "enormous",
    "definition": "거대한, 막대한 "
  },
  {
    "word": "enraptured",
    "definition": "기뻐서 어쩔 줄 모르는"
  },
  {
    "word": "ensue",
    "definition": "~결과로서 발생하다, 뒤따라 발생하다 "
  },
  {
    "word": "entangle",
    "definition": "뒤엉키게 하다, 복잡하게 만들다"
  },
  {
    "word": "enterprise",
    "definition": "기업, 회사; 사업; 진취성, 모험심 "
  },
  {
    "word": "enthrall",
    "definition": "마음을 사로잡다; 노예로 만들다\n"
  },
  {
    "word": "entice",
    "definition": "유혹하다"
  },
  {
    "word": "entrammel ",
    "definition": "얽히게하다, 구속하다, 방해하다"
  },
  {
    "word": "entrance ",
    "definition": "황홀경으로 만들다, 매료시키다"
  },
  {
    "word": "entrenched",
    "definition": "굳어진"
  },
  {
    "word": "entrepreneurial",
    "definition": "기업가의; 모험심있는, 진취적인 "
  },
  {
    "word": "enunciate",
    "definition": "명확히 표현/설명/발음하다"
  },
  {
    "word": "envision",
    "definition": "상상하다, 그리다 "
  },
  {
    "word": "ephemeral",
    "definition": "일시적인, 덧없는\n"
  },
  {
    "word": "epicenter",
    "definition": "(지진) 진앙지; 중심점"
  },
  {
    "word": "epitomize",
    "definition": "요약하다; 전형이 되다 "
  },
  {
    "word": "equable ",
    "definition": "침착한, 차분한; 한결같은, 안정된\n"
  },
  {
    "word": "equanimity",
    "definition": "(마음) 평정, 차분함"
  },
  {
    "word": "equilibrium",
    "definition": "평형, 균형, 평정함 "
  },
  {
    "word": "equipoise",
    "definition": "균형, 평형"
  },
  {
    "word": "equitable",
    "definition": "공평한 "
  },
  {
    "word": "equivalent",
    "definition": "상응하는, 동등한, 같은; 대응하는 것"
  },
  {
    "word": "equivocal",
    "definition": "애매한"
  },
  {
    "word": "equivocate",
    "definition": "애매하게 둘러대다    equivocation [n]"
  },
  {
    "word": "eradicate",
    "definition": "근절하다"
  },
  {
    "word": "err",
    "definition": "틀리다; 실수하다"
  },
  {
    "word": "erratic",
    "definition": "변덕스런, 일정하지 않은; 비정상적인"
  },
  {
    "word": "erudite",
    "definition": "박식한"
  },
  {
    "word": "escalate ",
    "definition": "증대시키다, 고조되다"
  },
  {
    "word": "eschew ",
    "definition": "피하다, 삼가다 \n"
  },
  {
    "word": "esoteric      ",
    "definition": "난해한, 소수만 아는"
  },
  {
    "word": "espouse",
    "definition": "지지, 신봉하다 "
  },
  {
    "word": "esteem",
    "definition": "존경, 존중"
  },
  {
    "word": "estrange",
    "definition": "(관계) 소원하게 하다"
  },
  {
    "word": "ethereal ",
    "definition": "천상의, 영적인; 가볍고 섬세한\n"
  },
  {
    "word": "ethos ",
    "definition": "(한 국민·사회·제도 등의) 기풍, 정신"
  },
  {
    "word": "eulogy",
    "definition": "칭송, 찬양, 송덕문"
  },
  {
    "word": "euphemism ",
    "definition": "완곡어법\n"
  },
  {
    "word": "euphoria",
    "definition": "행복감"
  },
  {
    "word": "evade",
    "definition": "피하다 \nevasive [a] "
  },
  {
    "word": "evanescent",
    "definition": "사라져가는, 덧없는\n"
  },
  {
    "word": "even-handed",
    "definition": "공정한"
  },
  {
    "word": "even-tempered",
    "definition": "(마음) 차분한, 온화한"
  },
  {
    "word": "evict",
    "definition": "퇴거시키다, 내쫓다"
  },
  {
    "word": "evince",
    "definition": "명시하다"
  },
  {
    "word": "evoke",
    "definition": "(감정) 불러일으키다; (반응) 이끌어내다"
  },
  {
    "word": "evolve",
    "definition": "진화, 발전하다 "
  },
  {
    "word": "exacerbate",
    "definition": "악화시키다"
  },
  {
    "word": "exacting",
    "definition": "정확한; 엄격한"
  },
  {
    "word": "exalt",
    "definition": "칭송하다, 높이다; 고상하게 하다"
  },
  {
    "word": "exasperate",
    "definition": "몹시 화나게 하다"
  },
  {
    "word": "exceptionable",
    "definition": "반대될 수 있는, 이의제기 될 수 있는  unexceptionable =나무랄 데 없는, 이의를 제기할 수 없을 정도의"
  },
  {
    "word": "exceptional ",
    "definition": "특출난, 이례적인"
  },
  {
    "word": "excise",
    "definition": "잘라내다, 삭제하다"
  },
  {
    "word": "excoriate",
    "definition": "몹시 비난하다"
  },
  {
    "word": "excruciating",
    "definition": "심한 고통을 주는, 괴롭히는"
  },
  {
    "word": "exculpate",
    "definition": "혐의를 벗겨주다, 무죄로하다"
  },
  {
    "word": "execrable",
    "definition": "혐오하다, 비난하다\n"
  },
  {
    "word": "exemplar",
    "definition": "전형, 모범"
  },
  {
    "word": "exemplify",
    "definition": "예증하다, 모범이 되다  "
  },
  {
    "word": "exemption",
    "definition": "면제, 공제"
  },
  {
    "word": "exhaustive",
    "definition": "포괄적인, 철저한 exhaust[v] 지치게하다, 소진시키다"
  },
  {
    "word": "exhilarate ",
    "definition": "즐겁게 하다 "
  },
  {
    "word": "exhort",
    "definition": "강력하게 권고하다, 간곡히 타이르다  "
  },
  {
    "word": "exhume",
    "definition": "(매장된 것, 시신) 파내다"
  },
  {
    "word": "exigency",
    "definition": "위급, 긴급함 "
  },
  {
    "word": "exile ",
    "definition": "추방, 유배"
  },
  {
    "word": "exonerate",
    "definition": "용서하다, 면제하다"
  },
  {
    "word": "exorbitant",
    "definition": "엄청난"
  },
  {
    "word": "exorcise",
    "definition": "(귀신을) 내쫓다;(사람·장소에서) (귀신을) 몰아내다"
  },
  {
    "word": "expansive",
    "definition": "(성격, 태도) 개방적인, 너그러운, 대범한\n"
  },
  {
    "word": "expatriate ",
    "definition": "조국에서 추방하다, 이민하다 [n] 고국을 떠나 있는 사람"
  },
  {
    "word": "expedient",
    "definition": "편의주의적인; 신속한\nexpediency [n]"
  },
  {
    "word": "expedite",
    "definition": "촉진시키다"
  },
  {
    "word": "expeditious ",
    "definition": "신속한"
  },
  {
    "word": "explicate",
    "definition": "설명하다 "
  },
  {
    "word": "explicit",
    "definition": "명백한, 명시적인 "
  },
  {
    "word": "exploit",
    "definition": "위업, 업적; 이용하다, 착취하다"
  },
  {
    "word": "exponent",
    "definition": "지지자"
  },
  {
    "word": "exponential",
    "definition": "기하급수적인, 급격한"
  },
  {
    "word": "expository",
    "definition": "설명적인, 설명의"
  },
  {
    "word": "expostulate ",
    "definition": "훈계하다, 따지다"
  },
  {
    "word": "expressly",
    "definition": "명백히, 확실히  "
  },
  {
    "word": "expurgate",
    "definition": "검열하여 삭제하다"
  },
  {
    "word": "extant",
    "definition": "현존하는"
  },
  {
    "word": "extemporaneous ",
    "definition": "즉흥적인, 계획없이 이루어진"
  },
  {
    "word": "extenuate",
    "definition": "(죄, 과실) 경감시키다, 가볍게 하다"
  },
  {
    "word": "extol",
    "definition": "극찬하다"
  },
  {
    "word": "extradite ",
    "definition": "범인을 관할국에 인도하다\n"
  },
  {
    "word": "extraneous",
    "definition": "관련없는"
  },
  {
    "word": "extrapolate ",
    "definition": "(사실로부터의) 추정하다 "
  },
  {
    "word": "extravagant",
    "definition": "사치, 낭비하는; 지나친 "
  },
  {
    "word": "extricate",
    "definition": "(위험, 곤란에서) 벗어나게 하다, 구해내다, 빼내주다"
  },
  {
    "word": "extrinsic",
    "definition": "비본질적인, 외래의, 외부의"
  },
  {
    "word": "exuberant ",
    "definition": "열의에 찬, 원기왕성한, 활력적인"
  },
  {
    "word": "exude",
    "definition": "스며나오게 하다, 발산시키다"
  },
  {
    "word": "exultant",
    "definition": "매우기뻐하는"
  },
  {
    "word": "fabricate",
    "definition": "만들어내다, 꾸며내다; 제조하다, 조립하다"
  },
  {
    "word": "facet",
    "definition": "(사물의) 한 면, 특성"
  },
  {
    "word": "facetious",
    "definition": "익살스런, 웃기는; 가벼운"
  },
  {
    "word": "facile ",
    "definition": "피상적인; 손쉬운, 용이한"
  },
  {
    "word": "facilitate ",
    "definition": "용이하게 하다"
  },
  {
    "word": "factious",
    "definition": "당파적인 faction[n]"
  },
  {
    "word": "fad",
    "definition": "일시적으로 유행하는, 그런 유행을 좇는 "
  },
  {
    "word": "fail-safe",
    "definition": "(고장에 대비하여) 안전장치를 갖춘"
  },
  {
    "word": "fallacy",
    "definition": "궤변, 오류"
  },
  {
    "word": "falter   ",
    "definition": "주저하다, 비틀거리다"
  },
  {
    "word": "fanatic",
    "definition": "광신도, 열광자 \n\n* fanatical a. 광신도적인\n"
  },
  {
    "word": "farcical",
    "definition": "우스꽝스런"
  },
  {
    "word": "far-reaching",
    "definition": "(효과·영향 등이) 멀리까지 미치는, 폭넓은 "
  },
  {
    "word": "fashion",
    "definition": "만들어내다 "
  },
  {
    "word": "fastidious",
    "definition": "꼼꼼한, 까다로운\n"
  },
  {
    "word": "fastness  ",
    "definition": "요새, 안전한 곳; 고정; 신속"
  },
  {
    "word": "fathom",
    "definition": "헤아리다; 수심을 재다"
  },
  {
    "word": "fatuous",
    "definition": "어리석은, 바보같은"
  },
  {
    "word": "faultfinding",
    "definition": "비판적인 "
  },
  {
    "word": "fawn",
    "definition": "아부하다"
  },
  {
    "word": "faze",
    "definition": "당황시키다"
  },
  {
    "word": "fealty",
    "definition": "(영주에 대한) 충성"
  },
  {
    "word": "feasible",
    "definition": "실행가능한"
  },
  {
    "word": "feckless",
    "definition": "무책임한; 쓸모없는"
  },
  {
    "word": "fecund",
    "definition": "비옥한, 생산력이 있는, 풍성한"
  },
  {
    "word": "feeble",
    "definition": "연약한"
  },
  {
    "word": "feign",
    "definition": "가장하다, 꾸미다 "
  },
  {
    "word": "feisty",
    "definition": "적극적인, 원기왕성한"
  },
  {
    "word": "ferocity",
    "definition": "사나움, 광포함 "
  },
  {
    "word": "ferret ",
    "definition": "찾아다니다 "
  },
  {
    "word": "fertile",
    "definition": "비옥한, 생산력 있는   "
  },
  {
    "word": "fervent",
    "definition": "열렬한 "
  },
  {
    "word": "fervor  ",
    "definition": "열성, 열렬"
  },
  {
    "word": "fetching",
    "definition": "매력적인"
  },
  {
    "word": "fetter",
    "definition": "족쇄를 채우다, 구속하다"
  },
  {
    "word": "feud",
    "definition": "(두 집안 사이의 또는 여러 대에 걸친) 불화, 반복, 다툼\n"
  },
  {
    "word": "fiasco",
    "definition": "대실패"
  },
  {
    "word": "fickle",
    "definition": "변덕스런\n"
  },
  {
    "word": "fidelity ",
    "definition": "충성, 정조"
  },
  {
    "word": "figurative",
    "definition": "비유적인 "
  },
  {
    "word": "filibuster",
    "definition": "의사진행 방해 (긴 연설 등)"
  },
  {
    "word": "filthy",
    "definition": "매우 더러운, 난잡한, 비열한"
  },
  {
    "word": "finicky",
    "definition": "몹시 까다로운"
  },
  {
    "word": "fiscal",
    "definition": "재정의, 재무의, 회계의"
  },
  {
    "word": "fissure",
    "definition": "(땅, 바위) 균열; 불화"
  },
  {
    "word": "fit",
    "definition": "1. 안성맞춤으로 맞추다 2. 적당한 3. 발작\n"
  },
  {
    "word": "fitful ",
    "definition": "불규칙적인, 발작적인"
  },
  {
    "word": "flabby",
    "definition": "살이 축늘어진, 허약한"
  },
  {
    "word": "flaccid",
    "definition": "축늘어진; 무기력한"
  },
  {
    "word": "flag",
    "definition": "약화되다 \nflagging [adj] 축처진"
  },
  {
    "word": "flagrant  ",
    "definition": "극악한, 악명높은"
  },
  {
    "word": "flamboyant",
    "definition": "눈부신, 화려한, 현란한"
  },
  {
    "word": "flatter",
    "definition": "추켜세우다, 알랑거리다, (찬사 등으로) 기쁘게하다 "
  },
  {
    "word": "flaunt",
    "definition": "자랑, 과시하다 "
  },
  {
    "word": "fledgling",
    "definition": "풋나기(의), 애송이(의)"
  },
  {
    "word": "flee",
    "definition": "도망가다; 빠르게 지나가다, 사라지다"
  },
  {
    "word": "fleeting",
    "definition": "휙지나가는, 순식간의, 덧없는"
  },
  {
    "word": "flimsy",
    "definition": "부서지기 쉬운, 약한; (주장) 설득력이 없는\n"
  },
  {
    "word": "fling",
    "definition": "거칠게 내던지다; 버리다, 폐기하다\n"
  },
  {
    "word": "flippant",
    "definition": "경박한, 성의 없는; 무례한"
  },
  {
    "word": "flit",
    "definition": "가볍게 움직이다; 빨리지나가다"
  },
  {
    "word": "floppy",
    "definition": "준비하지않은, (옷이) 펄럭이는, 늘어진, 느슨한"
  },
  {
    "word": "flounder",
    "definition": "간신히 나아가다; 버둥거리다, 몸부림치다"
  },
  {
    "word": "flourish ",
    "definition": "번성하다"
  },
  {
    "word": "flout",
    "definition": "경멸하다, 비웃다, 어기다"
  },
  {
    "word": "fluctuate",
    "definition": "변동하다"
  },
  {
    "word": "flux  ",
    "definition": "흐름, 끝없는 변동"
  },
  {
    "word": "foe",
    "definition": "적, 원수"
  },
  {
    "word": "foible ",
    "definition": "약점, 단점"
  },
  {
    "word": "foil ",
    "definition": "방해하다, 막다"
  },
  {
    "word": "folly ",
    "definition": "어리석음, 우둔"
  },
  {
    "word": "foment",
    "definition": "선동하다, 자극하다\n"
  },
  {
    "word": "foot-dragging",
    "definition": "지체, 더딤, 주저\n"
  },
  {
    "word": "footloose",
    "definition": "마음대로 할 수 있는, 구속없는"
  },
  {
    "word": "forswear",
    "definition": "포기하다; 위증하다\n"
  },
  {
    "word": "forage",
    "definition": "(식량) 찾다, 구하다 / 사육할 때 주는 음식\n"
  },
  {
    "word": "forbear",
    "definition": "삼가다, 인내하다\nforbearance n. \n인내심"
  },
  {
    "word": "forceful",
    "definition": "강력한"
  },
  {
    "word": "forebode",
    "definition": "전조가 되다 "
  },
  {
    "word": "foreknowledge",
    "definition": "선지, 예지, 통찰력 "
  },
  {
    "word": "foreshadow",
    "definition": "전조가 되다 "
  },
  {
    "word": "forestall",
    "definition": "미리 손을써서 막다, 미리 하다"
  },
  {
    "word": "forfeit",
    "definition": "몰수(박탈)당하다 "
  },
  {
    "word": "forgo",
    "definition": "~없이 살다"
  },
  {
    "word": "forlorn ",
    "definition": "버림받은, 절망적인\n"
  },
  {
    "word": "formidable",
    "definition": "겁먹게 하는, 위협적인, 경외감을 갖게 하는"
  },
  {
    "word": "formulaic ",
    "definition": "도식적인, 공식에만 따른"
  },
  {
    "word": "forsake",
    "definition": "버리다 "
  },
  {
    "word": "forthcoming",
    "definition": "다가오는, 임박한; 솔직한"
  },
  {
    "word": "fortuitous",
    "definition": "우연한"
  },
  {
    "word": "forward",
    "definition": "1. 지나칠 정도로 스스럼없는   2.  앞으로, 앞선"
  },
  {
    "word": "foster",
    "definition": "양성, 촉진, 육성, 발전시키다"
  },
  {
    "word": "foul",
    "definition": "불쾌하고 역겨운; (날씨) 사나운, 나쁜; (사람, 언행) 사악한, 부도덕한, 저속한\n"
  },
  {
    "word": "founder ",
    "definition": "침몰하다; 실패하다l"
  },
  {
    "word": "fractious",
    "definition": "화, 짜증 잘 내는; 다루기 힘든"
  },
  {
    "word": "fragile ",
    "definition": "약한, 부서지기 쉬운\n"
  },
  {
    "word": "fragmentary",
    "definition": "단편적인 "
  },
  {
    "word": "frail",
    "definition": "약한, 깨지기쉬운"
  },
  {
    "word": "frantic",
    "definition": "광란의, 정신없는, 미쳐날뛰는"
  },
  {
    "word": "fraternize ",
    "definition": "사귀다, 친해지다, 형제처럼 지내다"
  },
  {
    "word": "fraudulent",
    "definition": "사기치는, 속이는 "
  },
  {
    "word": "fraught",
    "definition": "가득한; (정신) 괴로워하는"
  },
  {
    "word": "frenetic  ",
    "definition": "광란의, 지나치게 열광적인"
  },
  {
    "word": "frenzy",
    "definition": "광란, 열광"
  },
  {
    "word": "frequent",
    "definition": "자주 들르다"
  },
  {
    "word": "fretful",
    "definition": "안달하는, 초조해하는, 화내는, 언짢아하는"
  },
  {
    "word": "friable",
    "definition": "잘 부서지는"
  },
  {
    "word": "friction",
    "definition": "마찰, 갈등, 알력"
  },
  {
    "word": "frivolous",
    "definition": "가벼운, 경박한; 하찮은"
  },
  {
    "word": "frothy",
    "definition": "거품같은; 가벼운, 경박한"
  },
  {
    "word": "froward",
    "definition": "다루기힘든, 완고한\n"
  },
  {
    "word": "fugitive",
    "definition": "1. 덧없는, 금방사라지는  2. 탈주자"
  },
  {
    "word": "full-fledged",
    "definition": "완전한, 성숙한"
  },
  {
    "word": "fulminate",
    "definition": "공격, 비난하다"
  },
  {
    "word": "fulsome",
    "definition": "(찬양따위가)  지나친 "
  },
  {
    "word": "fumble",
    "definition": "서툴게 다루다, 더듬어 찾다, 말을 더듬거리다"
  },
  {
    "word": "furtive",
    "definition": "은밀한"
  },
  {
    "word": "fussy",
    "definition": "1. 지나치게 꼼꼼한, 2. 지나치게 장식된, 3. 쉽게 성내는, \n"
  },
  {
    "word": "fustian",
    "definition": "과장되고 허풍떠는 "
  },
  {
    "word": "futile",
    "definition": "쓸모없는, 무익한\nfutility n. "
  },
  {
    "word": "gaffe",
    "definition": "(사교상) 실수, 결례\n"
  },
  {
    "word": "gainsay",
    "definition": "반박하다, 부인하다, 반대하다\n"
  },
  {
    "word": "gait",
    "definition": "걸음걸이"
  },
  {
    "word": "gall",
    "definition": "화나게 하다"
  },
  {
    "word": "gallant",
    "definition": "1. 용감한 2. 정중한, 기사도적인\ngallantry n. 용감함, 정중함, 기사도정신"
  },
  {
    "word": "galvanize",
    "definition": "전기자극을 주다; 자극하다"
  },
  {
    "word": "gambol",
    "definition": "뛰놀다"
  },
  {
    "word": "garble",
    "definition": "왜곡하다, 혼동하다, 섞이다 \n"
  },
  {
    "word": "gargantuan",
    "definition": "거대한"
  },
  {
    "word": "garish",
    "definition": "(옷 등) 지나치게 화려한, 너무 요란한"
  },
  {
    "word": "garnish",
    "definition": "장식하다"
  },
  {
    "word": "garrulous",
    "definition": "지나치게 수다스러운\n"
  },
  {
    "word": "gauche",
    "definition": "서투른, 세련되지 않은, 솜씨없는"
  },
  {
    "word": "gaudy",
    "definition": "(옷, 장식) 지나치게 화려한, 세련되지 못한"
  },
  {
    "word": "gaunt",
    "definition": "수척해진, 쇠약해진"
  },
  {
    "word": "gawky",
    "definition": "서투른, 어색한"
  },
  {
    "word": "generic",
    "definition": "일반적인 "
  },
  {
    "word": "genial",
    "definition": "친절하고 쾌활한, 상냥한"
  },
  {
    "word": "genteel",
    "definition": "품위있는, 우아한, 점잔빼는"
  },
  {
    "word": "genuine",
    "definition": "진짜의 "
  },
  {
    "word": "germane",
    "definition": "관련있는, 적절한"
  },
  {
    "word": "gibberish",
    "definition": "이해할 수 없는 말, 글, 횡설수설"
  },
  {
    "word": "gibe",
    "definition": "조롱(하다)"
  },
  {
    "word": "giddy",
    "definition": "경솔한, 진지하지 못한; 현기증나는"
  },
  {
    "word": "glacial",
    "definition": "매우 추운; 매우 느린; (태도, 눈빛) 매우 차가운"
  },
  {
    "word": "glance",
    "definition": "흘긋보기; 흘긋보다\n"
  },
  {
    "word": "glaring",
    "definition": "눈부시게 빛나는; (색) 지나치게 야한; 눈에 띄는, 뻔한\nglare [v]"
  },
  {
    "word": "glee",
    "definition": "기쁨, 환호"
  },
  {
    "word": "glib  ",
    "definition": "(깊이없이) 말만 유창한, 입심좋은"
  },
  {
    "word": "glimmer",
    "definition": "희미하게 빛나다"
  },
  {
    "word": "gloat ",
    "definition": "자신의 성취에 우쭐하다"
  },
  {
    "word": "gloss ",
    "definition": "1. 광택  2. 겉으로 좋아보이는 허울  3. 겉치례, 허식  4. 주석, 주해, 해설"
  },
  {
    "word": "glut",
    "definition": "과도, 과다"
  },
  {
    "word": "glutton",
    "definition": "식신, 식탐이 과한 사람"
  },
  {
    "word": "gossamer",
    "definition": "매우 얇은, 섬세한\n"
  },
  {
    "word": "gouge",
    "definition": "1. 바가지 씌우다, 속이다 2. 도려내다 "
  },
  {
    "word": "gourmand",
    "definition": "미식가, 대식가"
  },
  {
    "word": "graft",
    "definition": "접목시키다, 접붙이다"
  },
  {
    "word": "grandiloquent",
    "definition": "과장된, 허풍떠는\n"
  },
  {
    "word": "grandiose",
    "definition": "(겉모습, 외양) 웅장한, 장엄한; (계획) 거창한"
  },
  {
    "word": "grandstand",
    "definition": "(관객, 미디어로 부터) 주목받으려 하다, (관객을 의식하여) 화려한 플레이를 하다\n"
  },
  {
    "word": "gratify",
    "definition": "만족시키다"
  },
  {
    "word": "grating ",
    "definition": "삐걱거리는; (소리가) 신경에 거슬리는"
  },
  {
    "word": "gratuitous",
    "definition": "무료의; 필요없는, 근거없는"
  },
  {
    "word": "grave",
    "definition": "엄숙한, 진지한 \n"
  },
  {
    "word": "gravitas",
    "definition": "진지함, 무게"
  },
  {
    "word": "gravelly  ",
    "definition": "자갈같은, 자갈소리가 나는, 귀에 거슬리는"
  },
  {
    "word": "gregarious ",
    "definition": "사교적인"
  },
  {
    "word": "grievous",
    "definition": "심각한, 중대한, 슬픈\n"
  },
  {
    "word": "grill",
    "definition": "엄중히 심문하다; 취조하다"
  },
  {
    "word": "grim",
    "definition": "엄격한, 단호한, 잔인한, 무서운, 섬뜩한, 무시무시한"
  },
  {
    "word": "grimace",
    "definition": "찡그림; 찡그리다(병, 고통 등으로)"
  },
  {
    "word": "gripe",
    "definition": "(사소한 일에) 불평하다"
  },
  {
    "word": "gripping",
    "definition": "주의를 끄는, 흥미로운, 재미있는"
  },
  {
    "word": "gritty",
    "definition": "용감한, 단호한"
  },
  {
    "word": "grouch",
    "definition": "불평꾼, 짜증 잘내는 사람"
  },
  {
    "word": "groundless   ",
    "definition": "근거없는"
  },
  {
    "word": "groveling",
    "definition": "비굴한, 아첨하는; 기는"
  },
  {
    "word": "growl",
    "definition": "으르렁 거리다"
  },
  {
    "word": "grudge",
    "definition": "원한"
  },
  {
    "word": "grueling ",
    "definition": "몹시 힘든"
  },
  {
    "word": "gruesome",
    "definition": "소름끼치는, 오싹하는"
  },
  {
    "word": "gruff",
    "definition": "퉁명스런, (목소리) 거친, 쉰"
  },
  {
    "word": "grumble",
    "definition": "투덜거리다"
  },
  {
    "word": "guarded",
    "definition": "조심하는, 신중한 "
  },
  {
    "word": "guffaw",
    "definition": "시끄럽게 웃다, 그런 웃음"
  },
  {
    "word": "guile",
    "definition": "속임수, 꾀, 술책\n"
  },
  {
    "word": "gull",
    "definition": "속이다"
  },
  {
    "word": "gullible ",
    "definition": "잘 속는\ngullibility [n]"
  },
  {
    "word": "gust",
    "definition": "(갑자기) 휙 부는 바람, 돌풍"
  },
  {
    "word": "hackneyed ",
    "definition": "진부한"
  },
  {
    "word": "hairbreadth",
    "definition": "털끝만한 간격, 폭; 가까스로(의)"
  },
  {
    "word": "halcyon",
    "definition": "평온한, 고요한, 번성하는"
  },
  {
    "word": "hale ",
    "definition": "튼튼한, 원기왕성한\n"
  },
  {
    "word": "halfhearted",
    "definition": "열성이 없는, 내키지 않는"
  },
  {
    "word": "hallmark",
    "definition": "특질, 특징"
  },
  {
    "word": "hallow",
    "definition": "거룩히 여기다, 신성하게 하다"
  },
  {
    "word": "hallucination",
    "definition": "환각"
  },
  {
    "word": "halting",
    "definition": "(말) 더듬거리는; 막히는"
  },
  {
    "word": "ham-handed",
    "definition": "서투른, 실수하는"
  },
  {
    "word": "hamper",
    "definition": "막다, 방해하다"
  },
  {
    "word": "hamstring",
    "definition": "무력화하다, 좌절시키다; 다리를 절게하다"
  },
  {
    "word": "hangdog",
    "definition": "처량한, 부끄러워하는"
  },
  {
    "word": "hankering",
    "definition": "갈망"
  },
  {
    "word": "haphazard",
    "definition": "아무렇게나, 되는대로"
  },
  {
    "word": "hapless",
    "definition": "운없는"
  },
  {
    "word": "harangue",
    "definition": "장광설; 비난, 질책\n"
  },
  {
    "word": "harass",
    "definition": "괴롭히다"
  },
  {
    "word": "harbinger",
    "definition": "예언자; 전조\n"
  },
  {
    "word": "harbor",
    "definition": "피난처를 제공하다, 숨겨주다"
  },
  {
    "word": "hard-boiled",
    "definition": "현실적인, 실제적인; 무정한, 감상적이지 않은, 비정한\n"
  },
  {
    "word": "hardheaded",
    "definition": "완고한, 고집센; 현실적인"
  },
  {
    "word": "hard-nosed",
    "definition": "현실적인, 실제적인  "
  },
  {
    "word": "hardy ",
    "definition": "강건한, 용감한"
  },
  {
    "word": "harebrained",
    "definition": "경솔한, 무모한\n"
  },
  {
    "word": "harrow",
    "definition": "괴롭히다, 못살게 굴다, 망치다, 침해하다\n"
  },
  {
    "word": "harry",
    "definition": "괴롭히다, 못살게 굴다"
  },
  {
    "word": "hasten",
    "definition": "서두르다"
  },
  {
    "word": "haunt",
    "definition": "자주 가는 장소"
  },
  {
    "word": "hauteur",
    "definition": "오만함, 거만함"
  },
  {
    "word": "haven",
    "definition": "항구; 피난처\n"
  },
  {
    "word": "havoc",
    "definition": "대파괴, 황폐, 대혼란\n"
  },
  {
    "word": "headlong",
    "definition": "무모한, 성급한"
  },
  {
    "word": "headstrong",
    "definition": "고집센"
  },
  {
    "word": "hearten",
    "definition": "용기, 기운을 북돋어주다, 격려하다"
  },
  {
    "word": "heart-rending",
    "definition": "마음을 찢어지게 하는, 매우 슬픈"
  },
  {
    "word": "heavy-handed",
    "definition": "서투른, 솜씨없는; 고압적인, 포악한"
  },
  {
    "word": "heckle",
    "definition": "괴롭히다"
  },
  {
    "word": "hedonism",
    "definition": "쾌락주의\nhedonistic [adj]"
  },
  {
    "word": "heed",
    "definition": "주의를 기울이다"
  },
  {
    "word": "hegemony",
    "definition": "(힘의) 주도권"
  },
  {
    "word": "heinous",
    "definition": "(행동) 극악한"
  },
  {
    "word": "helter-skelter",
    "definition": "허둥지둥"
  },
  {
    "word": "herald",
    "definition": "알리다, 고지하다"
  },
  {
    "word": "heresy",
    "definition": "이단"
  },
  {
    "word": "heretic",
    "definition": "(일반적인 믿음을) 따르지 않는 사람, 이단자"
  },
  {
    "word": "heretofore",
    "definition": "이제까지, 여태까지"
  },
  {
    "word": "hermetic",
    "definition": "밀봉, 밀폐된; 난해한\n"
  },
  {
    "word": "heterodox",
    "definition": "이단, 이설, 이교의"
  },
  {
    "word": "heyday",
    "definition": "전성기"
  },
  {
    "word": "hidebound",
    "definition": "완고한, 몹시 보수적인"
  },
  {
    "word": "hieroglyph",
    "definition": "상형문자"
  },
  {
    "word": "hirsute",
    "definition": "털이 많은\n"
  },
  {
    "word": "hiss",
    "definition": "'쉬' 소리를 내다; 비난하다"
  },
  {
    "word": "histrionic",
    "definition": "배우의, 연기의; 지나치게 감정적인"
  },
  {
    "word": "hitherto ",
    "definition": "지금까지, 여태가지"
  },
  {
    "word": "hoard",
    "definition": "보관, 저장하다"
  },
  {
    "word": "hoarse",
    "definition": "(목소리가) 거친, 쉰소리가 나는"
  },
  {
    "word": "hoary",
    "definition": "백발의, 나이든; 오래된, 진부한"
  },
  {
    "word": "hoax",
    "definition": "짓궂은 속임수; 속이다"
  },
  {
    "word": "hobble",
    "definition": "절뚝거리다"
  },
  {
    "word": "hobnob",
    "definition": "(높은 신분과) 친하게 지내다, 사귀다"
  },
  {
    "word": "hoist",
    "definition": "들어올리다"
  },
  {
    "word": "hollow  ",
    "definition": "텅빈, 내용없는"
  },
  {
    "word": "homage",
    "definition": "존경"
  },
  {
    "word": "homily",
    "definition": "설교; 지루한 도덕적 훈계"
  },
  {
    "word": "homogeneous",
    "definition": "동종의, 균질의, 비슷한"
  },
  {
    "word": "hone",
    "definition": "연마하다, 갈고 닦다 "
  },
  {
    "word": "hortative",
    "definition": "(조언·연설 등이) 격려하는; 충고의"
  },
  {
    "word": "hospitable",
    "definition": "친절한, 대접을 잘 하는 "
  },
  {
    "word": "hubris",
    "definition": "지나친 자신감, 오만함"
  },
  {
    "word": "hue",
    "definition": "색깔, 색조"
  },
  {
    "word": "humdrum",
    "definition": "단조로운, 재미없는 "
  },
  {
    "word": "humiliate",
    "definition": "굴욕스럽게 하다"
  },
  {
    "word": "humility",
    "definition": "겸손함"
  },
  {
    "word": "hunch",
    "definition": "예감, 직감, 느낌  "
  },
  {
    "word": "husband",
    "definition": "아껴쓰다, 절약하다"
  },
  {
    "word": "hybrid",
    "definition": "잡종의"
  },
  {
    "word": "hygiene",
    "definition": "위생"
  },
  {
    "word": "hyperbole",
    "definition": "과장된 말, 과장법\nhyperbolic [adj]"
  },
  {
    "word": "hypnotic",
    "definition": "최면에 걸리게 하는, 잠이오게하는\n"
  },
  {
    "word": "hypothetical",
    "definition": "가설의"
  },
  {
    "word": "iconoclast",
    "definition": "성상파괴자; 인습타파론자"
  },
  {
    "word": "idiocy",
    "definition": "우둔함 "
  },
  {
    "word": "idiosyncrasy",
    "definition": "특유의 성질\nidiosyncratic[adj]"
  },
  {
    "word": "idle",
    "definition": "(기계, 공장) 작동하지 않는, 사용되지 않는"
  },
  {
    "word": "ignoble",
    "definition": "비천한 "
  },
  {
    "word": "ignominy",
    "definition": "불명예, 치욕, 굴욕\n"
  },
  {
    "word": "illegible",
    "definition": "읽을 수 없는, 해독불가한"
  },
  {
    "word": "illicit",
    "definition": "불법적인"
  },
  {
    "word": "illiteracy",
    "definition": "무학, 문맹, 무교양\n"
  },
  {
    "word": "illuminate",
    "definition": "조명하다, 계몽, 알게하다"
  },
  {
    "word": "illustrate",
    "definition": "(그림, 챠트, 예를 이용해서) 설명하다\n"
  },
  {
    "word": "imbue",
    "definition": "(생각)주입시키다; 스며들게하다; (색깔)물들이다"
  },
  {
    "word": "immaterial",
    "definition": "중요하지 않은, 관련없는; 영적인"
  },
  {
    "word": "immediate",
    "definition": "(시간, 장소, 관계) 가까운, 즉각적인"
  },
  {
    "word": "immemorial",
    "definition": "옛날의, 태고적의\n"
  },
  {
    "word": "immerse ",
    "definition": "푹담그다; 열중, 몰두시키다"
  },
  {
    "word": "imminent",
    "definition": "임박한"
  },
  {
    "word": "immortalize",
    "definition": "불멸로 만들다, 불후의 명성을 주다\n"
  },
  {
    "word": "immune",
    "definition": "면역의; 면제된"
  },
  {
    "word": "immure",
    "definition": "감금하다, 가두다, 제한하다"
  },
  {
    "word": "immutable ",
    "definition": "불변의"
  },
  {
    "word": "impair",
    "definition": "약화시키다, 손상시키다"
  },
  {
    "word": "impartial",
    "definition": "공정한"
  },
  {
    "word": "impassioned",
    "definition": "열정적인"
  },
  {
    "word": "impassive",
    "definition": "무정한, 비정한, 무표정한"
  },
  {
    "word": "impeachable    ",
    "definition": "탄핵/비난 받을 만한\n"
  },
  {
    "word": "impeccable",
    "definition": "결함없는, 완벽한"
  },
  {
    "word": "impecunious",
    "definition": "무일푼의"
  },
  {
    "word": "impede",
    "definition": "방해하다, 훼방놓다"
  },
  {
    "word": "impediment",
    "definition": "장애물 "
  },
  {
    "word": "impel",
    "definition": "강요하다, 강제하다"
  },
  {
    "word": "impending",
    "definition": "임박한  "
  },
  {
    "word": "impenetrable",
    "definition": "통과할 수 없는, 스며들 수 없는, 이해할 수 없는"
  },
  {
    "word": "imperative",
    "definition": "꼭 해야 하는, 필수적인 "
  },
  {
    "word": "imperceptible",
    "definition": "지각/감지할 수 없는, 미세한, 경미한"
  },
  {
    "word": "imperious",
    "definition": "오만한, 고압적인"
  },
  {
    "word": "impermeable",
    "definition": "불침투성의, 뚫을 수 없는"
  },
  {
    "word": "imperturbable",
    "definition": "차분한, 동요하지 않는"
  },
  {
    "word": "impervious",
    "definition": "통과시키지 않는; 영향을 받지 않는, 해를 입지 않"
  },
  {
    "word": "impetuous ",
    "definition": "충동적인, 성급한\n"
  },
  {
    "word": "implant  ",
    "definition": "심다, 이식하다, 박다, 주입하다"
  },
  {
    "word": "implement",
    "definition": "이행하다"
  },
  {
    "word": "implicate",
    "definition": "1. (범죄) 연루시키다; 2. 암시하다"
  },
  {
    "word": "implicit",
    "definition": "암시된, 암묵적인"
  },
  {
    "word": "importune ",
    "definition": "성가시게 졸라대다"
  },
  {
    "word": "impose",
    "definition": "부과하다, 지우다; 강제하다"
  },
  {
    "word": "imposter",
    "definition": "사기꾼"
  },
  {
    "word": "impregnable",
    "definition": "무적의, 확고한 "
  },
  {
    "word": "impressionable",
    "definition": "영향을 잘 받는; 감수성이 예민한"
  },
  {
    "word": "impromptu",
    "definition": "즉흥적인; 즉흥연주"
  },
  {
    "word": "improvident",
    "definition": "미래를 대비하지 않는; 낭비하는"
  },
  {
    "word": "improvise",
    "definition": "즉흥적으로 하다"
  },
  {
    "word": "imprudent ",
    "definition": "신중하지 못한, 경솔한, 무분별한"
  },
  {
    "word": "impudent",
    "definition": "무례한, 불손한, 건방진"
  },
  {
    "word": "impugn",
    "definition": "의심하다, 이의를 제기하다, 비난하다, 공격하다"
  },
  {
    "word": "inadequate",
    "definition": "부적절한, 불충분한   "
  },
  {
    "word": "inadvertent",
    "definition": "우연적인, 의도하지 않은 "
  },
  {
    "word": "inadvisable",
    "definition": "현명하지 못한 "
  },
  {
    "word": "inalienable",
    "definition": "양도할 수 없는"
  },
  {
    "word": "inane",
    "definition": "무의미한, 어리석은"
  },
  {
    "word": "inanimate",
    "definition": "살아 있지 않은; 생명이 없는"
  },
  {
    "word": "inattentive ",
    "definition": "무신경의, 집중하지 않는, 부주의한"
  },
  {
    "word": "inaugurate",
    "definition": "시작하다; 취임시키다"
  },
  {
    "word": "incantation",
    "definition": "주술"
  },
  {
    "word": "incarcerate",
    "definition": "투옥시키다, 감금시키다"
  },
  {
    "word": "incendiary",
    "definition": "방화범; 선동가"
  },
  {
    "word": "incense",
    "definition": "몹시 화나게 하다"
  },
  {
    "word": "incentive",
    "definition": "격려, 자극"
  },
  {
    "word": "inception ",
    "definition": "시작, 설립"
  },
  {
    "word": "incessant",
    "definition": "끊임없는, 계속적인"
  },
  {
    "word": "inchoate ",
    "definition": "초기단계의, 발전하지 않은"
  },
  {
    "word": "incidental",
    "definition": "우연적인 "
  },
  {
    "word": "incinerate",
    "definition": "소각하다  "
  },
  {
    "word": "incipient",
    "definition": "시작단계의, 초기의, 발단의"
  },
  {
    "word": "incise",
    "definition": "자르다, 절개하다 "
  },
  {
    "word": "incisive",
    "definition": "예리한, 날카로운, 통렬한 "
  },
  {
    "word": "incite",
    "definition": "자극하다, 선동하다\n"
  },
  {
    "word": "inclement ",
    "definition": "(날씨) 혹독한, 궂은"
  },
  {
    "word": "incoherent ",
    "definition": "(말, 글) 조리가 없는"
  },
  {
    "word": "inconclusive  ",
    "definition": "결정적이지 않은"
  },
  {
    "word": "incongruous",
    "definition": "조화롭지 않은, 일치하지 않는 "
  },
  {
    "word": "inconsistent",
    "definition": "일치하지 않는; 일관성없는; 모순적인"
  },
  {
    "word": "inconsonant",
    "definition": "조화/일치되지 않는"
  },
  {
    "word": "incontrovertible",
    "definition": "논박의 여지가 없는"
  },
  {
    "word": "incorporate",
    "definition": "구체화하다; 포함, 통합시키다"
  },
  {
    "word": "incorrigible ",
    "definition": "고집불통의, 구제불능의"
  },
  {
    "word": "increment ",
    "definition": "증가, 이득"
  },
  {
    "word": "incriminate",
    "definition": "죄를 씌우다, 고소하다"
  },
  {
    "word": "inculpate",
    "definition": "혐의를 씌우다, 죄를 씌우다"
  },
  {
    "word": "incumbent ",
    "definition": "현직의 "
  },
  {
    "word": "incursion",
    "definition": "침입"
  },
  {
    "word": "indefatigable",
    "definition": "지치지 않는"
  },
  {
    "word": "indefeasible  ",
    "definition": "무효화할 수 없는"
  },
  {
    "word": "indelible",
    "definition": "지울 수 없는, 제거할 수 없는"
  },
  {
    "word": "indenture",
    "definition": "고용을 계약서로써 정하다;기한부 도제로 받아들이다  \n"
  },
  {
    "word": "indicate",
    "definition": "나타내다, 암시하다  "
  },
  {
    "word": "indict",
    "definition": "기소하다"
  },
  {
    "word": "indigent",
    "definition": "궁핍한, (생필품) 결핍된"
  },
  {
    "word": "indignation",
    "definition": "분노, 분개 "
  },
  {
    "word": "indispensable",
    "definition": "필수불가결의"
  },
  {
    "word": "indistinguishable",
    "definition": "구별안되는"
  },
  {
    "word": "indolence ",
    "definition": "게으름 "
  },
  {
    "word": "indomitable",
    "definition": "불굴의, 꿋꿋한, 굴복하지 않는"
  },
  {
    "word": "indulge",
    "definition": "탐닉하다; 관대히 대하다"
  },
  {
    "word": "ineffable",
    "definition": "말로 표현할 수 없는, 형언할 수 없는"
  },
  {
    "word": "ineluctable",
    "definition": "피할 수 없는"
  },
  {
    "word": "inept",
    "definition": "서투른\nineptitude[n]"
  },
  {
    "word": "inequity",
    "definition": "불공정, 불공평"
  },
  {
    "word": "ineradicable",
    "definition": "제거되어질 수 없는"
  },
  {
    "word": "inert",
    "definition": "움직이지 않는, 활력없는"
  },
  {
    "word": "inestimable",
    "definition": "측량할 수 없는, 무수한"
  },
  {
    "word": "inevitable",
    "definition": "피할 수 없는, 불가피한"
  },
  {
    "word": "inexhaustible",
    "definition": "소모, 고갈되지 않는   "
  },
  {
    "word": "inexorable",
    "definition": "설득할 수 없는, 막을 수 없는, 무자비한, 가차없는, 냉혹한\n"
  },
  {
    "word": "inexplicable",
    "definition": "설명될 수 없는, 난해한 "
  },
  {
    "word": "inexpungible",
    "definition": "지울 수 없는"
  },
  {
    "word": "infection",
    "definition": "감염 "
  },
  {
    "word": "infiltrate",
    "definition": "잠입하다"
  },
  {
    "word": "infinitesimal",
    "definition": "극소의, 매우 작은\n"
  },
  {
    "word": "infirm",
    "definition": "허약한; (마음) 불확실한"
  },
  {
    "word": "inflame",
    "definition": "불타게 하다, 자극하다 "
  },
  {
    "word": "inflate",
    "definition": "부풀게 하다, 확장시키다, 팽창시키다\n"
  },
  {
    "word": "infraction",
    "definition": "(법률, 약속) 위반"
  },
  {
    "word": "infrangible",
    "definition": "부서지지 않는; 위반해서는 안되는, 불가침의"
  },
  {
    "word": "infuriate  ",
    "definition": "몹시 화나게 하다, 분노케하다"
  },
  {
    "word": "infuse",
    "definition": "가득채우다, 주입하다"
  },
  {
    "word": "ingenious",
    "definition": "독창적인"
  },
  {
    "word": "ingenuous   ",
    "definition": "순진한, 솔직한"
  },
  {
    "word": "ingrained",
    "definition": "(기질, 습관) 뿌리깊은, 깊이박힌"
  },
  {
    "word": "ingratiate",
    "definition": "환심을 사기 위해서 비위를 맞추다"
  },
  {
    "word": "inherent",
    "definition": "본질적인, 타고난"
  },
  {
    "word": "inimical",
    "definition": "해로운, 적대적인"
  },
  {
    "word": "iniquity",
    "definition": "부도덕함, 사악함, 극악함 iniquitous [adj]"
  },
  {
    "word": "inkling",
    "definition": "어렴풋이 알고 있음; 넌지시 비침, 암시"
  },
  {
    "word": "innate ",
    "definition": "타고난, 자연스런 "
  },
  {
    "word": "innocuous",
    "definition": "무해한"
  },
  {
    "word": "inordinate ",
    "definition": "과도한"
  },
  {
    "word": "inopportune",
    "definition": "(시기) 부적절한 "
  },
  {
    "word": "inquisitive",
    "definition": "호기심 많은, 질문많은"
  },
  {
    "word": "insatiable",
    "definition": "(식욕, 욕망) 만족시킬 수 없는"
  },
  {
    "word": "inscrutable",
    "definition": "불가사의한, 난해한\n"
  },
  {
    "word": "insentient",
    "definition": "무감각한, 비정한, 생명없는"
  },
  {
    "word": "insidious ",
    "definition": "배신하는, 속이는"
  },
  {
    "word": "insinuate",
    "definition": "넌지시말하다"
  },
  {
    "word": "insipid",
    "definition": "맛없는; 재미없는, 지루한"
  },
  {
    "word": "insolent",
    "definition": "무례한, 불손한"
  },
  {
    "word": "insouciant",
    "definition": "태평한, 근심이 없는"
  },
  {
    "word": "instigate",
    "definition": "부추기다, 선동하다"
  },
  {
    "word": "instill",
    "definition": "(점차적으로) 주입하다"
  },
  {
    "word": "insubstantial",
    "definition": "허약한, 튼튼하지 않은, 실제적, 실질적이지 못한"
  },
  {
    "word": "insular",
    "definition": "섬의, 고립된, 편협한"
  },
  {
    "word": "insurgent",
    "definition": "반란을 일으킨, 폭도의"
  },
  {
    "word": "intact",
    "definition": "손대지 않은, 손상되지 않은 "
  },
  {
    "word": "intangible ",
    "definition": "만질 수 없는, 비물질적인"
  },
  {
    "word": "integral",
    "definition": "불가결한, 필수의"
  },
  {
    "word": "integrate",
    "definition": "통합하다"
  },
  {
    "word": "integrity",
    "definition": "정직, 청렴; 흠없는 상태, 보전"
  },
  {
    "word": "intemperate",
    "definition": "무절제한, 방탕한"
  },
  {
    "word": "intensify",
    "definition": "심화시키다; 강화시키다"
  },
  {
    "word": "inter",
    "definition": "매장하다"
  },
  {
    "word": "interdisciplinary",
    "definition": "학제간의 "
  },
  {
    "word": "interim",
    "definition": "중간의, 임시의"
  },
  {
    "word": "interminable",
    "definition": "끝없는"
  },
  {
    "word": "intermittent",
    "definition": "때때로, 가끔 발생하는"
  },
  {
    "word": "interpose",
    "definition": "삽입시키다; 양자 사이에 개입하다"
  },
  {
    "word": "intertwine",
    "definition": "얽히게 하다 "
  },
  {
    "word": "intervene",
    "definition": "개입, 간섭하다"
  },
  {
    "word": "intimate",
    "definition": "넌지시 알려주다, 암시하다"
  },
  {
    "word": "intimidate",
    "definition": "위협하다"
  },
  {
    "word": "intractable",
    "definition": "유순하지 않는, 다루기힘든, 고집센"
  },
  {
    "word": "intransigent",
    "definition": "비타협적인, 완고한\nintransigence [n]"
  },
  {
    "word": "intrepid",
    "definition": "겁없는, 대담한"
  },
  {
    "word": "intricate",
    "definition": "복잡한, 얽힌"
  },
  {
    "word": "intriguing",
    "definition": "호기심을 자아내는, 재미를 자아내는; 매력적인"
  },
  {
    "word": "intrinsic",
    "definition": "본질적인, 고유의"
  },
  {
    "word": "introspection",
    "definition": "내성, 성찰  "
  },
  {
    "word": "introverted",
    "definition": "내성적인 "
  },
  {
    "word": "intrusive",
    "definition": "간섭, 참견하는 "
  },
  {
    "word": "inundate ",
    "definition": "범람하다, 압도하다, 쇄도하다"
  },
  {
    "word": "inured",
    "definition": "(안좋은 것에) 익숙해진 "
  },
  {
    "word": "invalidate",
    "definition": "무효로 하다"
  },
  {
    "word": "invective",
    "definition": "욕설, 모욕적인 말"
  },
  {
    "word": "inventory",
    "definition": "재고목록, 품목 일람, 재고조사"
  },
  {
    "word": "invert",
    "definition": "거꾸로 하다 "
  },
  {
    "word": "inveterate",
    "definition": "만성적인"
  },
  {
    "word": "invigorate",
    "definition": "기운나게하다, 격려하다"
  },
  {
    "word": "invincible",
    "definition": "이길 수 없는, 무적의"
  },
  {
    "word": "inviolate",
    "definition": "신성한, 더럽혀지지 않은"
  },
  {
    "word": "invoke",
    "definition": "불러일으키다, 호소하다, (법등을)적용하다"
  },
  {
    "word": "invulnerable",
    "definition": "무적의, 강한 "
  },
  {
    "word": "irascible ",
    "definition": "화 잘내는"
  },
  {
    "word": "irk ",
    "definition": "짜증나게 하다; 화나게 하다"
  },
  {
    "word": "irreconcilable ",
    "definition": "화해될 수 없는   "
  },
  {
    "word": "irrefutable ",
    "definition": "논박할 수 없는"
  },
  {
    "word": "irregular",
    "definition": "불규칙한, 비정규의, 불안정한"
  },
  {
    "word": "irrelevant",
    "definition": "관련없는"
  },
  {
    "word": "irreproachable",
    "definition": "비난의 여지가 없는, 흠잡을 데 없는"
  },
  {
    "word": "irresolution",
    "definition": "주저함, 마음의 불확실"
  },
  {
    "word": "irreverent",
    "definition": "불손한, 불경스런"
  },
  {
    "word": "irrevocable",
    "definition": "돌이킬 수 없는, 취소할 수 없는"
  },
  {
    "word": "irritation",
    "definition": "화, 짜증 잘 내는; 다루기 힘든"
  },
  {
    "word": "jaded",
    "definition": "지친, 지긋지긋한, 싫증난"
  },
  {
    "word": "jargon",
    "definition": "전문어  "
  },
  {
    "word": "jaundice",
    "definition": "편파적으로 대하다"
  },
  {
    "word": "jaunty",
    "definition": "경쾌한, 활발한"
  },
  {
    "word": "jejune",
    "definition": "무미건조한, 재미없는"
  },
  {
    "word": "jest",
    "definition": "농담; 놀리다, 비웃다\n"
  },
  {
    "word": "jingoism ",
    "definition": "국수주의"
  },
  {
    "word": "jittery",
    "definition": "신경질적인, 초조해하는"
  },
  {
    "word": "jocose",
    "definition": "익살맞은, 웃기는"
  },
  {
    "word": "jocular ",
    "definition": "익살맞은, 까부는"
  },
  {
    "word": "jocund",
    "definition": "쾌활한"
  },
  {
    "word": "jubilant",
    "definition": "환희에 가득찬, 매우 기뻐하는"
  },
  {
    "word": "judicious",
    "definition": "현명한"
  },
  {
    "word": "juxtaposition",
    "definition": "병렬, 병치"
  },
  {
    "word": "keen",
    "definition": "열렬한, 예리한, 날카로운"
  },
  {
    "word": "kindred",
    "definition": "1. [adj]유사한, 2. [n] 일가친척"
  },
  {
    "word": "kinetic ",
    "definition": "움직임과 관련한, 활동적인  kinetic energy운동에너지"
  },
  {
    "word": "knack",
    "definition": "요령, 비결"
  },
  {
    "word": "knotty",
    "definition": "매듭으로 가득한; 풀기 어려운"
  },
  {
    "word": "kudos",
    "definition": "영광, 명성; 찬양"
  },
  {
    "word": "labyrinth",
    "definition": "미로"
  },
  {
    "word": "lacerate ",
    "definition": "찢다; 깊은 상처를 주다, 괴롭히다"
  },
  {
    "word": "lachrymose",
    "definition": "눈물이 가득한; 눈물나게 하는"
  },
  {
    "word": "lackluster",
    "definition": "빛(광택)이 없는; 활기없는"
  },
  {
    "word": "laconic ",
    "definition": "간결한, 과묵한, 무뚝뚝한"
  },
  {
    "word": "lag",
    "definition": "꾸물거리다, 처지다"
  },
  {
    "word": "laggard   ",
    "definition": "꾸물거리는, 처지는; 게으름뱅이"
  },
  {
    "word": "lambaste",
    "definition": "심하게 비난하다"
  },
  {
    "word": "lament",
    "definition": "한탄하다, 슬퍼하다, 애통해하다"
  },
  {
    "word": "languid",
    "definition": "늘어진, 나른한, 기력없는"
  },
  {
    "word": "languish",
    "definition": "기력을 잃다, 쇠약해지다"
  },
  {
    "word": "languor ",
    "definition": "쇠약; 무기력, 권태; 무관심"
  },
  {
    "word": "lapse",
    "definition": "1. (일시적인) 쇠퇴, 잘못, 과실 2. (시간의) 경과, 기간"
  },
  {
    "word": "largesse",
    "definition": "후함"
  },
  {
    "word": "lassitude",
    "definition": "무기력"
  },
  {
    "word": "latent",
    "definition": "잠재성의"
  },
  {
    "word": "latitude",
    "definition": "(행동, 사항, 견해) 자유, 허용 정도"
  },
  {
    "word": "laud",
    "definition": "칭찬하다, 찬양하다\nlaudable [adj]"
  },
  {
    "word": "lavish",
    "definition": "사치스런, 아낌없는; 낭비하다 "
  },
  {
    "word": "lax",
    "definition": "축늘어진; 엄하지 않은, 관대한, 부주의한"
  },
  {
    "word": "layperson ",
    "definition": "문외한"
  },
  {
    "word": "leaden",
    "definition": "둔한, 느릿한; 활기없는"
  },
  {
    "word": "leaning(s)",
    "definition": "기호, 편애"
  },
  {
    "word": "learned",
    "definition": "유식한"
  },
  {
    "word": "leeway ",
    "definition": "자유로 할 수 있는, 일정수준의 여지"
  },
  {
    "word": "legendary",
    "definition": "전설적인, 매우 유명한"
  },
  {
    "word": "legible",
    "definition": "읽을수/이해할수있는"
  },
  {
    "word": "lethargy",
    "definition": "무기력"
  },
  {
    "word": "lettered",
    "definition": "박식한, 교육받은"
  },
  {
    "word": "leviathan",
    "definition": "거대한 바다동물; 거대한 것"
  },
  {
    "word": "levity",
    "definition": "경솔함, 변덕, 경박함"
  },
  {
    "word": "libel",
    "definition": "문서에 의한 명예훼손; (문서로) 명예를 훼손하다"
  },
  {
    "word": "liberality ",
    "definition": "후함, 관대함"
  },
  {
    "word": "libertine",
    "definition": "난봉꾼"
  },
  {
    "word": "license",
    "definition": "허락, 인가하다"
  },
  {
    "word": "licentious",
    "definition": "음란한, 문란한"
  },
  {
    "word": "lighthearted",
    "definition": "걱정이 없는, 쾌활한, 명랑한"
  },
  {
    "word": "liken",
    "definition": "비유하다, 비견하다"
  },
  {
    "word": "limp",
    "definition": "절뚝거리다"
  },
  {
    "word": "limpid ",
    "definition": "(액체) 깨끗한, 맑은"
  },
  {
    "word": "linger",
    "definition": "(아쉬운 듯이) 남아 있다, (떠나지 않고) 꾸물거리다;서성대다  "
  },
  {
    "word": "lionize",
    "definition": "명사로 대접해주다, 치켜세우다"
  },
  {
    "word": "lithe",
    "definition": "유연한, 우아한"
  },
  {
    "word": "loaf",
    "definition": "빈둥거리다 "
  },
  {
    "word": "loath",
    "definition": "내켜하지 않는  loathe 협오하다  loathsome 혐오스런 "
  },
  {
    "word": "locus",
    "definition": "(특정) 위치, 장소  "
  },
  {
    "word": "lofty",
    "definition": "숭고한"
  },
  {
    "word": "longevity",
    "definition": "장수, 오래 지속됨"
  },
  {
    "word": "lopsided",
    "definition": "한쪽으로 기울어진, 불균형의  "
  },
  {
    "word": "loquacious",
    "definition": "(매우) 수다스런"
  },
  {
    "word": "lubricate",
    "definition": "기름칠하다, 매끄럽게 하다, 원활하게 하다"
  },
  {
    "word": "lucid",
    "definition": "명백하여 이해하기 쉬운"
  },
  {
    "word": "ludicrous",
    "definition": "웃기는, 익살스런 "
  },
  {
    "word": "lugubrious",
    "definition": "침울한, 슬픈"
  },
  {
    "word": "lukewarm",
    "definition": "(물) 미지근한, 열의없는   "
  },
  {
    "word": "lull ",
    "definition": "일시적 잠잠함, 소강상태; 달래다, 어르다, 재우다\n"
  },
  {
    "word": "luminary ",
    "definition": "선각자, 권위자, 유명인"
  },
  {
    "word": "luminous",
    "definition": "빛나는, 반짝이는 "
  },
  {
    "word": "lurch ",
    "definition": "[n], [v] 갑자기 휘청거리다  "
  },
  {
    "word": "lurid",
    "definition": "무시무시한; (색깔) 매우 밝은, 선정적인 "
  },
  {
    "word": "lurk ",
    "definition": "잠복하다, 숨어서 기다리다"
  },
  {
    "word": "luster",
    "definition": "광택"
  },
  {
    "word": "luxuriant  ",
    "definition": "무성한, 비옥한, 풍성한"
  },
  {
    "word": "luxurious ",
    "definition": "사치스런; 호사스런"
  },
  {
    "word": "macabre",
    "definition": "으스스한, 소름끼치는"
  },
  {
    "word": "machination ",
    "definition": "음모, 계획"
  },
  {
    "word": "maculate",
    "definition": "반점이 있는, 더러워진; 반점을 찍다, 더럽히다"
  },
  {
    "word": "madcap ",
    "definition": "무모한, 황급한, 미친"
  },
  {
    "word": "magnanimity",
    "definition": "도량, 관대함"
  },
  {
    "word": "magniloquent",
    "definition": "호언 장담하는"
  },
  {
    "word": "mainstay ",
    "definition": "기둥, 중심축 "
  },
  {
    "word": "majestic",
    "definition": "위엄한, 당당한, 장엄한"
  },
  {
    "word": "maladroit",
    "definition": "솜씨없는, 서투른"
  },
  {
    "word": "malady",
    "definition": "질병, 병폐"
  },
  {
    "word": "malaise",
    "definition": "초조, 불안, 불편, 불쾌"
  },
  {
    "word": "malapropism",
    "definition": "말의 익살스런 오용 [뜻이 다르지만 발음이 비슷해서 발생하는 실수 혹은 그런 의도적 사용]"
  },
  {
    "word": "malevolent",
    "definition": "악의적인, 사악한"
  },
  {
    "word": "malicious",
    "definition": "악의[적의] 있는, 심술궂은"
  },
  {
    "word": "malign",
    "definition": "(악의적으로) 비난하다"
  },
  {
    "word": "malinger",
    "definition": "꾀병을 부리다, (의무) 회피하다"
  },
  {
    "word": "malleable ",
    "definition": "(금속) 변형이 잘되는"
  },
  {
    "word": "malodorous",
    "definition": "악취가 나는"
  },
  {
    "word": "mandate",
    "definition": "권한, 지시하다 [n,v]"
  },
  {
    "word": "maniac",
    "definition": "광적으로 열중하는 사람"
  },
  {
    "word": "manifest",
    "definition": "뚜렷한, 명백한"
  },
  {
    "word": "manipulate",
    "definition": "교묘하게 다루다, 조종하다  "
  },
  {
    "word": "manumit",
    "definition": "해방하다"
  },
  {
    "word": "mar",
    "definition": "망치다, 손상하다"
  },
  {
    "word": "marbled",
    "definition": "대리석 무늬의"
  },
  {
    "word": "marginal ",
    "definition": "사소한, 중요하지 않은"
  },
  {
    "word": "martial ",
    "definition": "전쟁,전투와 관련된\n"
  },
  {
    "word": "martinet",
    "definition": "엄격한 규율가, 엄격한 교관"
  },
  {
    "word": "mask",
    "definition": "가면; 숨기다, 가리다\n"
  },
  {
    "word": "masticate",
    "definition": "씹다"
  },
  {
    "word": "matchless    ",
    "definition": "적수가 없는, 대단한"
  },
  {
    "word": "matter-of-fact",
    "definition": "현실적인, 실질적인,사실 그대로만의"
  },
  {
    "word": "maudlin",
    "definition": "지나치게 감상적인, 취하면 우는"
  },
  {
    "word": "maven",
    "definition": "전문가"
  },
  {
    "word": "maverick",
    "definition": "독불장군"
  },
  {
    "word": "mawkish",
    "definition": "매우 감상적인"
  },
  {
    "word": "meager",
    "definition": "부족한, 빈약한"
  },
  {
    "word": "meander ",
    "definition": "정처없이 거닐다, (강) 굽이굽이 흐르다"
  },
  {
    "word": "measly",
    "definition": "(양) 아주조금인"
  },
  {
    "word": "measured",
    "definition": "정확히 측정한; 신중한"
  },
  {
    "word": "meddle ",
    "definition": "참견하다"
  },
  {
    "word": "mediate",
    "definition": "(평화, 협정) 성립시키다, (논쟁, 쟁의) 조정하다, 중재하다"
  },
  {
    "word": "mediocre ",
    "definition": "평범한, 보통의  "
  },
  {
    "word": "meek",
    "definition": "온순한, 유순한"
  },
  {
    "word": "meet",
    "definition": "적절한"
  },
  {
    "word": "meld",
    "definition": "혼합하다 "
  },
  {
    "word": "mellifluous ",
    "definition": "(소리, 말) 감미로운"
  },
  {
    "word": "menace",
    "definition": "위협하는 것(사람); 위협하다"
  },
  {
    "word": "mend",
    "definition": "고치다, 수선하다"
  },
  {
    "word": "mendacious",
    "definition": "거짓말하는"
  },
  {
    "word": "mendicant",
    "definition": "거지, 구걸, 탁발승의"
  },
  {
    "word": "menial  ",
    "definition": "하인의, 비천한"
  },
  {
    "word": "mercurial",
    "definition": "변덕스런"
  },
  {
    "word": "merge",
    "definition": "융합, 합병하다 "
  },
  {
    "word": "merited",
    "definition": "(상, 벌, 주목) 받을 자격이 있는"
  },
  {
    "word": "metamorphose ",
    "definition": "변형하다"
  },
  {
    "word": "metaphoric[al]",
    "definition": "은유의, 은유적인"
  },
  {
    "word": "metaphysical",
    "definition": "형이상학적인, 극히 추상적인\nmetaphysics n. 형이상학"
  },
  {
    "word": "meteoric",
    "definition": "유성같이 빠른, 밝은, 금방사라지는"
  },
  {
    "word": "methodical",
    "definition": "질서정연한, 방법론적인"
  },
  {
    "word": "meticulous ",
    "definition": "매우 꼼꼼한, 주의깊은, 정확한"
  },
  {
    "word": "mettle",
    "definition": "용기, 원기, 기개\n mettlesome[adj]"
  },
  {
    "word": "milestone",
    "definition": "이정표 기념비적인(획기적인) 사건, 일"
  },
  {
    "word": "minatory",
    "definition": "위협하는"
  },
  {
    "word": "mindful",
    "definition": "인식하는, 알고있는"
  },
  {
    "word": "minute",
    "definition": "(요리) 즉석으로 만든; 미세한, 상세한"
  },
  {
    "word": "minutia",
    "definition": "작고 사소한 세부사항"
  },
  {
    "word": "mire",
    "definition": "습지, 늪; 곤경; (어려운 상황에) 얽히게 하다"
  },
  {
    "word": "mirth",
    "definition": "환희, 유쾌함, 웃음"
  },
  {
    "word": "misanthrope ",
    "definition": "인간을 싫어하는 사람, 염세가"
  },
  {
    "word": "miscellaneous",
    "definition": "갖가지 잡다한; 잡동사니의"
  },
  {
    "word": "miscreant",
    "definition": "범법자"
  },
  {
    "word": "misdemeanor",
    "definition": "나쁜 행동"
  },
  {
    "word": "miserly",
    "definition": "구두쇠의"
  },
  {
    "word": "mishap ",
    "definition": "불행한 일"
  },
  {
    "word": "mislead",
    "definition": "속이다, 오도하다"
  },
  {
    "word": "misnomer",
    "definition": "오명, 잘못 붙여진 이름 "
  },
  {
    "word": "mitigate",
    "definition": "완화시키다, 가볍게하다"
  },
  {
    "word": "moderate",
    "definition": "적절하게 하다, 완화시키다"
  },
  {
    "word": "modicum",
    "definition": "소량"
  },
  {
    "word": "mold",
    "definition": "모양을 바꾸다; 변형시키다"
  },
  {
    "word": "mollify",
    "definition": "달래다"
  },
  {
    "word": "momentum",
    "definition": "운동량"
  },
  {
    "word": "monolithic ",
    "definition": "거대한, 강한, 균일한, 획일적인 "
  },
  {
    "word": "monopolize",
    "definition": "독점하다"
  },
  {
    "word": "moratorium",
    "definition": "(지불, 집행) 유예"
  },
  {
    "word": "morbid",
    "definition": "병의, 병적인"
  },
  {
    "word": "mordant",
    "definition": "신랄한"
  },
  {
    "word": "moribund",
    "definition": "다죽어가는; 기력없는"
  },
  {
    "word": "morose",
    "definition": "시무룩하고 언짢은"
  },
  {
    "word": "motley",
    "definition": "잡동사니의, 잡색의\n"
  },
  {
    "word": "mottle",
    "definition": "점, 얼룩 "
  },
  {
    "word": "muddle",
    "definition": "혼동시키다  "
  },
  {
    "word": "muffle",
    "definition": "소음(消音)시키다"
  },
  {
    "word": "mulish",
    "definition": "고집스런"
  },
  {
    "word": "multifaceted",
    "definition": "다면적인  "
  },
  {
    "word": "mundane ",
    "definition": "평범한, 흔한; 세속적인"
  },
  {
    "word": "munificent",
    "definition": "돈을 후하게 쓰는"
  },
  {
    "word": "murky",
    "definition": "어둑어둑한, 안개가자욱한, 모호한, 애매한"
  },
  {
    "word": "mutability ",
    "definition": "변화성"
  },
  {
    "word": "mutate",
    "definition": "변화하다, 변화시키다"
  },
  {
    "word": "mute",
    "definition": "소리 없는"
  },
  {
    "word": "myopia",
    "definition": "근시안"
  },
  {
    "word": "myriad",
    "definition": "수많은, 다수"
  },
  {
    "word": "nadir",
    "definition": "천저, 밑바닥, 절망상태"
  },
  {
    "word": "naive",
    "definition": "순진한, 순박한, 경험이 없는"
  },
  {
    "word": "nascent  ",
    "definition": "지금 막 생겨난"
  },
  {
    "word": "natty",
    "definition": "말끔한"
  },
  {
    "word": "nebulous",
    "definition": "흐린, 구름같은, 뚜렷하지 않은"
  },
  {
    "word": "nefarious",
    "definition": "사악한, 범법의"
  },
  {
    "word": "negligent",
    "definition": "태만한; 적절한 주의를 기울이지 못하는\n"
  },
  {
    "word": "negligible",
    "definition": "하찮은"
  },
  {
    "word": "nemesis   ",
    "definition": "벌; 강적"
  },
  {
    "word": "neologism ",
    "definition": "신조어, 관용구 "
  },
  {
    "word": "nepotism",
    "definition": "친족주의\n"
  },
  {
    "word": "nervy",
    "definition": "건방진, 뻔뻔스런"
  },
  {
    "word": "nettle",
    "definition": "화나게 하다, 안절부절못하게 하다; 쐐기풀"
  },
  {
    "word": "nibble   ",
    "definition": "조금씩 물어뜯다, 잠식하다"
  },
  {
    "word": "nice",
    "definition": "철저한, 꼼꼼한, 정확한"
  },
  {
    "word": "nimble",
    "definition": "민첩한, 영리한"
  },
  {
    "word": "nitpick",
    "definition": "트집잡다"
  },
  {
    "word": "nocturnal",
    "definition": "밤의, 야행성의"
  },
  {
    "word": "noisome",
    "definition": "불쾌한, 해로운, 악취가 나는"
  },
  {
    "word": "nonchalant",
    "definition": "태연한, 무관심한\n"
  },
  {
    "word": "noncommittal ",
    "definition": "분명한 의견을 표명하지 않은, 애매한, 확실하지 않은"
  },
  {
    "word": "nonconformity",
    "definition": "(표준, 전통, 규칙, 법률등) 따르지 않음, 불순응, 불일치"
  },
  {
    "word": "nondescript",
    "definition": "뚜렷한 특징이 없는"
  },
  {
    "word": "nonentity",
    "definition": "보잘것없는 대상"
  },
  {
    "word": "nonplus",
    "definition": "혼란스럽게 하다, 놀라게 하다"
  },
  {
    "word": "nostrum ",
    "definition": "엉터리처방"
  },
  {
    "word": "notch",
    "definition": "(V자형 모양) 새김눈; 급, 단계\n"
  },
  {
    "word": "notoriety",
    "definition": "(악명으로) 유명함"
  },
  {
    "word": "novice",
    "definition": "초보자"
  },
  {
    "word": "noxious",
    "definition": "해로운, 불쾌한"
  },
  {
    "word": "nuance",
    "definition": "미묘한 차이, 음영\nnuanced [adj]"
  },
  {
    "word": "nugatory",
    "definition": "중요하지 않은, 하찮은"
  },
  {
    "word": "nuisance ",
    "definition": "귀찮은 것, 성가신 것, 폐"
  },
  {
    "word": "nullify",
    "definition": "무효화하다"
  },
  {
    "word": "numb",
    "definition": "마비된; 마비시키다"
  },
  {
    "word": "numberless",
    "definition": "셀 수 없이 많은"
  },
  {
    "word": "nurture ",
    "definition": "양육하다, 돌보다"
  },
  {
    "word": "oaf ",
    "definition": "바보, 멍청이\noafish [adj]"
  },
  {
    "word": "obdurate",
    "definition": "고집센"
  },
  {
    "word": "obeisant ",
    "definition": "정중한"
  },
  {
    "word": "obfuscate",
    "definition": "애매하게 하게 하다, 어리둥절하게 하다"
  },
  {
    "word": "oblique",
    "definition": "기울어진, 비스듬한; 완곡한, 모호한; 부정한, 잘못된"
  },
  {
    "word": "obliterate",
    "definition": "완전제거하다, 지우다"
  },
  {
    "word": "oblivious",
    "definition": "알아채지 못한, 염두에 없는, 망각한\noblivion [n]"
  },
  {
    "word": "obscenity",
    "definition": "저속한 행동, 말"
  },
  {
    "word": "obscure",
    "definition": "불명료하게 하다; 불명료한; 유명하지 않은"
  },
  {
    "word": "obsequious",
    "definition": "아부하는"
  },
  {
    "word": "observant",
    "definition": "지각력이 예민한, 기민한"
  },
  {
    "word": "obsolete",
    "definition": "구식의, 못쓰게 된 obsolescence [n]"
  },
  {
    "word": "obstinate",
    "definition": "완고한, 완강한\nobstinacy [n]"
  },
  {
    "word": "obstreperous",
    "definition": "통제가 안되는, 시끄러운, 떠들석한\n"
  },
  {
    "word": "obstructionist",
    "definition": "(입법행위) 의사방해자"
  },
  {
    "word": "obtrusive",
    "definition": "돌출한, 눈에 거슬리는; 나서는, 주제넘은"
  },
  {
    "word": "obtuse",
    "definition": "둔한, 이해가 매우 느린; 뭉퉁한, 둔한"
  },
  {
    "word": "obviate",
    "definition": "미리 막다, 피하다; (필요성이나 어려움) 제거하다"
  },
  {
    "word": "occlude",
    "definition": "닫다, 가두다, 막다"
  },
  {
    "word": "occult",
    "definition": "숨겨진, 눈에 보이지 않는, 난해한"
  },
  {
    "word": "odious",
    "definition": "몹시 불쾌한, 혐오스런"
  },
  {
    "word": "offbeat",
    "definition": "색다른"
  },
  {
    "word": "offend",
    "definition": "불쾌하게 하다 "
  },
  {
    "word": "officious",
    "definition": "참견이 심한"
  },
  {
    "word": "offset",
    "definition": "상쇄하다"
  },
  {
    "word": "omnipotent",
    "definition": "전능한"
  },
  {
    "word": "onerous",
    "definition": "힘든, 성가신, 귀찮은"
  },
  {
    "word": "onset ",
    "definition": "시작"
  },
  {
    "word": "opaque",
    "definition": "불투명한"
  },
  {
    "word": "opportune",
    "definition": "(시기, 시간) 적절한\n"
  },
  {
    "word": "opportunistic",
    "definition": "기회주의적인"
  },
  {
    "word": "opprobrium",
    "definition": "불명예, 비난  opporobrious [adj]"
  },
  {
    "word": "opulent  ",
    "definition": "부유한, 풍성한"
  },
  {
    "word": "orator",
    "definition": "웅변가, 대중연설가"
  },
  {
    "word": "orthodox",
    "definition": "정설, 정교의"
  },
  {
    "word": "oscillate ",
    "definition": "진동하다, 주저하다, 흔들리다"
  },
  {
    "word": "ossify",
    "definition": "골화(骨化)되다; 보수화되다"
  },
  {
    "word": "ostensible",
    "definition": "표면상의, 겉보기만의; 명백한, 명료한"
  },
  {
    "word": "ostentatious ",
    "definition": "자랑/과시하는, 허세부리는"
  },
  {
    "word": "ostracize",
    "definition": "추방하다"
  },
  {
    "word": "oust",
    "definition": "(지위, 장소에서) 내쫓다, 축출하다"
  },
  {
    "word": "outdated",
    "definition": "구식의"
  },
  {
    "word": "outlandish",
    "definition": "별난, 기이한, 희한한; 이국적인"
  },
  {
    "word": "outlaw",
    "definition": "범법자, 무법자; 금하다 "
  },
  {
    "word": "outmoded ",
    "definition": "구식의"
  },
  {
    "word": "outspoken",
    "definition": "솔직한"
  },
  {
    "word": "outstrip",
    "definition": "능가하다, 뛰어나다 "
  },
  {
    "word": "overbearing",
    "definition": "횡포한, 고압적인, 거만한; 압도적인"
  },
  {
    "word": "overhaul",
    "definition": "정밀점검하다; 전면 개보수하다"
  },
  {
    "word": "overriding ",
    "definition": "가장 중요한, 최우선의"
  },
  {
    "word": "overrule",
    "definition": "(결정 등) 뒤엎다, 파기하다;  거부하다 \n"
  },
  {
    "word": "overshadow",
    "definition": "그늘지게 하다, 다른 것보다 중요하게 되다"
  },
  {
    "word": "overt",
    "definition": "공공연한, 명백한, 숨김없는"
  },
  {
    "word": "overwhelming",
    "definition": "압도적인"
  },
  {
    "word": "pacify",
    "definition": "달래다, 진정시키다\n"
  },
  {
    "word": "paean",
    "definition": "찬가"
  },
  {
    "word": "painstaking",
    "definition": "애쓰는, 수고를 아끼지 않는, 면밀한, 철저한"
  },
  {
    "word": "palatable",
    "definition": "맛있는"
  },
  {
    "word": "palatial",
    "definition": "궁전같이 웅장하고 멋진"
  },
  {
    "word": "palliate ",
    "definition": "(증상) 완화시키다"
  },
  {
    "word": "pallid",
    "definition": "(얼굴) 창백한"
  },
  {
    "word": "pallor",
    "definition": "창백함"
  },
  {
    "word": "palpable",
    "definition": "만져서 알 수 있는; 명백한, 뚜렷한"
  },
  {
    "word": "palpitate",
    "definition": "(심장) 빠르게 뛰다\n"
  },
  {
    "word": "palter",
    "definition": "둘러대다, 얼버무리다, 속이다"
  },
  {
    "word": "paltry",
    "definition": "시시한, 하찮은"
  },
  {
    "word": "pan ",
    "definition": "심하게 비난하다"
  },
  {
    "word": "panacea ",
    "definition": "만병통치약, 이상적인 해결책이지만 사실 없는"
  },
  {
    "word": "panache",
    "definition": "당당한 태도, 품격, 기백, 과"
  },
  {
    "word": "pandemic",
    "definition": "(병이) 전국이나 전세계적으로 퍼지는; 그런 전염병"
  },
  {
    "word": "panegyric  ",
    "definition": "칭송, 찬양"
  },
  {
    "word": "paradigm",
    "definition": "전형, 모범"
  },
  {
    "word": "paragon",
    "definition": "완벽한 예가 되는 사람이나 사물, 모범, 전형"
  },
  {
    "word": "parallel",
    "definition": "평행; 유사"
  },
  {
    "word": "paralyze",
    "definition": "마비시키다"
  },
  {
    "word": "paramount",
    "definition": "가장 중요한; 최고의"
  },
  {
    "word": "paranoid",
    "definition": "편집증의, 지나치게 의심하는"
  },
  {
    "word": "pariah",
    "definition": "사회적으로 경멸받고 따돌림 당하는 사람, 추방자"
  },
  {
    "word": "parity",
    "definition": "동등, 동격, 동량"
  },
  {
    "word": "parochial ",
    "definition": "제한된, 편협한, 지방의"
  },
  {
    "word": "paroxysm",
    "definition": "갑작스런 발작, 감정의 폭발"
  },
  {
    "word": "parry",
    "definition": "(대답 등) 회피하다"
  },
  {
    "word": "parsimony",
    "definition": "인색함"
  },
  {
    "word": "partisan",
    "definition": "열렬한 지지자(당원)"
  },
  {
    "word": "pastoral ",
    "definition": "전원적인"
  },
  {
    "word": "patent",
    "definition": "명백한, 눈에 띄는"
  },
  {
    "word": "paternalism ",
    "definition": "온정주의, 가부장주의"
  },
  {
    "word": "patronage",
    "definition": "후원"
  },
  {
    "word": "patronize",
    "definition": "후원하다; 우월하게 행동하다, 생색내다"
  },
  {
    "word": "paucity",
    "definition": "소량, 결핍, 부족"
  },
  {
    "word": "peccadillo",
    "definition": "가벼운 죄, 사소한 실수"
  },
  {
    "word": "pedagogue",
    "definition": "선생님; 교육자\n"
  },
  {
    "word": "pedantic",
    "definition": "현학적인; 아는척하는, 규칙에 목메는\npedantry [n]"
  },
  {
    "word": "pedestrian",
    "definition": "평범한, 진부한"
  },
  {
    "word": "peerless",
    "definition": "적수가 없는, 최고의\n"
  },
  {
    "word": "peeve",
    "definition": "화나게 하다\n\npeevish [adj]"
  },
  {
    "word": "pejorative",
    "definition": "경멸적인, 비난적인"
  },
  {
    "word": "pell-mell",
    "definition": "뒤죽박죽, 황급한"
  },
  {
    "word": "penchant",
    "definition": "강한 기호, 경향, 좋아함"
  },
  {
    "word": "penetrate",
    "definition": "1. 관통하다, 꿰뚫다; 2. (사실, 진리) 간파하다, 통찰하다, 이해하다"
  },
  {
    "word": "penitent",
    "definition": "참회하는, 뉘우치는"
  },
  {
    "word": "penurious",
    "definition": "몹시 가난한; 인색한\n"
  },
  {
    "word": "pep",
    "definition": "활기, 원기, 활력\n"
  },
  {
    "word": "perceptual",
    "definition": "지각의  \n"
  },
  {
    "word": "percipient",
    "definition": "지각하는, 감지하는, 통찰력 있는\n"
  },
  {
    "word": "peregrination ",
    "definition": "여정, 여행"
  },
  {
    "word": "peremptory",
    "definition": "단호한, 지엄한; 위압적인, 독단적인\n"
  },
  {
    "word": "perennial",
    "definition": "지속적인, 영구적인"
  },
  {
    "word": "perfidy",
    "definition": "배신, 속임"
  },
  {
    "word": "perforate",
    "definition": "구멍뚫다"
  },
  {
    "word": "perfunctory",
    "definition": "형식적인, 기계적인"
  },
  {
    "word": "perimeter",
    "definition": "주변, 주위; 한계, 한도"
  },
  {
    "word": "peripatetic",
    "definition": "순회하는, 돌아다니는"
  },
  {
    "word": "peripheral",
    "definition": "주변부의, 중요하지 않은"
  },
  {
    "word": "permissive",
    "definition": "허용하는"
  },
  {
    "word": "permute   ",
    "definition": "변경하다, 순서를 바꾸다"
  },
  {
    "word": "pernicious ",
    "definition": "해로운"
  },
  {
    "word": "perpetrate",
    "definition": "(범죄, 과실, 실책) 범하다, 저지르다"
  },
  {
    "word": "perpetual",
    "definition": "영원한"
  },
  {
    "word": "perpetuate",
    "definition": "영속하게 하다, 불멸하게하다"
  },
  {
    "word": "perquisite",
    "definition": "(직위로 인해 얻는) 특권"
  },
  {
    "word": "persevere",
    "definition": "인내하다, 견디다"
  },
  {
    "word": "persistent",
    "definition": "집요한, 고집부리는; 지속하는"
  },
  {
    "word": "personable",
    "definition": "잘생긴, 매력적인\n"
  },
  {
    "word": "personify",
    "definition": "의인화하다; 구체화하다 "
  },
  {
    "word": "perspective",
    "definition": "관점"
  },
  {
    "word": "perspicacious",
    "definition": "통찰력있는, 명민한\n\nperspicacity [n]"
  },
  {
    "word": "perspicuous ",
    "definition": "명확한, 명료한\n* perspicuity [n]"
  },
  {
    "word": "persuasive",
    "definition": "설득력있는\n"
  },
  {
    "word": "pertain",
    "definition": "포함하다; 관계있다 "
  },
  {
    "word": "pertinacious",
    "definition": "완고한"
  },
  {
    "word": "pertinent",
    "definition": "관련된, 적절한"
  },
  {
    "word": "perturb",
    "definition": "마음을 동요시키다"
  },
  {
    "word": "peruse ",
    "definition": "꼼꼼히 살피다, 정독하다"
  },
  {
    "word": "pervade",
    "definition": "퍼지다, 온통가득하다"
  },
  {
    "word": "pervasive",
    "definition": "널리 퍼져있는"
  },
  {
    "word": "pester",
    "definition": "괴롭히다, 조르다"
  },
  {
    "word": "petty",
    "definition": "사소한, 하찮은"
  },
  {
    "word": "petulant",
    "definition": "성마른"
  },
  {
    "word": "phantom           ",
    "definition": "유령(같은)"
  },
  {
    "word": "phenomenal",
    "definition": "경이로운, 대단한\n"
  },
  {
    "word": "philanthropy",
    "definition": "박애주의"
  },
  {
    "word": "phlegmatic",
    "definition": "점액질의; 무감한, 무기력한"
  },
  {
    "word": "piety",
    "definition": "경건함"
  },
  {
    "word": "pilfer",
    "definition": "훔치다"
  },
  {
    "word": "pinion ",
    "definition": "손발을 묶다, 구속/속박하다"
  },
  {
    "word": "pinnacle",
    "definition": "절정, 전성기, 정상"
  },
  {
    "word": "pinpoint ",
    "definition": "정확히 짚다, 정밀조준"
  },
  {
    "word": "piquant",
    "definition": "자극적이고 맛있는; (분위기, 태도) 자극적이고 적극적인"
  },
  {
    "word": "pique",
    "definition": "화나게하다, 자극하다 cf] piquant "
  },
  {
    "word": "pitfall",
    "definition": "함정, 숨겨진 위험"
  },
  {
    "word": "pithy",
    "definition": "간결한"
  },
  {
    "word": "pittance",
    "definition": "아주 적은 용돈, 수당, 보상"
  },
  {
    "word": "placate",
    "definition": "달래다"
  },
  {
    "word": "placid",
    "definition": "평온한"
  },
  {
    "word": "plagiarism",
    "definition": "표절"
  },
  {
    "word": "plague",
    "definition": "괴롭히다"
  },
  {
    "word": "plaintive",
    "definition": "슬픈, 불쌍한, 애처로운"
  },
  {
    "word": "platitude ",
    "definition": "진부한 말; 진부함\n"
  },
  {
    "word": "platitudinous",
    "definition": "진부한"
  },
  {
    "word": "plaudit",
    "definition": "박수, 찬양, 갈채"
  },
  {
    "word": "plead",
    "definition": "간청, 탄원하다"
  },
  {
    "word": "plebeian ",
    "definition": "중산층의, 보통의, 저속한"
  },
  {
    "word": "plenitude",
    "definition": "풍성함"
  },
  {
    "word": "plethora",
    "definition": "초과, 과다"
  },
  {
    "word": "pliable ",
    "definition": "모양이 잘 휘는; 고분고분한"
  },
  {
    "word": "pliant",
    "definition": "유연한, 고분고분한"
  },
  {
    "word": "pluck",
    "definition": "용기"
  },
  {
    "word": "plumb",
    "definition": "면밀히 조사하다"
  },
  {
    "word": "plummet",
    "definition": "수직으로 떨어지다, 급락, 폭락하다 "
  },
  {
    "word": "plunder",
    "definition": "약탈하다, 훔치다"
  },
  {
    "word": "poignant",
    "definition": "통렬한, 마음에 사무치는, 날카로운"
  },
  {
    "word": "poised",
    "definition": "차분한, 침착한"
  },
  {
    "word": "polarity",
    "definition": "양극성, 극단 polarize [v] "
  },
  {
    "word": "polemical",
    "definition": "논쟁적인\npolemicize[v]"
  },
  {
    "word": "politic",
    "definition": "현명한, 분별력 있는"
  },
  {
    "word": "pompous",
    "definition": "(태도, 말) 오만한, 거만한, 과장된"
  },
  {
    "word": "ponder",
    "definition": "심사숙고하다"
  },
  {
    "word": "ponderous  ",
    "definition": "무거운, 육중한; 지루한"
  },
  {
    "word": "pontificate",
    "definition": "오만하고 독단적으로 말하다"
  },
  {
    "word": "porous",
    "definition": "다공성의, (기체, 액체) 쉽게 통과하는; 침투하기 쉬운"
  },
  {
    "word": "portentous",
    "definition": "심각한, 중요한"
  },
  {
    "word": "poseur ",
    "definition": "젠체하는 사람"
  },
  {
    "word": "posit",
    "definition": "가정하다, 상정하다"
  },
  {
    "word": "postulate",
    "definition": "가정하다; 당연한 것으로 여기다"
  },
  {
    "word": "potable",
    "definition": "마시기에 적당한\n"
  },
  {
    "word": "potentate",
    "definition": "권세가, 강대한 힘의 소유자"
  },
  {
    "word": "pragmatic",
    "definition": "실용적인"
  },
  {
    "word": "prate",
    "definition": "재잘재잘 지껄이다"
  },
  {
    "word": "precarious",
    "definition": "위태로운, 불확실한"
  },
  {
    "word": "precedent",
    "definition": "선례\nprecede [v]"
  },
  {
    "word": "precipitate",
    "definition": "재촉하다, 촉발하다  성급한 [adj]"
  },
  {
    "word": "precipitous",
    "definition": "급경사의; 성급한"
  },
  {
    "word": "preclude   ",
    "definition": "배제하다, 막다"
  },
  {
    "word": "preconception",
    "definition": "편견"
  },
  {
    "word": "precursor ",
    "definition": "선구자, 선행하는 것"
  },
  {
    "word": "predecessor",
    "definition": "전임자 "
  },
  {
    "word": "predetermined ",
    "definition": "미리 결정된"
  },
  {
    "word": "predominant",
    "definition": "우세한, 탁월한\n "
  },
  {
    "word": "preeminence",
    "definition": "가장 뛰어남, 탁월함"
  },
  {
    "word": "preempt",
    "definition": "선제적으로 막다; 선취하다, 선점하다  preemptive [adj]"
  },
  {
    "word": "preen   ",
    "definition": "치장하다, 자기만족을 드러내다"
  },
  {
    "word": "premeditate",
    "definition": "미리 계획, 생각하다\n"
  },
  {
    "word": "preoccupation",
    "definition": "몰두, 열중"
  },
  {
    "word": "preponderant",
    "definition": "우세한, 압도적인, 능가하는"
  },
  {
    "word": "prepossessed ",
    "definition": "매료된, 선입견에 사로잡힌"
  },
  {
    "word": "preposterous ",
    "definition": "비상식적인, 터무니없는"
  },
  {
    "word": "prerequisite",
    "definition": "필요조건"
  },
  {
    "word": "prerogative",
    "definition": "특권"
  },
  {
    "word": "prescience",
    "definition": "예지력; 통찰력"
  },
  {
    "word": "prescribe",
    "definition": "규정, 명령, 처방하다\n"
  },
  {
    "word": "preservative",
    "definition": "방부제"
  },
  {
    "word": "prestigious",
    "definition": "훌륭한, 일류의\n"
  },
  {
    "word": "presume",
    "definition": "추정하다"
  },
  {
    "word": "presumptuous",
    "definition": "건방진"
  },
  {
    "word": "pretentious ",
    "definition": "허세부리는, 과시하는"
  },
  {
    "word": "prevailing",
    "definition": "널리 퍼져있는, 유행하는"
  },
  {
    "word": "prevalent",
    "definition": "널리 퍼져있는"
  },
  {
    "word": "prevaricate",
    "definition": "얼버무리다, 둘러대다, 속이다"
  },
  {
    "word": "prime",
    "definition": "주요한; 탁월한, 최고의; 최초의"
  },
  {
    "word": "primeval",
    "definition": "원시시대의"
  },
  {
    "word": "primordial",
    "definition": "원시의, 태고의, 옛날의"
  },
  {
    "word": "principled",
    "definition": "윤리적인, 규율이 있는"
  },
  {
    "word": "pristine",
    "definition": "원래 그대로의, 오염되지 않은, 깨끗한"
  },
  {
    "word": "privilege",
    "definition": "특권"
  },
  {
    "word": "prize",
    "definition": "소중히 여기다 "
  },
  {
    "word": "probity",
    "definition": "정직, 청렴"
  },
  {
    "word": "proclivity",
    "definition": "성향, 경향"
  },
  {
    "word": "procrastinate ",
    "definition": "미루다, 지연하다, 늑장부리다"
  },
  {
    "word": "procurement",
    "definition": "획득 procure[v]"
  },
  {
    "word": "prodigal",
    "definition": "낭비하는\nprodigality[n]"
  },
  {
    "word": "prodigious",
    "definition": "거대한 "
  },
  {
    "word": "prodigy",
    "definition": "신동, 천재; 불가사의한 것, 경이로움"
  },
  {
    "word": "profane",
    "definition": "불경스러운, 세속적인; 거룩하지 않은 더러운"
  },
  {
    "word": "proficient",
    "definition": "능숙한, 유능한"
  },
  {
    "word": "profligate",
    "definition": "탕진하는, 낭비하는"
  },
  {
    "word": "profound",
    "definition": "심오한; (사람) 큰 지식과 통찰력이 있는\nprofundity [n]"
  },
  {
    "word": "profuse",
    "definition": "많은, 풍부한; 낭비하는"
  },
  {
    "word": "prognostication",
    "definition": "예언,  진단"
  },
  {
    "word": "prohibitive",
    "definition": "(가격) 지나치게 비싼; 금지하는, 제한하는"
  },
  {
    "word": "prolific ",
    "definition": "다산의; 비옥한; 다작의"
  },
  {
    "word": "prolix",
    "definition": "장황한, 지루하게 긴"
  },
  {
    "word": "prominence",
    "definition": "명성, 중요함"
  },
  {
    "word": "promulgate",
    "definition": "공표하다, 알리다 , 선포하다 "
  },
  {
    "word": "proofread",
    "definition": "교정하다"
  },
  {
    "word": "propagate",
    "definition": "번식/증식 시키다, 보급하다, 전파하다"
  },
  {
    "word": "propensity",
    "definition": "강한 기호, 경향"
  },
  {
    "word": "propitiatory",
    "definition": "달래는"
  },
  {
    "word": "propitious",
    "definition": "유리한"
  },
  {
    "word": "proponent",
    "definition": "지지자, 제안자"
  },
  {
    "word": "proportionate ",
    "definition": "비례하는, 균형에 맞는"
  },
  {
    "word": "propound",
    "definition": "제안하다 "
  },
  {
    "word": "propriety",
    "definition": "행동의 적절함, 예의바름     "
  },
  {
    "word": "prosaic",
    "definition": "진부한; 산문형식의"
  },
  {
    "word": "proscribe",
    "definition": "법으로 금지하다"
  },
  {
    "word": "prosecution",
    "definition": "기소"
  },
  {
    "word": "proselytize",
    "definition": "개종시키다; 개종하다"
  },
  {
    "word": "prostrate    ",
    "definition": "1. 엎드린, 굴복한, 기진맥진한 2. 굴복시키다, 쇠약하게 하다; "
  },
  {
    "word": "protagonist ",
    "definition": "주연, 주인공"
  },
  {
    "word": "protract           ",
    "definition": "(기간) 연장하다; (몸) (앞으로) 쭉 뻗다"
  },
  {
    "word": "protuberance",
    "definition": "돌출, 돌기, 융기\n"
  },
  {
    "word": "provident",
    "definition": "(미래를 대비하여) 검소한, 절약하는 "
  },
  {
    "word": "providential",
    "definition": "시기적절한, 운이좋은; 섭리의, 신의 뜻에 의한"
  },
  {
    "word": "provincial",
    "definition": "지방의, 촌스러운, 세련되지 못한; 시야가 좁은, 편협한"
  },
  {
    "word": "provision",
    "definition": "(법) 조항; (장래) 준비"
  },
  {
    "word": "provoke",
    "definition": "자극하다; 화나게 하다"
  },
  {
    "word": "prowess",
    "definition": "용기, 기술 "
  },
  {
    "word": "proximate",
    "definition": "(관계, 원인, 장소, 시간) 가장 가까운; 근사값의"
  },
  {
    "word": "prudent",
    "definition": "현명한, 신중한"
  },
  {
    "word": "prude",
    "definition": "내숭떠는 사람 prudish [adj] 얌전한, 지나치게 고상한척 하는"
  },
  {
    "word": "pry",
    "definition": "사적인 문제를 지나치게 캐묻다"
  },
  {
    "word": "pseudonym",
    "definition": "(작가) 필명"
  },
  {
    "word": "puckish",
    "definition": "짓궂은, 장난기 있는"
  },
  {
    "word": "puerile",
    "definition": "유치한"
  },
  {
    "word": "pugnacious",
    "definition": "호전적인"
  },
  {
    "word": "pulchritude",
    "definition": "아름다움"
  },
  {
    "word": "pulverize     ",
    "definition": "분쇄하다"
  },
  {
    "word": "punctilious",
    "definition": "세심한, 꼼꼼한"
  },
  {
    "word": "pundit",
    "definition": "권위자, (미디어에 출연해서 의견을 말하는) 전문가"
  },
  {
    "word": "punitive",
    "definition": "벌을 가하는 "
  },
  {
    "word": "puny",
    "definition": "작고 약한"
  },
  {
    "word": "purported ",
    "definition": "~라고 알려진, 주장되는"
  },
  {
    "word": "pusillanimous ",
    "definition": "소심한, 심약한"
  },
  {
    "word": "quack",
    "definition": "돌팔이 의사, 사기꾼"
  },
  {
    "word": "quagmire",
    "definition": "진흙탕; 어렵고 복잡한 상황, 궁지"
  },
  {
    "word": "quaint",
    "definition": "(특이하거나 옛스런 정취로 인해) 흥미로운; 이상한 특이한 "
  },
  {
    "word": "qualified",
    "definition": "자격있는; 제한적인, 조건부의 "
  },
  {
    "word": "qualify",
    "definition": "(예외를 두어서) 제한하다, 한정하다"
  },
  {
    "word": "qualm",
    "definition": "불안, 걱정; 양심의 가책"
  },
  {
    "word": "quandary",
    "definition": "난처함, 궁지"
  },
  {
    "word": "quash",
    "definition": "억제하다, 억누르다"
  },
  {
    "word": "queasy",
    "definition": "멀미하는; 멀미나게 하는; 걱정, 염려하는, 긴장한 "
  },
  {
    "word": "quell",
    "definition": "진압하다"
  },
  {
    "word": "quench",
    "definition": "불을 끄다; 억제하다; 갈증을 해소하다, 만족시키다"
  },
  {
    "word": "querulous",
    "definition": "불평이 많은, 징징거리는 "
  },
  {
    "word": "query",
    "definition": "질문하다"
  },
  {
    "word": "quibble",
    "definition": "사소한 반대, 트집잡기; 사소한 문제에 트집잡다, 논의의 주제를 회피하다"
  },
  {
    "word": "quiescence",
    "definition": "무활동, 정지, 고요\nquiescent [adj]"
  },
  {
    "word": "quintessential ",
    "definition": "필수적인, 전형의 "
  },
  {
    "word": "quirky",
    "definition": "별난, 특이한"
  },
  {
    "word": "quixotic",
    "definition": "지나치게 이상적인; 비현실적인"
  },
  {
    "word": "quotidian",
    "definition": "일상적인, 매일매일의, 평범한"
  },
  {
    "word": "rabid",
    "definition": "과격한, 광신적인, 맹렬한"
  },
  {
    "word": "radical",
    "definition": "1. 근본적인 2. 급진적인"
  },
  {
    "word": "ragged",
    "definition": "(옷이) 낡고 헤진; (표면이) 울퉁불퉁한"
  },
  {
    "word": "rail  ",
    "definition": "몹시 비난하다"
  },
  {
    "word": "rally",
    "definition": "1. 세를 규합하다; 집회로 모이다 2 (사기) 진작시키다"
  },
  {
    "word": "rambunctious",
    "definition": "떠들석한"
  },
  {
    "word": "ramification",
    "definition": "(사건의) 결과"
  },
  {
    "word": "rampant",
    "definition": "(나쁜 것) 만연하는, 횡행하는; (사람, 행동) 사나운, 미쳐날뛰는"
  },
  {
    "word": "ramshackle",
    "definition": "(집 등) 쓰러져가는, 상태가 매우 안좋은"
  },
  {
    "word": "rancid",
    "definition": "(부패로) 악취나는\n"
  },
  {
    "word": "rancor",
    "definition": "원한, 악의\nrancorous [adj]"
  },
  {
    "word": "rankle",
    "definition": "화나게 하다"
  },
  {
    "word": "ransack",
    "definition": "철저히 수색하다, 조사하다"
  },
  {
    "word": "rant",
    "definition": "호언장담, 과장된 말; 고함치다, 고래고래 소리치다\n"
  },
  {
    "word": "rapport",
    "definition": "(관계) 조화로움, 친근함"
  },
  {
    "word": "rash",
    "definition": "무모한, 서두르는, 성급한"
  },
  {
    "word": "rationale",
    "definition": "이론적 근거, 이성적 계산, 이유 rationalize [v]"
  },
  {
    "word": "rapacious",
    "definition": "탐욕스런, 약탈하는"
  },
  {
    "word": "raucous",
    "definition": "(소리) 거슬리는, 불쾌한"
  },
  {
    "word": "ravage",
    "definition": "휩쓸어 파괴하다; 파괴행위, 파괴적 영향\n"
  },
  {
    "word": "rave",
    "definition": "횡설수설 말하다; 극찬하다\nraving = wild, irrational, or incoherent talk"
  },
  {
    "word": "reactionary",
    "definition": "개혁에 반대하는, 보수적인"
  },
  {
    "word": "reassure",
    "definition": "안심시키다"
  },
  {
    "word": "rebel   ",
    "definition": "반항하다, 반란을 일으키다"
  },
  {
    "word": "rebuff",
    "definition": "퉁명스럽게 거부하다, 거절하다"
  },
  {
    "word": "rebuke",
    "definition": " 심하게 꾸짖다"
  },
  {
    "word": "rebut ",
    "definition": "반박, 논박하다"
  },
  {
    "word": "recalcitrant",
    "definition": "권위에 저항하는, 다루기힘든"
  },
  {
    "word": "recant",
    "definition": "(주장) 철회하다; (믿음) 부정하다"
  },
  {
    "word": "recapitulate",
    "definition": "요약하다"
  },
  {
    "word": "recast",
    "definition": "고쳐만들다, 쓰다, 변경하다 "
  },
  {
    "word": "recede",
    "definition": "물러나다; 감소하다 "
  },
  {
    "word": "recess",
    "definition": "쉬는시간; 휴식기간; 활동의 임시적 중단"
  },
  {
    "word": "recession",
    "definition": "경기침체기, 쇠퇴"
  },
  {
    "word": "recidivism  ",
    "definition": "상습적 범행,  좋지 않았던 것을 되풀이함"
  },
  {
    "word": "reciprocity",
    "definition": "호혜주의"
  },
  {
    "word": "reckless",
    "definition": "무모한, 무분별한"
  },
  {
    "word": "recluse",
    "definition": "은둔자"
  },
  {
    "word": "reconcile",
    "definition": "화해시키다; 조화롭게 하다"
  },
  {
    "word": "recondite",
    "definition": "난해한"
  },
  {
    "word": "reconnoiter ",
    "definition": "정찰활동을 하다; 정보를 얻기 위하여 사전조사를 하다"
  },
  {
    "word": "recourse",
    "definition": "의지, 의뢰"
  },
  {
    "word": "rectitude",
    "definition": "(행동) 정의로움, 옳음, 정직"
  },
  {
    "word": "recuperative",
    "definition": "(건강) 회복시켜주는"
  },
  {
    "word": "recurrent",
    "definition": "재현되는"
  },
  {
    "word": "redeem",
    "definition": "되찾다"
  },
  {
    "word": "redolent",
    "definition": "향기로운"
  },
  {
    "word": "redoubtable",
    "definition": "(적) 두렵고 존경스러운; 가공할만한"
  },
  {
    "word": "redundant ",
    "definition": "잉여의, 생략한, (말) 장황한"
  },
  {
    "word": "refractory",
    "definition": "고집불통의, 다루기힘든"
  },
  {
    "word": "refrain",
    "definition": "삼가하다 "
  },
  {
    "word": "refulgent",
    "definition": "밝게 빛나는, 환희 빛나는"
  },
  {
    "word": "refute",
    "definition": "논박하다"
  },
  {
    "word": "regimentation",
    "definition": "조직화,통제"
  },
  {
    "word": "regression",
    "definition": "1. 회귀, 복귀, 2. 후퇴"
  },
  {
    "word": "rein ",
    "definition": "억제하다, 멈추다"
  },
  {
    "word": "reinforce",
    "definition": "강화시키다"
  },
  {
    "word": "reiterate",
    "definition": "되풀이하다, 반복하다"
  },
  {
    "word": "rejuvenate",
    "definition": "다시 젊게 하다"
  },
  {
    "word": "rekindle",
    "definition": "다시 불붙이다, 다시 불러 일으키다"
  },
  {
    "word": "relegate",
    "definition": "강등시키다 [relegate A to B]"
  },
  {
    "word": "relentless",
    "definition": "엄격한, 가혹한, 무자비한"
  },
  {
    "word": "relinquish",
    "definition": "포기하다, 양보하다, 양도하다"
  },
  {
    "word": "reluctant ",
    "definition": "내키지 않는"
  },
  {
    "word": "remedial ",
    "definition": "치료, 교정의  remedy [n]"
  },
  {
    "word": "reminisce",
    "definition": "회상하다"
  },
  {
    "word": "remiss",
    "definition": "태만한, 성의없는, 소홀한"
  },
  {
    "word": "remold",
    "definition": "(모양, 구조, 특징) 바꾸다"
  },
  {
    "word": "remonstrate",
    "definition": "항의하다, 이의를 제출하다"
  },
  {
    "word": "remorse",
    "definition": "양심의 가책, 후회\n\nremorseful [adj]"
  },
  {
    "word": "remunerate",
    "definition": "보답하다, 보수를 지불하다"
  },
  {
    "word": "rend",
    "definition": "(잡아) 찢다"
  },
  {
    "word": "renegade",
    "definition": "변절자; 반역자"
  },
  {
    "word": "renege",
    "definition": "약속을 이행하지 못하다; (약속,계약) 폐기시키다"
  },
  {
    "word": "renounce",
    "definition": "공식적으로 포기하다, 철회하다, 거부하다  renoucement [n]"
  },
  {
    "word": "reparation ",
    "definition": "배상, 보수, 보상"
  },
  {
    "word": "repeal",
    "definition": "취소, 철회하다 "
  },
  {
    "word": "repel",
    "definition": "물리치다; 불쾌감을 주다"
  },
  {
    "word": "repellent",
    "definition": "불쾌감을 주는, 물따위가 스며들지 않게하는"
  },
  {
    "word": "replenish",
    "definition": "다시 채우다\n"
  },
  {
    "word": "replete",
    "definition": "충분한, 가득한"
  },
  {
    "word": "replicate",
    "definition": "복제, 복사하다"
  },
  {
    "word": "repose ",
    "definition": "휴식"
  },
  {
    "word": "reprehensible ",
    "definition": "비난받아 마땅한"
  },
  {
    "word": "repress",
    "definition": "억압하다, 억제하다"
  },
  {
    "word": "reprimand ",
    "definition": "비난하다, 질책하다"
  },
  {
    "word": "reprisal ",
    "definition": "보복적행동"
  },
  {
    "word": "reproachable",
    "definition": "비난받을 만한  repoach [v]"
  },
  {
    "word": "reproof",
    "definition": "질책, 비난"
  },
  {
    "word": "reprobate ",
    "definition": "타락한 자, 별질자 "
  },
  {
    "word": "repudiate",
    "definition": "부인하다, 거절하다\n"
  },
  {
    "word": "repugnance",
    "definition": "혐오함\nrepugnant [adj]"
  },
  {
    "word": "repulsive",
    "definition": "불쾌감을 주는, 밀쳐낼"
  },
  {
    "word": "repute",
    "definition": "~라고 믿다, 간주하다; 평판"
  },
  {
    "word": "requisite",
    "definition": "필요한, 필수적인"
  },
  {
    "word": "rescind",
    "definition": "폐지, 폐기, 철회하다"
  },
  {
    "word": "rescission",
    "definition": "철회, 취소, 폐지"
  },
  {
    "word": "resentful",
    "definition": "분개한, 화를 잘 내는"
  },
  {
    "word": "reserve",
    "definition": "보유; 제한, 유보적 태도, 의심"
  },
  {
    "word": "reside ",
    "definition": "거주하다; 존재하다, 있다 residency [n]"
  },
  {
    "word": "resignation",
    "definition": "사퇴; 체념, 포기, 단념\n[v] resign "
  },
  {
    "word": "resilience",
    "definition": "탄력, 회복력"
  },
  {
    "word": "resolute",
    "definition": "마음이 확고한"
  },
  {
    "word": "resolve",
    "definition": "해결하다, 결심하다"
  },
  {
    "word": "resonant ",
    "definition": "낭랑하게 울리는, 공명하는"
  },
  {
    "word": "resort to",
    "definition": "기대다, 이용하다\n"
  },
  {
    "word": "respite",
    "definition": "짧은 휴식"
  },
  {
    "word": "resplendent",
    "definition": "화려한, 눈부신"
  },
  {
    "word": "restitution",
    "definition": "반환, 상환"
  },
  {
    "word": "restive",
    "definition": "불안, 초조한"
  },
  {
    "word": "restrain",
    "definition": "제한하다, 억제하다"
  },
  {
    "word": "resume",
    "definition": "재개하다 "
  },
  {
    "word": "resurgence",
    "definition": "소생, 부활, 되살아남  resurge [v]"
  },
  {
    "word": "resurrect",
    "definition": "소생하다"
  },
  {
    "word": "resuscitate",
    "definition": "소생하다"
  },
  {
    "word": "retain",
    "definition": "보유하다, 유지하다\n[n] retention "
  },
  {
    "word": "retaliate",
    "definition": "(같은 수단으로) 보복하다, 복수하다, 앙갚음하다\n"
  },
  {
    "word": "reticent",
    "definition": "과묵한"
  },
  {
    "word": "retort",
    "definition": "(말) (빠르고 재치있게, 신랄하게) 되받아치다, 응수하다"
  },
  {
    "word": "retract",
    "definition": "취소하다, 철회하다"
  },
  {
    "word": "retreat",
    "definition": "(군대) 후퇴하다, 철수하다; 철회하다"
  },
  {
    "word": "retrench",
    "definition": "경비따위를 줄이다"
  },
  {
    "word": "retrieve",
    "definition": "되찾다, 회수하다 \n"
  },
  {
    "word": "revamp ",
    "definition": "변경하다 "
  },
  {
    "word": "revel",
    "definition": "매우 기뻐하다, 즐거워하다, 마시고 흥청거리다"
  },
  {
    "word": "reverberate",
    "definition": "반향하다, 울려퍼지다"
  },
  {
    "word": "revere",
    "definition": "깊이 존경하다"
  },
  {
    "word": "reverence",
    "definition": "공경, 존경"
  },
  {
    "word": "revert",
    "definition": "되돌아 가다"
  },
  {
    "word": "revile",
    "definition": "비난하다"
  },
  {
    "word": "revisionist",
    "definition": "수정주의자\n"
  },
  {
    "word": "revulsion",
    "definition": "역겨움, 혐오감\n"
  },
  {
    "word": "ribald  ",
    "definition": "무례한, 음담패설을 해대는"
  },
  {
    "word": "rickety",
    "definition": "(구조물) 곧 무너질 것 같은"
  },
  {
    "word": "riddle",
    "definition": "수수께끼, 난제\n"
  },
  {
    "word": "rife",
    "definition": "가득한, 퍼져있는, 유행하는"
  },
  {
    "word": "rift",
    "definition": "금, 균열"
  },
  {
    "word": "righteous",
    "definition": "도덕적인, 바른, 정의로운"
  },
  {
    "word": "rigid",
    "definition": "휘지 않는, 융통성 없는"
  },
  {
    "word": "rigor",
    "definition": "정확함, 엄격함\n"
  },
  {
    "word": "rile",
    "definition": "화나게 하다\n"
  },
  {
    "word": "rip",
    "definition": "거칠게 찢다, 갈기갈기 찢다"
  },
  {
    "word": "ripen",
    "definition": "익다, 숙성하다, 익히다, 숙성시키다\n"
  },
  {
    "word": "rite",
    "definition": "의식, 절차"
  },
  {
    "word": "rive",
    "definition": "찢다, 찢어발기다"
  },
  {
    "word": "riveting",
    "definition": "매력적인"
  },
  {
    "word": "robust ",
    "definition": "건강한, 건장한\n"
  },
  {
    "word": "rococo",
    "definition": "매우 화려한, 꾸밈이 많은"
  },
  {
    "word": "roil",
    "definition": "화나게 하다, 초조하게 만들다 "
  },
  {
    "word": "rotund",
    "definition": "[살쪄서]둥근모양의"
  },
  {
    "word": "rowdy",
    "definition": "소란스러운"
  },
  {
    "word": "rudimentary",
    "definition": "미발달의, 미성숙의; 기본적인"
  },
  {
    "word": "rue",
    "definition": "뉘우치다, 후회하다, 유감으로 여기다  rueful [adj]"
  },
  {
    "word": "ruminate",
    "definition": "반추해보다, 깊이 생각해 보다"
  },
  {
    "word": "ruse",
    "definition": "계략, 책략, 음모\n"
  },
  {
    "word": "rustic ",
    "definition": "전원적인, 시골의"
  },
  {
    "word": "sabotage",
    "definition": "고의적으로 방해하다, 파괴하다"
  },
  {
    "word": "saccharine ",
    "definition": "맛이 단, 지나치게 감상적인"
  },
  {
    "word": "sacrilegious ",
    "definition": "신성을 더럽히는"
  },
  {
    "word": "sacrosanct ",
    "definition": "신성불가침의"
  },
  {
    "word": "saga",
    "definition": "무용담, 영웅이야기"
  },
  {
    "word": "sagacious ",
    "definition": "현명한, 기민한"
  },
  {
    "word": "sage",
    "definition": "현인, 현자"
  },
  {
    "word": "salacious ",
    "definition": "외설스런 "
  },
  {
    "word": "salient",
    "definition": "돌출한, 눈에 띄는, 유명한"
  },
  {
    "word": "saline",
    "definition": "염분을 함유한; 짠"
  },
  {
    "word": "sally",
    "definition": "반격, 돌격 (하다)"
  },
  {
    "word": "salubrious",
    "definition": "건강에 좋은, 유익한; 건강한"
  },
  {
    "word": "salutary",
    "definition": "유익한"
  },
  {
    "word": "salvage",
    "definition": "(난파선 등) 구조하다, 해난구조하다"
  },
  {
    "word": "salvation",
    "definition": "(죄로부터) 구원, (손상을) 구제"
  },
  {
    "word": "sanction",
    "definition": "허가하다, 승인하다"
  },
  {
    "word": "sanctimonious ",
    "definition": "신실한 체 하는 "
  },
  {
    "word": "sanctuary",
    "definition": "신성보호구역, 피난처"
  },
  {
    "word": "sanctum",
    "definition": "신성한 장소, 성소; (간섭이 없는)"
  },
  {
    "word": "sangfroid    ",
    "definition": "침착, 냉정"
  },
  {
    "word": "sanguine",
    "definition": "낙관적인, 쾌활한"
  },
  {
    "word": "sap",
    "definition": "쇠약하게 만들다"
  },
  {
    "word": "sapient",
    "definition": "슬기로운, 지혜로운"
  },
  {
    "word": "sarcasm",
    "definition": "비꼼, 빈정거림, 풍자 "
  },
  {
    "word": "sartorial",
    "definition": "재단사의, 의복의"
  },
  {
    "word": "sate",
    "definition": "충분히 만족시키다"
  },
  {
    "word": "satiate",
    "definition": "충분히 만족시키다, 물리게 하다"
  },
  {
    "word": "satire",
    "definition": "풍자"
  },
  {
    "word": "saturate",
    "definition": "흠뻑적시다"
  },
  {
    "word": "saturnine",
    "definition": "침울한, 우울한"
  },
  {
    "word": "savant ",
    "definition": "학식이 높은 사람 "
  },
  {
    "word": "savor",
    "definition": "맛보다, 즐기다 "
  },
  {
    "word": "savory",
    "definition": "맛좋은"
  },
  {
    "word": "scant",
    "definition": "적은, 불충분한; (공급, 수량) 줄이다\n"
  },
  {
    "word": "scathing",
    "definition": "상처내는, 신랄한"
  },
  {
    "word": "sceptic ",
    "definition": "회의주의자 \n"
  },
  {
    "word": "scheme",
    "definition": "음모, 모의; 음모를 꾸미다\n[n] plot \n[adj] schematic "
  },
  {
    "word": "schism",
    "definition": "분열, 분파"
  },
  {
    "word": "scintillate",
    "definition": "불꽃이 너울거리다, 기지가 번뜩이다 "
  },
  {
    "word": "scission",
    "definition": "절단, 분리, 분열"
  },
  {
    "word": "scoff",
    "definition": "조롱하다"
  },
  {
    "word": "scour",
    "definition": "(솔과 물로) 북북 문질러 닦; 샅샅이 뒤지다"
  },
  {
    "word": "scrimp     ",
    "definition": "매우아끼다, 인색하게 굴다"
  },
  {
    "word": "scrupulous",
    "definition": "양심적인; 세심한, 꼼꼼한, 면밀\nscruple n. 양심, 양심의가책"
  },
  {
    "word": "scrutinize",
    "definition": "면밀히 살피다 "
  },
  {
    "word": "scurrilous ",
    "definition": "(입) 상스런, 저속한, 욕하는"
  },
  {
    "word": "seamy",
    "definition": "도덕적으로 낮은, 천한"
  },
  {
    "word": "seasoned",
    "definition": "경험있는, 능숙한"
  },
  {
    "word": "secrete ",
    "definition": "분비하다; 숨기다, 감추다"
  },
  {
    "word": "secretive",
    "definition": "비밀의, 숨기려하는"
  },
  {
    "word": "sectarian",
    "definition": "파벌을 만드는, 한쪽에 치우친sectarianism [n]"
  },
  {
    "word": "secular",
    "definition": "세속적인 "
  },
  {
    "word": "sedentary",
    "definition": "정주하는, 주로 앉아 있는"
  },
  {
    "word": "sedition ",
    "definition": "반역, 폭동"
  },
  {
    "word": "sedulous",
    "definition": "근면성실한, 주의깊고 부지런한"
  },
  {
    "word": "seemly",
    "definition": "예절을 지키는, (행동) 적절한"
  },
  {
    "word": "seethe ",
    "definition": "(마음속이) 분노로 부글부글 끓다; 분노로 끓어오르는 상태"
  },
  {
    "word": "self-abasement ",
    "definition": "자기비하"
  },
  {
    "word": "self-effacing ",
    "definition": "삼가는, 겸손한, 과시하지 않는"
  },
  {
    "word": "semantics",
    "definition": "의미론"
  },
  {
    "word": "semblance ",
    "definition": "유사, 비슷한 것"
  },
  {
    "word": "sentient ",
    "definition": "감각이 있는, 느낄 수 있는"
  },
  {
    "word": "sequence",
    "definition": "순서, 연속"
  },
  {
    "word": "sequent",
    "definition": "추후의, 나중의"
  },
  {
    "word": "sequential",
    "definition": "순차적인"
  },
  {
    "word": "sequester",
    "definition": "고립시키다"
  },
  {
    "word": "seraphic ",
    "definition": "천사의, 천사같은"
  },
  {
    "word": "serendipity",
    "definition": "운수 좋은 뜻밖의 발견(물)"
  },
  {
    "word": "serene",
    "definition": "고요한, 평온한"
  },
  {
    "word": "serration",
    "definition": "톱니모양"
  },
  {
    "word": "serried",
    "definition": "(사람, 물건) 꽉 찬, 빽빽한"
  },
  {
    "word": "servitude",
    "definition": "노예상태"
  },
  {
    "word": "shackle",
    "definition": "족쇄를 채우다\n"
  },
  {
    "word": "shadowy",
    "definition": "그림자 드리워진, 희미한, 애매한, illusory"
  },
  {
    "word": "sham ",
    "definition": "가짜의, 모조의; 모조품, 가짜"
  },
  {
    "word": "shard",
    "definition": "(도자기, 유리, 바위) 파편조각"
  },
  {
    "word": "sheer",
    "definition": "순전한; (천) 비치는\n"
  },
  {
    "word": "shifty",
    "definition": "속이는, 기교있는"
  },
  {
    "word": "shiftless",
    "definition": "의욕없는, 무기력한"
  },
  {
    "word": "shirk",
    "definition": "회피하다  shirker [n]"
  },
  {
    "word": "shoddy",
    "definition": "(물건 등) 질 떨어지는, 볼품없는"
  },
  {
    "word": "shore up",
    "definition": "지지하다 "
  },
  {
    "word": "shrewd",
    "definition": "현명, 명민한"
  },
  {
    "word": "shrug (off)",
    "definition": "(무관심, 의문, 불쾌의 표시) 양 어깨를 으쓱하다"
  },
  {
    "word": "shun",
    "definition": "기피하다"
  },
  {
    "word": "sinewy",
    "definition": "힘찬, 활발한, 건장한"
  },
  {
    "word": "singular",
    "definition": "별난, 특이한; 탁월한 "
  },
  {
    "word": "sinister",
    "definition": "불길한, 해를 입힐 것 같은; 사악한"
  },
  {
    "word": "skimp",
    "definition": "아까워하다, 인색하게 굴다"
  },
  {
    "word": "skirt",
    "definition": "가장자리에 있다; 회피하다"
  },
  {
    "word": "skittish",
    "definition": "잘 놀라는, 겁많은; 변덕스런, 활발한\n\n"
  },
  {
    "word": "skulduggery ",
    "definition": "야바위, 속임수 "
  },
  {
    "word": "skulk",
    "definition": "살금살금 움직이다"
  },
  {
    "word": "slacken",
    "definition": "느슨하게 만들다, 느슨해지다\n"
  },
  {
    "word": "slake",
    "definition": "갈증을 해소하다, 만족시키다"
  },
  {
    "word": "slant",
    "definition": "기울다, 기울어지게 하다; 왜곡하다, 편향된 시각을 보여주다"
  },
  {
    "word": "slight",
    "definition": "1. 사소한, 대수롭지 않은 2. 무시하다, 경시하다"
  },
  {
    "word": "slink",
    "definition": "조용히, 은밀하게 움직이다"
  },
  {
    "word": "slipshod",
    "definition": "칠칠치 못한, 대충하는; 단정하지 못한"
  },
  {
    "word": "slothful",
    "definition": "게으른"
  },
  {
    "word": "slouch ",
    "definition": "1. 구부정하게 서있다/걷다 2. 게으름뱅이, 무능한 사람"
  },
  {
    "word": "slovenly ",
    "definition": "지저분한, 단정치못한; 되는대로 하는, 날림의"
  },
  {
    "word": "sluggish",
    "definition": "둔한, 활력없는\nslow-moving or inactive"
  },
  {
    "word": "slur",
    "definition": "1. 비방하다 2.불분명하게 발음하다\n"
  },
  {
    "word": "sly",
    "definition": "교활한, 간사한, 음흉한"
  },
  {
    "word": "smash",
    "definition": "박살내다, 파괴하다; 격렬하게 충돌하다"
  },
  {
    "word": "smattering",
    "definition": "피상적인 지식; 적은 양"
  },
  {
    "word": "smirk",
    "definition": "(자기만족 또는 비웃듯이) 히죽웃다"
  },
  {
    "word": "smolder",
    "definition": "연기만 내면서 서서히 타다; (감정) 속에 맺히다; (눈 등이) (감정을) 나타내다"
  },
  {
    "word": "smother",
    "definition": "(덮어서) 질식시키다, 불을 끄다; (감정, 행동) 억제하다\n"
  },
  {
    "word": "smug",
    "definition": "자기만족하는, 우쭐한, 자부심 넘치는"
  },
  {
    "word": "smuggle",
    "definition": "밀수하다"
  },
  {
    "word": "snarl",
    "definition": "뒤엉키게 하다, 방해하다"
  },
  {
    "word": "sneer",
    "definition": "비웃다, 조롱하다, 조소하다"
  },
  {
    "word": "sobriety ",
    "definition": "냉정, 근엄, 진지함 "
  },
  {
    "word": "solicit",
    "definition": "요청하다, 구하다, 간청하다"
  },
  {
    "word": "solicitous",
    "definition": "1. 걱정, 염려하는 2. 열심인, 잘하려고하는 "
  },
  {
    "word": "solvent",
    "definition": "지급 능력이 있는; 녹이는, 용해력있는"
  },
  {
    "word": "soothing",
    "definition": "진정시키는"
  },
  {
    "word": "sop",
    "definition": "달래려고 준 것; 뇌물"
  },
  {
    "word": "sophistic ",
    "definition": "궤변의, 잘못된 이론의  sophism[n]"
  },
  {
    "word": "sophisticated",
    "definition": "세련된; 순진하지 않은, 세상물정에 익숙한; 정교한"
  },
  {
    "word": "sophomoric   ",
    "definition": "아는 척하는, 미성숙한"
  },
  {
    "word": "soporific",
    "definition": "수면성의, 잠이 오게하는; 졸리는"
  },
  {
    "word": "sordid",
    "definition": "추잡스런, 더러운, 비열한"
  },
  {
    "word": "sparse",
    "definition": "희박한, 드문드문 있는"
  },
  {
    "word": "spartan",
    "definition": "엄격한, 간소한, 사치부리지 않는"
  },
  {
    "word": "spate",
    "definition": "많은 양"
  },
  {
    "word": "specious",
    "definition": "허울좋은, 겉만 번드르르한, 실제로는 잘못된"
  },
  {
    "word": "speculate",
    "definition": "추측하다, 생각하다, 모험걸다, 투기하다"
  },
  {
    "word": "speculative ",
    "definition": "추측에 의한, 투기의"
  },
  {
    "word": "spent ",
    "definition": "(힘, 에너지) 소진된\n"
  },
  {
    "word": "spirited",
    "definition": "활기(용기, 열의)넘치는 \n"
  },
  {
    "word": "splenetic ",
    "definition": "울화, 악의의  spleen[n]"
  },
  {
    "word": "splurge",
    "definition": " (돈) 펑펑쓰다[n,v]"
  },
  {
    "word": "spontaneous",
    "definition": "사전계획없이 행해진; 충동/즉흥/자발적으로 움직이는\n"
  },
  {
    "word": "sporadic",
    "definition": "간헐적인"
  },
  {
    "word": "sprawl",
    "definition": "(도시·가로 등) 불규칙하게 넓어지다[뻗다]  "
  },
  {
    "word": "spur",
    "definition": "박차를 가하다, 독려하다, 자극하다"
  },
  {
    "word": "spurious",
    "definition": "가짜의, 허위의"
  },
  {
    "word": "spurn",
    "definition": "조롱하며 대하다"
  },
  {
    "word": "squabble",
    "definition": "사소한 말다툼"
  },
  {
    "word": "squalor ",
    "definition": "더러움, 누추함; 천함, 비열함"
  },
  {
    "word": "squander",
    "definition": "탕진하다, 낭비하다"
  },
  {
    "word": "squash",
    "definition": "진압하다, 억압하다"
  },
  {
    "word": "squeamish",
    "definition": "비위가 약한, 너무 까다로운"
  },
  {
    "word": "squelch",
    "definition": "억제하다"
  },
  {
    "word": "stagnant",
    "definition": "(물이) 흐르지 않고 고여있는"
  },
  {
    "word": "staid  ",
    "definition": "조용한, 진지한 "
  },
  {
    "word": "stain",
    "definition": "[n][v] 얼룩 [지다]"
  },
  {
    "word": "stalwart",
    "definition": "튼튼한 "
  },
  {
    "word": "stanch ",
    "definition": "멈추게하다 "
  },
  {
    "word": "standoffish",
    "definition": "쌀쌀맞은, 마음을 잘 열지 않는, 무뚝뚝한"
  },
  {
    "word": "stark ",
    "definition": "1. 순전한 sheer, utter  2. 상태가 심한harsh, grim, desolate   3. 단순한simple, plain"
  },
  {
    "word": "starry-eyed",
    "definition": "비현실적인, 이상적인\n"
  },
  {
    "word": "stasis",
    "definition": "정지상태, 균형상태"
  },
  {
    "word": "steep",
    "definition": "1. 가파른, 가격등이 비싼  2. 흠뻑 적시다 \n"
  },
  {
    "word": "stench",
    "definition": "악취"
  },
  {
    "word": "stentorian",
    "definition": "큰 소리의, 우렁찬"
  },
  {
    "word": "stickler",
    "definition": "끝까지 주장하는 사람; 당황스럽고 어려운 것"
  },
  {
    "word": "stifle",
    "definition": "제한하다, 억제하다"
  },
  {
    "word": "stigmatize",
    "definition": "낙인을 찍다; 비난하다; 오명을 씌우다"
  },
  {
    "word": "stilted",
    "definition": "(글, 말) 형식적인, 부자연스러운, 뽐내는"
  },
  {
    "word": "stipulate",
    "definition": "약정하다, 명문화하다"
  },
  {
    "word": "stodgy",
    "definition": "칙칙한, 재미없는; 매우 보수적인"
  },
  {
    "word": "stoic",
    "definition": "고통을 참고 내색하지 않는; 감정을 드러내지 않는"
  },
  {
    "word": "stolid",
    "definition": "둔감한, 무감한"
  },
  {
    "word": "stopgap",
    "definition": "임시변통\n"
  },
  {
    "word": "straightforward",
    "definition": "솔직한, 애매함없는\n"
  },
  {
    "word": "stratagem",
    "definition": "계략, 책략, 음모"
  },
  {
    "word": "stratify",
    "definition": "계층화하다, 층을 이루게하다"
  },
  {
    "word": "stray",
    "definition": "(있어야할 곳을 벗어나) 헤매다\n"
  },
  {
    "word": "streamline",
    "definition": "(일, 과정) 능률적으로 하다, 간소화하다"
  },
  {
    "word": "stricture ",
    "definition": "방해, 제한, 혹평"
  },
  {
    "word": "strident",
    "definition": "(소리가) 불쾌한, 귀에 거슬리는, 삐걱거리는"
  },
  {
    "word": "stringent",
    "definition": "엄격한, 엄한\nrigorous, tight"
  },
  {
    "word": "strive",
    "definition": "노력하다, 애쓰다"
  },
  {
    "word": "strut",
    "definition": "거만하게 걷다; 버팀목"
  },
  {
    "word": "stultify",
    "definition": "활력을 없애다, 바보로 만들다; 무효로하다"
  },
  {
    "word": "stun",
    "definition": "깜짝 놀라게 하다 \nstunning [n]\n"
  },
  {
    "word": "sturdy",
    "definition": "튼튼한"
  },
  {
    "word": "subjugate",
    "definition": "굴복시키다, 지배하다"
  },
  {
    "word": "sublime",
    "definition": "숭고한"
  },
  {
    "word": "submerge",
    "definition": "물에 푹 빠뜨리다, 잠수시키다"
  },
  {
    "word": "submissive",
    "definition": "순종하는, 순응하는"
  },
  {
    "word": "subordinate",
    "definition": "종속적인"
  },
  {
    "word": "subservient",
    "definition": "굴종하는, 비굴한; 부차적인, 부수적인"
  },
  {
    "word": "subside ",
    "definition": "내려앉다, 가라앉다 \n"
  },
  {
    "word": "subsidiary",
    "definition": "보조적인 "
  },
  {
    "word": "subsidize",
    "definition": "보조금을 지급하며 돕다"
  },
  {
    "word": "substantial",
    "definition": "상당히 크고 중요한; 대단한"
  },
  {
    "word": "substantiate",
    "definition": "입증하다 "
  },
  {
    "word": "substantive",
    "definition": "실질적인, 확고한"
  },
  {
    "word": "subsume",
    "definition": "(규칙, 원칙에) 포함시키다"
  },
  {
    "word": "subterfuge",
    "definition": "핑계, 구실, 속임수\n"
  },
  {
    "word": "subtle",
    "definition": "미묘한, 분석이나 설명이 힘든, 복잡한"
  },
  {
    "word": "subvert  ",
    "definition": "전복시키다  subversive [adj]반항의, 반란의"
  },
  {
    "word": "succinct",
    "definition": "간결한"
  },
  {
    "word": "succor",
    "definition": "돕다"
  },
  {
    "word": "succulent",
    "definition": "즙이 많은, 맛있는\n"
  },
  {
    "word": "succumb",
    "definition": "굴복, 항복하다; (병으로) 쓰러지다"
  },
  {
    "word": "sullen",
    "definition": "성질 더러운, 토라진, 뚱한"
  },
  {
    "word": "sully",
    "definition": "더럽히다"
  },
  {
    "word": "sumptuous",
    "definition": "호화로운, 사치스러운, 비싸보이는"
  },
  {
    "word": "sunder",
    "definition": "분리하다, 절단하다"
  },
  {
    "word": "supercilious",
    "definition": "거만한, 건방진"
  },
  {
    "word": "superficial ",
    "definition": "피상적인, 깊이가 없는"
  },
  {
    "word": "superfluous",
    "definition": "잉여의, 생략한"
  },
  {
    "word": "supersede",
    "definition": "대신하다, 대체하다"
  },
  {
    "word": "supplant",
    "definition": "(자리 등) 찬탈하다, 대신하다"
  },
  {
    "word": "supplement ",
    "definition": "보완하다, 보충하다 "
  },
  {
    "word": "suppleness  ",
    "definition": "유연함"
  },
  {
    "word": "supplicate",
    "definition": "간청, 탄원하다"
  },
  {
    "word": "supreme ",
    "definition": "최고의, 최상의  "
  },
  {
    "word": "surfeit",
    "definition": "과다"
  },
  {
    "word": "surge",
    "definition": "쇄도, 밀려옴"
  },
  {
    "word": "surly",
    "definition": "무뚝뚝한, 퉁명스러운"
  },
  {
    "word": "surmise",
    "definition": "추측하다, 짐작하다"
  },
  {
    "word": "surmount",
    "definition": "극복하다"
  },
  {
    "word": "surpass ",
    "definition": "능가하다"
  },
  {
    "word": "surrender ",
    "definition": "포기하다, 양보하다"
  },
  {
    "word": "surreptitious ",
    "definition": "은밀한"
  },
  {
    "word": "surrogate",
    "definition": "대리, 대행"
  },
  {
    "word": "susceptible",
    "definition": "~하기 쉬운"
  },
  {
    "word": "suspend ",
    "definition": "매달다; 막다; 연기시키다"
  },
  {
    "word": "sustain ",
    "definition": "유지하다, 지탱하다"
  },
  {
    "word": "sway",
    "definition": "흔들리다, 동요하다 "
  },
  {
    "word": "swerve",
    "definition": "(진로에서) 벗어나다, 이탈하다, 방향을 갑자기 바꾸다"
  },
  {
    "word": "sybarite",
    "definition": "쾌락주의자"
  },
  {
    "word": "sycophant",
    "definition": "아첨꾼"
  },
  {
    "word": "symbiosis",
    "definition": "공생"
  },
  {
    "word": "symmetry",
    "definition": "대칭"
  },
  {
    "word": "synchronous",
    "definition": "동시발생의"
  },
  {
    "word": "synopsis",
    "definition": "요약 "
  },
  {
    "word": "syntactic",
    "definition": "문장 구성의"
  },
  {
    "word": "synthesize",
    "definition": "합성하다, 종합하다"
  },
  {
    "word": "tacit",
    "definition": "암묵적인"
  },
  {
    "word": "taciturn",
    "definition": "과묵한"
  },
  {
    "word": "tacky",
    "definition": "1. 끈끈한  2. 촌스런, 조잡한"
  },
  {
    "word": "tact",
    "definition": "(사람, 상황을 잘 다루어 불쾌하지 않게 하는) 센스, 재치"
  },
  {
    "word": "tactile",
    "definition": "촉각의"
  },
  {
    "word": "tailor",
    "definition": "(필요, 목적에 맞게 ) 변경하다 "
  },
  {
    "word": "tainted  ",
    "definition": "더렵혀진"
  },
  {
    "word": "talisman",
    "definition": "부적"
  },
  {
    "word": "tangential",
    "definition": "주변의, 핵심에서 벗어난"
  },
  {
    "word": "tangible",
    "definition": "만질 수 있는, 현실적인, 구체적인"
  },
  {
    "word": "tantalize",
    "definition": "감질나게하다; 자극하다"
  },
  {
    "word": "tantamount ",
    "definition": "비슷한, 동등한"
  },
  {
    "word": "tantrum",
    "definition": "역정, 울화"
  },
  {
    "word": "tarnish",
    "definition": "광택을 잃다, 더럽히다"
  },
  {
    "word": "tatty",
    "definition": "낡고 초라한"
  },
  {
    "word": "taunt",
    "definition": "자극하다, 조롱하다"
  },
  {
    "word": "taut",
    "definition": "팽팽한, 긴장된"
  },
  {
    "word": "tawdry",
    "definition": "장식만 번지르르하고 싸구려의"
  },
  {
    "word": "tax",
    "definition": "비난하다 "
  },
  {
    "word": "tear",
    "definition": "찢다, 분리하다; 화급하게 움직이다, 돌진하다"
  },
  {
    "word": "tedious",
    "definition": "지루한, 재미없는"
  },
  {
    "word": "teem",
    "definition": "가득하다"
  },
  {
    "word": "teeter",
    "definition": "비틀거리다"
  },
  {
    "word": "telling ",
    "definition": "효과적인, 의미있는, 설득력있는"
  },
  {
    "word": "temerity",
    "definition": "지나친 자신감, 무모함, 뻔뻔함"
  },
  {
    "word": "temper",
    "definition": "누그러뜨리다, 완화시키다"
  },
  {
    "word": "temperance ",
    "definition": "자제, 절제"
  },
  {
    "word": "tempestuous",
    "definition": "폭풍우치는; 격정적인"
  },
  {
    "word": "temporize",
    "definition": "우물쭈물하다, 미적지근한 태도를 취하다, 결단을 내리지 않다; 대세에 따르다"
  },
  {
    "word": "tenable",
    "definition": "(반대, 공격) 방어할 수 있는, 견뎌내는"
  },
  {
    "word": "tenacious ",
    "definition": "고집스런, 끈질긴 "
  },
  {
    "word": "tendentious",
    "definition": "편향적인"
  },
  {
    "word": "tender",
    "definition": "제공하다, 입찰하다"
  },
  {
    "word": "tenet ",
    "definition": "교리, 주의, 원리"
  },
  {
    "word": "tentative",
    "definition": "임시적인, 주저하는"
  },
  {
    "word": "tenuous",
    "definition": "가느라단, 희박한, (논거)박약한"
  },
  {
    "word": "tepid",
    "definition": "미지근한, 열정이 거의 없는"
  },
  {
    "word": "terrestrial",
    "definition": "지구의, 세속적인, 땅의"
  },
  {
    "word": "terrify",
    "definition": "매우 두렵게 하다"
  },
  {
    "word": "terse",
    "definition": "간결한"
  },
  {
    "word": "testimonial",
    "definition": "추천서; 감사, 찬양의 표현"
  },
  {
    "word": "testy",
    "definition": "조급한, 쉽게 화내는"
  },
  {
    "word": "thorny",
    "definition": "가시가 많은; 어려운, 곤란한"
  },
  {
    "word": "thoroughgoing",
    "definition": "철저한"
  },
  {
    "word": "threadbare",
    "definition": "옷이 해어지고 낡은; 진부한"
  },
  {
    "word": "thrift",
    "definition": "검소함"
  },
  {
    "word": "thrive",
    "definition": "번성하다, 무성하게 자라다"
  },
  {
    "word": "throng",
    "definition": "군중, 인파; 많은 수로 모이다"
  },
  {
    "word": "thwart ",
    "definition": "막다, 좌절시키다"
  },
  {
    "word": "ticklish  ",
    "definition": "까다로운, 신경질적인; (문제) 다루기 힘든"
  },
  {
    "word": "tiff",
    "definition": "사소한 말다툼"
  },
  {
    "word": "tilt",
    "definition": "기울다; 기울게 하다"
  },
  {
    "word": "timeworn",
    "definition": "너무 오래입어서 해어진; 너무 많이 써먹은; 진부한"
  },
  {
    "word": "timid",
    "definition": "겁먹은, 소심한"
  },
  {
    "word": "timorous",
    "definition": "겁먹은, 소심한, 자신감이 없는"
  },
  {
    "word": "tinge",
    "definition": "색채를 더 하다"
  },
  {
    "word": "tirade",
    "definition": "장황한 비난, 길고 열정적인 연설, 일장연설 "
  },
  {
    "word": "tiresome",
    "definition": "지루하게 하는, 짜증나게 하는"
  },
  {
    "word": "toady",
    "definition": "아첨하는 사람"
  },
  {
    "word": "toil",
    "definition": "애쓰다, 열심히 일하다"
  },
  {
    "word": "tolerant ",
    "definition": "자신과 다른 의견이나 행동양식을 인정해 주는; 관대한, 인내해주는"
  },
  {
    "word": "tongue-tied",
    "definition": "(당황하여) 말문이 막힌"
  },
  {
    "word": "tonic",
    "definition": "힘을 주는, 원기왕성하게 하는"
  },
  {
    "word": "toothsome",
    "definition": "맛있는, 매력적인"
  },
  {
    "word": "topple",
    "definition": "앞으로 꼬꾸라지다, 비틀거리다, 몰락시키다\n"
  },
  {
    "word": "topsy-turvy",
    "definition": "거꾸로, 머리를 아래로; 뒤죽박죽"
  },
  {
    "word": "torment",
    "definition": "고문, 괴롭힘 "
  },
  {
    "word": "torpor",
    "definition": "무기력"
  },
  {
    "word": "torrid",
    "definition": "매우 더운; 열정적인"
  },
  {
    "word": "tortuous",
    "definition": "구불구불한; 에두르는, 솔직하지 못한"
  },
  {
    "word": "totalitarianism",
    "definition": "전체주의 "
  },
  {
    "word": "touchy",
    "definition": "지나치게 민감하게 구는"
  },
  {
    "word": "tout",
    "definition": "과대선전하다, 몹시 칭송하다"
  },
  {
    "word": "tractable",
    "definition": "다루기 쉬운, 유순한"
  },
  {
    "word": "trail    ",
    "definition": "(흔적을) 따라가다"
  },
  {
    "word": "trammel  ",
    "definition": "얽히게하다, 방해하다, 막다"
  },
  {
    "word": "trample",
    "definition": "짓밟다"
  },
  {
    "word": "tranquil",
    "definition": "고요한, 평온한\n\ntranquility [n] "
  },
  {
    "word": "transcend",
    "definition": "초월하다"
  },
  {
    "word": "transfer",
    "definition": "이전하다, 양도하다"
  },
  {
    "word": "transient",
    "definition": "일시적인"
  },
  {
    "word": "transition",
    "definition": "변화, 전이"
  },
  {
    "word": "transitory",
    "definition": "영원하지 않은, 일시적인"
  },
  {
    "word": "translucent",
    "definition": "반투명인; 명쾌한; 맑은, 투명한"
  },
  {
    "word": "transmute",
    "definition": "성질을 바꾸다, 변형하다\nto change or alter in form"
  },
  {
    "word": "transparent",
    "definition": "투명한; 이해하기 쉬운, 명쾌한; 속이지 않는, (운영, 경영) 투명한"
  },
  {
    "word": "transplant",
    "definition": "(기관 등) 이식하다, 옮겨심다"
  },
  {
    "word": "travail ",
    "definition": "힘들게 일하다, 수고하다"
  },
  {
    "word": "treacherous",
    "definition": "배신하는"
  },
  {
    "word": "treasure",
    "definition": "소중히 여기다, 간직하다"
  },
  {
    "word": "tremulous",
    "definition": "(손발) 떨리는; 겁많은, 소심한"
  },
  {
    "word": "trenchant ",
    "definition": "(표현이) 신랄한, 날카로운; 명쾌한, 효과적인"
  },
  {
    "word": "trepidation",
    "definition": "두려움"
  },
  {
    "word": "trespass",
    "definition": "(종교) 죄, 위반, 부정; 불법 침해, 불법 침입; 죄를 범하다; 침해하다, 침입하다\n"
  },
  {
    "word": "tribute",
    "definition": "감사, 존경, 찬양의 표시"
  },
  {
    "word": "trite",
    "definition": "진부한"
  },
  {
    "word": "trivial",
    "definition": "사소한"
  },
  {
    "word": "truculent",
    "definition": "싸우기 좋아하는, 호전적인, 공격적인"
  },
  {
    "word": "truism",
    "definition": "자명한 이치, 뻔히 아는 일"
  },
  {
    "word": "truncate",
    "definition": "길이를 줄이다"
  },
  {
    "word": "tumultuous",
    "definition": "요동하는"
  },
  {
    "word": "turbulent",
    "definition": "무질서하고 혼란스러운"
  },
  {
    "word": "turgid",
    "definition": "과장된, 허풍떠는; 부푼, 팽창한, 부어오른"
  },
  {
    "word": "turmoil",
    "definition": "소란, 혼란, 불안, 동요"
  },
  {
    "word": "tussle",
    "definition": "난투전, 싸움, 갈등"
  },
  {
    "word": "tyranny",
    "definition": "폭정, 전제정치"
  },
  {
    "word": "ubiquitous",
    "definition": "어디에나 있는"
  },
  {
    "word": "umbrage",
    "definition": "불쾌감, 화"
  },
  {
    "word": "unaccountable",
    "definition": "설명되지 않는"
  },
  {
    "word": "unaffected",
    "definition": "꾸밈, 가장없는, 허세부리지 않는"
  },
  {
    "word": "unanimous   ",
    "definition": "만장일치의"
  },
  {
    "word": "unassuming",
    "definition": "겸손한"
  },
  {
    "word": "unbridled",
    "definition": "구속되지 않은, 자유로운"
  },
  {
    "word": "uncanny ",
    "definition": "신비로운, 이상한"
  },
  {
    "word": "uncouth",
    "definition": "(사람, 행동) 무례한, 거친; (외모) 세련되지 못한, 꼴사나운"
  },
  {
    "word": "unctuous",
    "definition": "(사람이) 지나치게 아부하는; (물질이) 미끈미끈한"
  },
  {
    "word": "undaunted ",
    "definition": "풀죽지 않은, 대담한"
  },
  {
    "word": "undercut",
    "definition": "약화시키다"
  },
  {
    "word": "underestimate",
    "definition": "과소평가하다"
  },
  {
    "word": "underhanded ",
    "definition": "정당하지 못한, 은밀한, 불공정한"
  },
  {
    "word": "undermine",
    "definition": "약화시키다"
  },
  {
    "word": "underpinning ",
    "definition": "토대, 기초"
  },
  {
    "word": "underplay",
    "definition": "하찮게 보이게 하다 "
  },
  {
    "word": "underscore",
    "definition": "밑줄그어 강조하다"
  },
  {
    "word": "understated",
    "definition": "과소평가된"
  },
  {
    "word": "undeserved",
    "definition": "가치없는; 정당성없는, 부당한"
  },
  {
    "word": "undeterred",
    "definition": "풀죽지 않은, 단념하지 않은"
  },
  {
    "word": "unencumbered",
    "definition": "방해없는"
  },
  {
    "word": "unequivocal",
    "definition": " 명확한"
  },
  {
    "word": "unexceptionable",
    "definition": "반대의 여지가 없는"
  },
  {
    "word": "unfailing",
    "definition": "실패가 없는, 확실한"
  },
  {
    "word": "unfathomable",
    "definition": "이해하기 힘든; 측정하기 힘든"
  },
  {
    "word": "unfeigned",
    "definition": "꾸밈, 가장없는 "
  },
  {
    "word": "unfettered",
    "definition": "구속없는, 자유로운"
  },
  {
    "word": "unflappable",
    "definition": "침착한"
  },
  {
    "word": "ungainly",
    "definition": "(외모, 행동, 솜씨 등) 서툴고 어색한"
  },
  {
    "word": "ungovernable",
    "definition": "통제나 지배가 불가능한"
  },
  {
    "word": "unintelligible",
    "definition": "이해할 수 없는"
  },
  {
    "word": "unkempt",
    "definition": "(외모) 흐트러진, 단정하지 못한"
  },
  {
    "word": "unprecedented",
    "definition": "전례없는"
  },
  {
    "word": "unremitting",
    "definition": "끊임없는, 계속적인"
  },
  {
    "word": "unrepentant",
    "definition": "후회하지 않는, 회개하지 않는"
  },
  {
    "word": "unruly",
    "definition": "규칙을 따르지 않는, 제어하기 어려운"
  },
  {
    "word": "unscathed",
    "definition": "상처없는"
  },
  {
    "word": "unseemly",
    "definition": "(행동) 적절하지 않은"
  },
  {
    "word": "unstudied",
    "definition": "꾸밈이 없는, 자연스러운; 배우지 않고 터득한"
  },
  {
    "word": "untenable ",
    "definition": "(논리) 방어되지 않는"
  },
  {
    "word": "untold ",
    "definition": "셀 수 없을 만큼 많은, 무수한"
  },
  {
    "word": "untoward",
    "definition": "적당치않는, 곤란한, 불리한"
  },
  {
    "word": "unveil",
    "definition": "덮개를 걷다; 최초공개하다 "
  },
  {
    "word": "unwarranted",
    "definition": "정당성 없는, 생략한"
  },
  {
    "word": "unwieldy",
    "definition": "다루기 힘든; 성가신, 귀찮은"
  },
  {
    "word": "unwitting",
    "definition": "무의식적인; 고의가 아닌, 우연적인"
  },
  {
    "word": "unwonted ",
    "definition": "익숙하지 않은, 일반적이지 않은"
  },
  {
    "word": "upbraid",
    "definition": "(몹시) 나무라다, 비난하다"
  },
  {
    "word": "uphold",
    "definition": "수호하다, 지지하다 "
  },
  {
    "word": "urbane",
    "definition": "세련된, 예의바른"
  },
  {
    "word": "usurp",
    "definition": "권력을 불법적으로 찬탈하다"
  },
  {
    "word": "utter ",
    "definition": "1. 완전한, 절대적인 2. 말하다"
  },
  {
    "word": "vaccinate",
    "definition": "예방접종하다"
  },
  {
    "word": "vacillate",
    "definition": "주저하다, 망설이다 "
  },
  {
    "word": "vacuous",
    "definition": "생각이 없는, 어리석은"
  },
  {
    "word": "vagabond",
    "definition": "방랑하는; 방랑자"
  },
  {
    "word": "vagary",
    "definition": "변덕, 엉뚱한 짓"
  },
  {
    "word": "vagrant",
    "definition": "방랑자, 부랑자; 방랑하는; (생각) 변덕스런, 불안정한"
  },
  {
    "word": "vainglorious",
    "definition": "허영심 강한"
  },
  {
    "word": "valediction",
    "definition": "작별; 작별인사"
  },
  {
    "word": "valiant ",
    "definition": "용감한"
  },
  {
    "word": "validity ",
    "definition": "타당성"
  },
  {
    "word": "valorous",
    "definition": "용감한"
  },
  {
    "word": "vanquish ",
    "definition": "정복하다, 항복시키다"
  },
  {
    "word": "vapid",
    "definition": "맛없는, 재미없는"
  },
  {
    "word": "vaporous",
    "definition": "증기의, 가벼운, 신뢰할 수 없는, 자주 변하는\n"
  },
  {
    "word": "variegation ",
    "definition": "얼룩덜룩함"
  },
  {
    "word": "varnish",
    "definition": "니스칠하다, 광내다"
  },
  {
    "word": "vault",
    "definition": "금고"
  },
  {
    "word": "vaunt",
    "definition": "자랑하다, 허푸떨다"
  },
  {
    "word": "veer",
    "definition": "방향을 바꾸다; 의견이나 주제를 바꾸다\n"
  },
  {
    "word": "vehement ",
    "definition": "격렬한, 열정적인"
  },
  {
    "word": "veiled",
    "definition": "숨겨진, 감추어진"
  },
  {
    "word": "venal     ",
    "definition": "매수되기쉬운, 타락한"
  },
  {
    "word": "venerable",
    "definition": "공경받는"
  },
  {
    "word": "venerate",
    "definition": "깊이 존경하다, 우러르다"
  },
  {
    "word": "venial",
    "definition": "(죄, 잘못) 사소한, 용서받을만한"
  },
  {
    "word": "venture",
    "definition": "감히 ~하다"
  },
  {
    "word": "veracity",
    "definition": "진실함; 정확함"
  },
  {
    "word": "verbiage",
    "definition": "장황함"
  },
  {
    "word": "verbose",
    "definition": "장황한"
  },
  {
    "word": "verdant ",
    "definition": "초목이 무성한; 경험적은, 미숙한"
  },
  {
    "word": "verisimilitude",
    "definition": "있을법함, 사실같음"
  },
  {
    "word": "veritable",
    "definition": "참다운, 진짜의"
  },
  {
    "word": "vernacular",
    "definition": "사투리, 방언; 일상어"
  },
  {
    "word": "versatile",
    "definition": "다재다능한, 다용도의"
  },
  {
    "word": "versed",
    "definition": "경험이 있는, 잘 알고 있는"
  },
  {
    "word": "verve",
    "definition": "활력, 기백, 열정"
  },
  {
    "word": "veto",
    "definition": "거부권; 금지, 거부"
  },
  {
    "word": "vex",
    "definition": "짜증나게, 화나게하다"
  },
  {
    "word": "viable",
    "definition": "실행가능한; 생존할 수 있는"
  },
  {
    "word": "vicarious",
    "definition": "대리의, 대행의"
  },
  {
    "word": "vicissitude",
    "definition": "변천,  변하기 쉬움, 우여곡절"
  },
  {
    "word": "vigilant ",
    "definition": "경계하는, 방심하지 않는"
  },
  {
    "word": "vigorous",
    "definition": "원기왕성한, 활력적인"
  },
  {
    "word": "vile",
    "definition": "사악한, 부도덕한, 불쾌한"
  },
  {
    "word": "vilify",
    "definition": "비방, 중상하다"
  },
  {
    "word": "vim",
    "definition": "정력, 활기, 열정"
  },
  {
    "word": "vindicate",
    "definition": "옹호하다, 무죄방면하다"
  },
  {
    "word": "vindictive",
    "definition": "복수심이 불타는, 앙심을 품은"
  },
  {
    "word": "virtuoso",
    "definition": "명인, 대가"
  },
  {
    "word": "virulent",
    "definition": "맹독성의, 매우 해로운"
  },
  {
    "word": "visceral",
    "definition": "내장의; 이성보다는 감정에서 비롯되는; 거친, 노골적인\n"
  },
  {
    "word": "vital",
    "definition": "매우 중요한; 활기넘치는"
  },
  {
    "word": "vitiate ",
    "definition": "손상시키다, 망치다\n"
  },
  {
    "word": "vitriolic",
    "definition": "신랄한\nvitriol [n] 독설"
  },
  {
    "word": "vituperative",
    "definition": "욕설하는, 몹시 비난하는 "
  },
  {
    "word": "vivify",
    "definition": "생기를 주다, 기운차리게 하다\n"
  },
  {
    "word": "vociferous    ",
    "definition": "떠들썩한"
  },
  {
    "word": "void",
    "definition": "법적 효력이 없는"
  },
  {
    "word": "volitional",
    "definition": "의지, 결단력있는"
  },
  {
    "word": "voluble",
    "definition": "유창한, 말많은"
  },
  {
    "word": "voluminous",
    "definition": "부피가 큰, 방대한"
  },
  {
    "word": "voluptuous",
    "definition": "사치스런, 향락적인, 관능적인"
  },
  {
    "word": "voracious",
    "definition": "식욕이 왕성한, 게걸스러운"
  },
  {
    "word": "votary  ",
    "definition": "열렬한 추종자, 신봉자"
  },
  {
    "word": "vouch",
    "definition": "(신뢰성을) 보증하다, 보장하다"
  },
  {
    "word": "vouchsafe",
    "definition": "하사하다, (아랫사람에게)주다"
  },
  {
    "word": "vulgar",
    "definition": "저속한 (저속한 인간)"
  },
  {
    "word": "vulnerable",
    "definition": "연약한, 상처/공격받기 쉬운"
  },
  {
    "word": "waffle",
    "definition": "장황하게 말을 늘어놓다; 모호한 태도, 입장을 취하다\n"
  },
  {
    "word": "waggish",
    "definition": "웃기는, 익살스런\n"
  },
  {
    "word": "waive",
    "definition": "보류하다, 포기하다 "
  },
  {
    "word": "wan ",
    "definition": "병약한, 안색이 나쁜"
  },
  {
    "word": "wander",
    "definition": "(정처없이) 헤매다, 배회하다"
  },
  {
    "word": "wane",
    "definition": "작아지다, 약해지다, 달이 기울다"
  },
  {
    "word": "wanting",
    "definition": "부족한"
  },
  {
    "word": "warrant",
    "definition": "정당화하다"
  },
  {
    "word": "wary",
    "definition": "조심하는, 주의하는"
  },
  {
    "word": "watchful",
    "definition": "경계를 서는, 조심하는, 주의깊은"
  },
  {
    "word": "wax",
    "definition": "커지다, 강해지다"
  },
  {
    "word": "wayward",
    "definition": "통제할 수 없는, (행동이) 어디로 튈지 모르는 "
  },
  {
    "word": "whet",
    "definition": "날카롭게하다; 자극하다"
  },
  {
    "word": "whimsical ",
    "definition": "변덕스런\nwhimsy [n]"
  },
  {
    "word": "willowy",
    "definition": "(사람이) 키크고 날씬한, 우아한"
  },
  {
    "word": "wilt  ",
    "definition": "시들다"
  },
  {
    "word": "wince",
    "definition": "(고통, 두려움) 찡그리다, 움츠리다"
  },
  {
    "word": "winning",
    "definition": "매력적인"
  },
  {
    "word": "winsome",
    "definition": "매력적인"
  },
  {
    "word": "wiretap",
    "definition": "전화 도청하다 "
  },
  {
    "word": "wistful",
    "definition": "갈망하는, 탐내는 듯한; 생각에 잠긴, 슬픈"
  },
  {
    "word": "withdrawn",
    "definition": "사교적이지 않은"
  },
  {
    "word": "wither",
    "definition": "쭈글쭈글한, 쇠약한, 시든"
  },
  {
    "word": "withhold",
    "definition": "보류하다, 주지 않다; 억제하다"
  },
  {
    "word": "withstand",
    "definition": "저항하다, 버티다 "
  },
  {
    "word": "woe",
    "definition": "비통, 고뇌; (비통의 원인), 어려움"
  },
  {
    "word": "worldly",
    "definition": "세속적인, 경험많고 세상을 잘 아는"
  },
  {
    "word": "yielding",
    "definition": "유순한, 순종적인, 고분고분한\n"
  },
  {
    "word": "zeal",
    "definition": "강한 열정\nzealous [adj] zealotry [n]"
  },
  {
    "word": "zealot ",
    "definition": "광신도, 열광자\nzealotry [n]"
  },
  {
    "word": "zest\n[zest]",
    "definition": "기분좋은 맛, 자극, 흥미, 관심\n"
  },
  {
    "word": "zeitgeist ",
    "definition": "시대정신"
  }
];