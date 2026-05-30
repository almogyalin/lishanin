export interface WordEntry {
  cuneiform: string
  transliteration: string
  meaning: string
}

export const vocabularyByLesson: Record<string, WordEntry[]> = {
  'lesson-1': [
    { cuneiform: '𒀭', transliteration: 'ilum', meaning: 'god, heaven' },
    { cuneiform: '𒂗', transliteration: 'bēlum', meaning: 'lord' },
    { cuneiform: '𒆠', transliteration: 'erṣetum', meaning: 'earth, place' },
    { cuneiform: '𒇽', transliteration: 'awīlum', meaning: 'man' },
  ],
  'lesson-2': [
    { cuneiform: '𒈗', transliteration: 'šarrum', meaning: 'king' },
    { cuneiform: '𒂍', transliteration: 'bītum', meaning: 'house, temple' },
    { cuneiform: '𒀀', transliteration: 'mû', meaning: 'water' },
    { cuneiform: '𒃲', transliteration: 'rabûm', meaning: 'great' },
  ],
  'lesson-4': [
    { cuneiform: '𒈗𒊒𒌝', transliteration: 'šarrum', meaning: 'king' },
    { cuneiform: '𒀭𒈝', transliteration: 'ilum', meaning: 'god' },
    { cuneiform: '𒂍𒌈', transliteration: 'bītum', meaning: 'house' },
    { cuneiform: '𒇽𒌨', transliteration: 'awīlum', meaning: 'man' },
  ],
  'lesson-5': [
    { cuneiform: '𒈥𒊒𒌝', transliteration: 'mārum', meaning: 'son' },
    { cuneiform: '𒈠𒌈', transliteration: 'mātum', meaning: 'land, country' },
    { cuneiform: '𒌷', transliteration: 'ālum', meaning: 'city' },
    { cuneiform: '𒀊𒌝', transliteration: 'abum', meaning: 'father' },
  ],
  'lesson-7': [
    { cuneiform: '𒁺', transliteration: 'alākum', meaning: 'to go' },
    { cuneiform: '𒄿𒈬𒊒', transliteration: 'amārum', meaning: 'to see' },
    { cuneiform: '𒃻', transliteration: 'šakānum', meaning: 'to place' },
    { cuneiform: '𒅗', transliteration: 'qabûm', meaning: 'to speak' },
    { cuneiform: '𒁺𒆷', transliteration: 'illik', meaning: 'he went' },
    { cuneiform: '𒄿𒈬𒊒', transliteration: 'īmur', meaning: 'he saw' },
    { cuneiform: '𒅖𒆪𒌦', transliteration: 'iškun', meaning: 'he placed' },
    { cuneiform: '𒅗𒁉', transliteration: 'iqbi', meaning: 'he spoke' },
  ],
  'lesson-8': [
    { cuneiform: '𒀸', transliteration: 'ina', meaning: 'in, from' },
    { cuneiform: '𒀀𒈾', transliteration: 'ana', meaning: 'to, for' },
    { cuneiform: '𒊭', transliteration: 'ša', meaning: 'of, which, who' },
    { cuneiform: '𒀀𒋾', transliteration: 'itti', meaning: 'with' },
  ],
  'lesson-9': [
    { cuneiform: '𒀭𒂊', transliteration: 'šamû', meaning: 'heaven, sky' },
    { cuneiform: '𒆠𒋾', transliteration: 'erṣetum', meaning: 'earth, underworld' },
    { cuneiform: '𒃵', transliteration: 'nagbu', meaning: 'totality, everything' },
    { cuneiform: '𒋗𒁍', transliteration: 'išdu', meaning: 'foundation, base' },
    { cuneiform: '𒆪𒆷𒋫', transliteration: 'kullatu', meaning: 'all things, entirety' },
    { cuneiform: '𒅗𒁀', transliteration: 'idûm', meaning: 'to know' },
    { cuneiform: '𒈬', transliteration: 'nabûm', meaning: 'to name, to call' },
    { cuneiform: '𒈾', transliteration: 'lā', meaning: 'not' },
  ],
  'lesson-11': [
    { cuneiform: '𒂊𒉡𒈠', transliteration: 'enūma', meaning: 'when' },
    { cuneiform: '𒂊𒇺', transliteration: 'eliš', meaning: 'on high, above' },
    { cuneiform: '𒊭𒀊𒇺', transliteration: 'šapliš', meaning: 'below' },
    { cuneiform: '𒁀𒉡', transliteration: 'banûm', meaning: 'to create, to build' },
  ],
}
