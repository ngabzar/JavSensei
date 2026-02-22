import { Injectable } from '@angular/core';
import { Kanji, Vocab, Grammar, Particle, Kana } from '../types';
// ... Import N5, N4, N3, N2 (Existing Grammar & Vocab)
import { kosakatan4_1 } from '../data/kosakata/kosakatan4/kosakatan4_1';
import { kosakatan4_2 } from '../data/kosakata/kosakatan4/kosakatan4_2';
import { kosakatan4_3 } from '../data/kosakata/kosakatan4/kosakatan4_3';
import { kosakatan4_4 } from '../data/kosakata/kosakatan4/kosakatan4_4';
import { kosakatan4_5 } from '../data/kosakata/kosakatan4/kosakatan4_5';
import { kosakatan4_6 } from '../data/kosakata/kosakatan4/kosakatan4_6';
import { kosakatan4_7 } from '../data/kosakata/kosakatan4/kosakatan4_7';
import { kosakatan4_8 } from '../data/kosakata/kosakatan4/kosakatan4_8';
import { kosakatan4_9 } from '../data/kosakata/kosakatan4/kosakatan4_9';
import { kosakatan4_10 } from '../data/kosakata/kosakatan4/kosakatan4_10';
import { kosakatan4_11 } from '../data/kosakata/kosakatan4/kosakatan4_11';
import { kosakatan4_12 } from '../data/kosakata/kosakatan4/kosakatan4_12';
import { kosakatan4_13 } from '../data/kosakata/kosakatan4/kosakatan4_13';
import { kosakatan4_14 } from '../data/kosakata/kosakatan4/kosakatan4_14';
import { kosakatan4_15 } from '../data/kosakata/kosakatan4/kosakatan4_15';
import { kosakatan4_16 } from '../data/kosakata/kosakatan4/kosakatan4_16';
import { kosakatan4_17 } from '../data/kosakata/kosakatan4/kosakatan4_17';
import { kosakatan4_18 } from '../data/kosakata/kosakatan4/kosakatan4_18';
import { kosakatan4_19 } from '../data/kosakata/kosakatan4/kosakatan4_19';
import { kosakatan4_20 } from '../data/kosakata/kosakatan4/kosakatan4_20';
import { kosakatan5_1 } from '../data/kosakata/kosakatan5/kosakatan5_1';
import { kosakatan5_2 } from '../data/kosakata/kosakatan5/kosakatan5_2';
import { kosakatan5_3 } from '../data/kosakata/kosakatan5/kosakatan5_3';
import { kosakatan5_4 } from '../data/kosakata/kosakatan5/kosakatan5_4';
import { kosakatan5_5 } from '../data/kosakata/kosakatan5/kosakatan5_5';
import { kosakatan5_6 } from '../data/kosakata/kosakatan5/kosakatan5_6';
import { kosakatan5_7 } from '../data/kosakata/kosakatan5/kosakatan5_7';
import { kosakatan5_8 } from '../data/kosakata/kosakatan5/kosakatan5_8';
import { kosakatan5_9 } from '../data/kosakata/kosakatan5/kosakatan5_9';
import { kosakatan5_10 } from '../data/kosakata/kosakatan5/kosakatan5_10';
import { kosakatan5_11 } from '../data/kosakata/kosakatan5/kosakatan5_11';
import { kosakatan5_12 } from '../data/kosakata/kosakatan5/kosakatan5_12';
import { kosakatan5_13 } from '../data/kosakata/kosakatan5/kosakatan5_13';
import { kosakatan5_14 } from '../data/kosakata/kosakatan5/kosakatan5_14';
import { kosakatan5_15 } from '../data/kosakata/kosakatan5/kosakatan5_15';
import { kosakatan5_16 } from '../data/kosakata/kosakatan5/kosakatan5_16';
import { kosakatan5_17 } from '../data/kosakata/kosakatan5/kosakatan5_17';
import { kosakatan5_18 } from '../data/kosakata/kosakatan5/kosakatan5_18';
import { kosakatan5_19 } from '../data/kosakata/kosakatan5/kosakatan5_19';
import { kosakatan5_20 } from '../data/kosakata/kosakatan5/kosakatan5_20';

// Import Kosakata N3
import { kosakatan3_1 } from '../data/kosakata/kosakatan3/kosakatan3_1';
import { kosakatan3_2 } from '../data/kosakata/kosakatan3/kosakatan3_2';
import { kosakatan3_3 } from '../data/kosakata/kosakatan3/kosakatan3_3';
import { kosakatan3_4 } from '../data/kosakata/kosakatan3/kosakatan3_4';
import { kosakatan3_5 } from '../data/kosakata/kosakatan3/kosakatan3_5';
import { kosakatan3_6 } from '../data/kosakata/kosakatan3/kosakatan3_6';
import { kosakatan3_7 } from '../data/kosakata/kosakatan3/kosakatan3_7';
import { kosakatan3_8 } from '../data/kosakata/kosakatan3/kosakatan3_8';
import { kosakatan3_9 } from '../data/kosakata/kosakatan3/kosakatan3_9';
import { kosakatan3_10 } from '../data/kosakata/kosakatan3/kosakatan3_10';
import { kosakatan3_11 } from '../data/kosakata/kosakatan3/kosakatan3_11';
import { kosakatan3_12 } from '../data/kosakata/kosakatan3/kosakatan3_12';
import { kosakatan3_13 } from '../data/kosakata/kosakatan3/kosakatan3_13';
import { kosakatan3_14 } from '../data/kosakata/kosakatan3/kosakatan3_14';
import { kosakatan3_15 } from '../data/kosakata/kosakatan3/kosakatan3_15';
import { kosakatan3_16 } from '../data/kosakata/kosakatan3/kosakatan3_16';
import { kosakatan3_17 } from '../data/kosakata/kosakatan3/kosakatan3_17';
import { kosakatan3_18 } from '../data/kosakata/kosakatan3/kosakatan3_18';
import { kosakatan3_19 } from '../data/kosakata/kosakatan3/kosakatan3_19';
import { kosakatan3_20 } from '../data/kosakata/kosakatan3/kosakatan3_20';

// Import Kosakata N2
import { kosakatan2_1 } from '../data/kosakata/kosakatan2/kosakatan2_1';
import { kosakatan2_2 } from '../data/kosakata/kosakatan2/kosakatan2_2';
import { kosakatan2_3 } from '../data/kosakata/kosakatan2/kosakatan2_3';
import { kosakatan2_4 } from '../data/kosakata/kosakatan2/kosakatan2_4';
import { kosakatan2_5 } from '../data/kosakata/kosakatan2/kosakatan2_5';
import { kosakatan2_6 } from '../data/kosakata/kosakatan2/kosakatan2_6';
import { kosakatan2_7 } from '../data/kosakata/kosakatan2/kosakatan2_7';
import { kosakatan2_8 } from '../data/kosakata/kosakatan2/kosakatan2_8';
import { kosakatan2_9 } from '../data/kosakata/kosakatan2/kosakatan2_9';
import { kosakatan2_10 } from '../data/kosakata/kosakatan2/kosakatan2_10';
import { kosakatan2_11 } from '../data/kosakata/kosakatan2/kosakatan2_11';
import { kosakatan2_12 } from '../data/kosakata/kosakatan2/kosakatan2_12';
import { kosakatan2_13 } from '../data/kosakata/kosakatan2/kosakatan2_13';
import { kosakatan2_14 } from '../data/kosakata/kosakatan2/kosakatan2_14';
import { kosakatan2_15 } from '../data/kosakata/kosakatan2/kosakatan2_15';
import { kosakatan2_16 } from '../data/kosakata/kosakatan2/kosakatan2_16';
import { kosakatan2_17 } from '../data/kosakata/kosakatan2/kosakatan2_17';
import { kosakatan2_18 } from '../data/kosakata/kosakatan2/kosakatan2_18';
import { kosakatan2_19 } from '../data/kosakata/kosakatan2/kosakatan2_19';
import { kosakatan2_20 } from '../data/kosakata/kosakatan2/kosakatan2_20';

// Import Kosakata N1
import { kosakatan1_1 } from '../data/kosakata/kosakatan1/kosakatan1_1';
import { kosakatan1_2 } from '../data/kosakata/kosakatan1/kosakatan1_2';
import { kosakatan1_3 } from '../data/kosakata/kosakatan1/kosakatan1_3';
import { kosakatan1_4 } from '../data/kosakata/kosakatan1/kosakatan1_4';
import { kosakatan1_5 } from '../data/kosakata/kosakatan1/kosakatan1_5';
import { kosakatan1_6 } from '../data/kosakata/kosakatan1/kosakatan1_6';
import { kosakatan1_7 } from '../data/kosakata/kosakatan1/kosakatan1_7';
import { kosakatan1_8 } from '../data/kosakata/kosakatan1/kosakatan1_8';
import { kosakatan1_9 } from '../data/kosakata/kosakatan1/kosakatan1_9';
import { kosakatan1_10 } from '../data/kosakata/kosakatan1/kosakatan1_10';
import { kosakatan1_11 } from '../data/kosakata/kosakatan1/kosakatan1_11';
import { kosakatan1_12 } from '../data/kosakata/kosakatan1/kosakatan1_12';
import { kosakatan1_13 } from '../data/kosakata/kosakatan1/kosakatan1_13';
import { kosakatan1_14 } from '../data/kosakata/kosakatan1/kosakatan1_14';
import { kosakatan1_15 } from '../data/kosakata/kosakatan1/kosakatan1_15';
import { kosakatan1_16 } from '../data/kosakata/kosakatan1/kosakatan1_16';
import { kosakatan1_17 } from '../data/kosakata/kosakatan1/kosakatan1_17';
import { kosakatan1_18 } from '../data/kosakata/kosakatan1/kosakatan1_18';
import { kosakatan1_19 } from '../data/kosakata/kosakatan1/kosakatan1_19';
import { kosakatan1_20 } from '../data/kosakata/kosakatan1/kosakatan1_20';
import { kosakatan1_21 } from '../data/kosakata/kosakatan1/kosakatan1_21';
import { kosakatan1_22 } from '../data/kosakata/kosakatan1/kosakatan1_22';
import { kosakatan2_21 } from '../data/kosakata/kosakatan2/kosakatan2_21';
import { kosakatan2_22 } from '../data/kosakata/kosakatan2/kosakatan2_22';
import { kosakatan3_21 } from '../data/kosakata/kosakatan3/kosakatan3_21';
import { kosakatan3_22 } from '../data/kosakata/kosakatan3/kosakatan3_22';
import { kosakatan4_21 } from '../data/kosakata/kosakatan4/kosakatan4_21';
import { kosakatan4_22 } from '../data/kosakata/kosakatan4/kosakatan4_22';
import { kosakatan5_21 } from '../data/kosakata/kosakatan5/kosakatan5_21';
import { kosakatan5_22 } from '../data/kosakata/kosakatan5/kosakatan5_22';
import { kosakatan5_23 } from '../data/kosakata/kosakatan5/kosakatan5_23';
import { kosakatan5_24 } from '../data/kosakata/kosakatan5/kosakatan5_24';
import { kosakatan5_25 } from '../data/kosakata/kosakatan5/kosakatan5_25';
import { kosakatan5_26 } from '../data/kosakata/kosakatan5/kosakatan5_26';
import { kosakatan5_27 } from '../data/kosakata/kosakatan5/kosakatan5_27';
import { kosakatan5_28 } from '../data/kosakata/kosakatan5/kosakatan5_28';
import { kosakatan5_29 } from '../data/kosakata/kosakatan5/kosakatan5_29';
import { kosakatan5_30 } from '../data/kosakata/kosakatan5/kosakatan5_30';

import { partikeln5_1 } from '../data/partikel/partikeln5/partikeln5_1';
import { partikeln5_2 } from '../data/partikel/partikeln5/partikeln5_2';
import { partikeln5_3 } from '../data/partikel/partikeln5/partikeln5_3';
import { partikeln5_4 } from '../data/partikel/partikeln5/partikeln5_4';
import { partikeln5_5 } from '../data/partikel/partikeln5/partikeln5_5';
import { partikeln5_6 } from '../data/partikel/partikeln5/partikeln5_6';
import { partikeln5_7 } from '../data/partikel/partikeln5/partikeln5_7';
import { partikeln5_8 } from '../data/partikel/partikeln5/partikeln5_8';
import { partikeln5_9 } from '../data/partikel/partikeln5/partikeln5_9';
import { partikeln5_10 } from '../data/partikel/partikeln5/partikeln5_10';
import { partikeln5_11 } from '../data/partikel/partikeln5/partikeln5_11';
import { partikeln5_12 } from '../data/partikel/partikeln5/partikeln5_12';
import { partikeln5_13 } from '../data/partikel/partikeln5/partikeln5_13';
import { partikeln5_14 } from '../data/partikel/partikeln5/partikeln5_14';
import { partikeln5_15 } from '../data/partikel/partikeln5/partikeln5_15';
import { partikeln5_16 } from '../data/partikel/partikeln5/partikeln5_16';
import { partikeln5_17 } from '../data/partikel/partikeln5/partikeln5_17';
import { partikeln5_18 } from '../data/partikel/partikeln5/partikeln5_18';
import { partikeln5_19 } from '../data/partikel/partikeln5/partikeln5_19';
import { partikeln5_20 } from '../data/partikel/partikeln5/partikeln5_20';
import { partikeln4_1 } from '../data/partikel/partikeln4/partikeln4_1';
import { partikeln4_2 } from '../data/partikel/partikeln4/partikeln4_2';
import { partikeln4_3 } from '../data/partikel/partikeln4/partikeln4_3';
import { partikeln4_4 } from '../data/partikel/partikeln4/partikeln4_4';
import { partikeln4_5 } from '../data/partikel/partikeln4/partikeln4_5';
import { partikeln4_6 } from '../data/partikel/partikeln4/partikeln4_6';
import { partikeln4_7 } from '../data/partikel/partikeln4/partikeln4_7';
import { partikeln4_8 } from '../data/partikel/partikeln4/partikeln4_8';
import { partikeln4_9 } from '../data/partikel/partikeln4/partikeln4_9';
import { partikeln4_10 } from '../data/partikel/partikeln4/partikeln4_10';
import { partikeln4_11 } from '../data/partikel/partikeln4/partikeln4_11';
import { partikeln4_12 } from '../data/partikel/partikeln4/partikeln4_12';
import { partikeln4_13 } from '../data/partikel/partikeln4/partikeln4_13';
import { partikeln4_14 } from '../data/partikel/partikeln4/partikeln4_14';
import { partikeln4_15 } from '../data/partikel/partikeln4/partikeln4_15';
import { partikeln4_16 } from '../data/partikel/partikeln4/partikeln4_16';
import { partikeln4_17 } from '../data/partikel/partikeln4/partikeln4_17';
import { partikeln4_18 } from '../data/partikel/partikeln4/partikeln4_18';
import { partikeln4_19 } from '../data/partikel/partikeln4/partikeln4_19';
import { partikeln4_20 } from '../data/partikel/partikeln4/partikeln4_20';

// Import Partikel N3
import { partikeln3_1 } from '../data/partikel/partikeln3/partikeln3_1';
import { partikeln3_2 } from '../data/partikel/partikeln3/partikeln3_2';
import { partikeln3_3 } from '../data/partikel/partikeln3/partikeln3_3';
import { partikeln3_4 } from '../data/partikel/partikeln3/partikeln3_4';
import { partikeln3_5 } from '../data/partikel/partikeln3/partikeln3_5';
import { partikeln3_6 } from '../data/partikel/partikeln3/partikeln3_6';
import { partikeln3_7 } from '../data/partikel/partikeln3/partikeln3_7';
import { partikeln3_8 } from '../data/partikel/partikeln3/partikeln3_8';
import { partikeln3_9 } from '../data/partikel/partikeln3/partikeln3_9';
import { partikeln3_10 } from '../data/partikel/partikeln3/partikeln3_10';
import { partikeln3_11 } from '../data/partikel/partikeln3/partikeln3_11';
import { partikeln3_12 } from '../data/partikel/partikeln3/partikeln3_12';
import { partikeln3_13 } from '../data/partikel/partikeln3/partikeln3_13';
import { partikeln3_14 } from '../data/partikel/partikeln3/partikeln3_14';
import { partikeln3_15 } from '../data/partikel/partikeln3/partikeln3_15';
import { partikeln3_16 } from '../data/partikel/partikeln3/partikeln3_16';
import { partikeln3_17 } from '../data/partikel/partikeln3/partikeln3_17';
import { partikeln3_18 } from '../data/partikel/partikeln3/partikeln3_18';
import { partikeln3_19 } from '../data/partikel/partikeln3/partikeln3_19';
import { partikeln3_20 } from '../data/partikel/partikeln3/partikeln3_20';

// Import Partikel N2
import { partikeln2_1 } from '../data/partikel/partikeln2/partikeln2_1';
import { partikeln2_2 } from '../data/partikel/partikeln2/partikeln2_2';
import { partikeln2_3 } from '../data/partikel/partikeln2/partikeln2_3';
import { partikeln2_4 } from '../data/partikel/partikeln2/partikeln2_4';
import { partikeln2_5 } from '../data/partikel/partikeln2/partikeln2_5';
import { partikeln2_6 } from '../data/partikel/partikeln2/partikeln2_6';
import { partikeln2_7 } from '../data/partikel/partikeln2/partikeln2_7';
import { partikeln2_8 } from '../data/partikel/partikeln2/partikeln2_8';
import { partikeln2_9 } from '../data/partikel/partikeln2/partikeln2_9';
import { partikeln2_10 } from '../data/partikel/partikeln2/partikeln2_10';
import { partikeln2_11 } from '../data/partikel/partikeln2/partikeln2_11';
import { partikeln2_12 } from '../data/partikel/partikeln2/partikeln2_12';
import { partikeln2_13 } from '../data/partikel/partikeln2/partikeln2_13';
import { partikeln2_14 } from '../data/partikel/partikeln2/partikeln2_14';
import { partikeln2_15 } from '../data/partikel/partikeln2/partikeln2_15';
import { partikeln2_16 } from '../data/partikel/partikeln2/partikeln2_16';
import { partikeln2_17 } from '../data/partikel/partikeln2/partikeln2_17';
import { partikeln2_18 } from '../data/partikel/partikeln2/partikeln2_18';
import { partikeln2_19 } from '../data/partikel/partikeln2/partikeln2_19';
import { partikeln2_20 } from '../data/partikel/partikeln2/partikeln2_20';

// Import Partikel N1
import { partikeln1_1 } from '../data/partikel/partikeln1/partikeln1_1';
import { partikeln1_2 } from '../data/partikel/partikeln1/partikeln1_2';
import { partikeln1_3 } from '../data/partikel/partikeln1/partikeln1_3';
import { partikeln1_4 } from '../data/partikel/partikeln1/partikeln1_4';
import { partikeln1_5 } from '../data/partikel/partikeln1/partikeln1_5';
import { partikeln1_6 } from '../data/partikel/partikeln1/partikeln1_6';
import { partikeln1_7 } from '../data/partikel/partikeln1/partikeln1_7';
import { partikeln1_8 } from '../data/partikel/partikeln1/partikeln1_8';
import { partikeln1_9 } from '../data/partikel/partikeln1/partikeln1_9';
import { partikeln1_10 } from '../data/partikel/partikeln1/partikeln1_10';
import { partikeln1_11 } from '../data/partikel/partikeln1/partikeln1_11';
import { partikeln1_12 } from '../data/partikel/partikeln1/partikeln1_12';
import { partikeln1_13 } from '../data/partikel/partikeln1/partikeln1_13';
import { partikeln1_14 } from '../data/partikel/partikeln1/partikeln1_14';
import { partikeln1_15 } from '../data/partikel/partikeln1/partikeln1_15';
import { partikeln1_16 } from '../data/partikel/partikeln1/partikeln1_16';
import { partikeln1_17 } from '../data/partikel/partikeln1/partikeln1_17';
import { partikeln1_18 } from '../data/partikel/partikeln1/partikeln1_18';

import { bunpoun4_1 } from '../data/bunpou/bunpoun4/bunpoun4_1';
import { bunpoun4_2 } from '../data/bunpou/bunpoun4/bunpoun4_2';
import { bunpoun4_3 } from '../data/bunpou/bunpoun4/bunpoun4_3';
import { bunpoun4_4 } from '../data/bunpou/bunpoun4/bunpoun4_4';
import { bunpoun4_5 } from '../data/bunpou/bunpoun4/bunpoun4_5';
import { bunpoun4_6 } from '../data/bunpou/bunpoun5/bunpoun4_6';
import { bunpoun4_7 } from '../data/bunpou/bunpoun4/bunpoun4_7';
import { bunpoun4_8 } from '../data/bunpou/bunpoun4/bunpoun4_8';
import { bunpoun4_9 } from '../data/bunpou/bunpoun5/bunpoun4_9';
import { bunpoun4_10 } from '../data/bunpou/bunpoun4/bunpoun4_10';
import { bunpoun4_11 } from '../data/bunpou/bunpoun4/bunpoun4_11';
import { bunpoun4_12 } from '../data/bunpou/bunpoun4/bunpoun4_12';
import { bunpoun4_13 } from '../data/bunpou/bunpoun4/bunpoun4_13';
import { bunpoun4_14 } from '../data/bunpou/bunpoun4/bunpoun4_14';
import { bunpoun4_15 } from '../data/bunpou/bunpoun4/bunpoun4_15';
import { bunpoun4_16 } from '../data/bunpou/bunpoun4/bunpoun4_16';
import { bunpoun4_17 } from '../data/bunpou/bunpoun4/bunpoun4_17';
import { bunpoun4_18 } from '../data/bunpou/bunpoun4/bunpoun4_18';
import { bunpoun4_19 } from '../data/bunpou/bunpoun4/bunpoun4_19';
import { bunpoun4_20 } from '../data/bunpou/bunpoun4/bunpoun4_20';
import { bunpoun5_1 } from '../data/bunpou/bunpoun5/bunpoun5_1';
import { bunpoun5_2 } from '../data/bunpou/bunpoun5/bunpoun5_2';
import { bunpoun5_3 } from '../data/bunpou/bunpoun5/bunpoun5_3';
import { bunpoun5_4 } from '../data/bunpou/bunpoun5/bunpoun5_4';
import { bunpoun5_5 } from '../data/bunpou/bunpoun5/bunpoun5_5';
import { bunpoun5_6 } from '../data/bunpou/bunpoun5/bunpoun5_6';
import { bunpoun5_7 } from '../data/bunpou/bunpoun5/bunpoun5_7';
import { bunpoun5_8 } from '../data/bunpou/bunpoun5/bunpoun5_8';
import { bunpoun5_9 } from '../data/bunpou/bunpoun5/bunpoun5_9';
import { bunpoun5_10 } from '../data/bunpou/bunpoun5/bunpoun5_10';
import { bunpoun5_11 } from '../data/bunpou/bunpoun5/bunpoun5_11';
import { bunpoun5_12 } from '../data/bunpou/bunpoun5/bunpoun5_12';
import { bunpoun5_13 } from '../data/bunpou/bunpoun5/bunpoun5_13';
import { bunpoun5_14 } from '../data/bunpou/bunpoun5/bunpoun5_14';
import { bunpoun5_15 } from '../data/bunpou/bunpoun5/bunpoun5_15';
import { bunpoun5_16 } from '../data/bunpou/bunpoun5/bunpoun5_16';
import { bunpoun5_17 } from '../data/bunpou/bunpoun5/bunpoun5_17';
import { bunpoun5_18 } from '../data/bunpou/bunpoun5/bunpoun5_18';
import { bunpoun5_19 } from '../data/bunpou/bunpoun5/bunpoun5_19';
import { bunpoun5_20 } from '../data/bunpou/bunpoun5/bunpoun5_20';
import { bunpoun3_1 } from '../data/bunpou/bunpoun3/bunpoun3_1';
import { bunpoun3_2 } from '../data/bunpou/bunpoun3/bunpoun3_2';
import { bunpoun3_3 } from '../data/bunpou/bunpoun3/bunpoun3_3';
import { bunpoun3_4 } from '../data/bunpou/bunpoun3/bunpoun3_4';
import { bunpoun3_5 } from '../data/bunpou/bunpoun3/bunpoun3_5';
import { bunpoun3_6 } from '../data/bunpou/bunpoun3/bunpoun3_6';
import { bunpoun3_7 } from '../data/bunpou/bunpoun3/bunpoun3_7';
import { bunpoun3_8 } from '../data/bunpou/bunpoun3/bunpoun3_8';
import { bunpoun3_9 } from '../data/bunpou/bunpoun3/bunpoun3_9';
import { bunpoun3_10 } from '../data/bunpou/bunpoun3/bunpoun3_10';
import { bunpoun3_11 } from '../data/bunpou/bunpoun3/bunpoun3_11';
import { bunpoun3_12 } from '../data/bunpou/bunpoun3/bunpoun3_12';
import { bunpoun3_13 } from '../data/bunpou/bunpoun3/bunpoun3_13';
import { bunpoun3_14 } from '../data/bunpou/bunpoun3/bunpoun3_14';
import { bunpoun3_15 } from '../data/bunpou/bunpoun3/bunpoun3_15';
import { bunpoun3_16 } from '../data/bunpou/bunpoun3/bunpoun3_16';
import { bunpoun3_17 } from '../data/bunpou/bunpoun3/bunpoun3_17';
import { bunpoun3_18 } from '../data/bunpou/bunpoun3/bunpoun3_18';
import { bunpoun3_19 } from '../data/bunpou/bunpoun3/bunpoun3_19';
import { bunpoun3_20 } from '../data/bunpou/bunpoun3/bunpoun3_20';
import { bunpoun2_1 } from '../data/bunpou/bunpoun2/bunpoun2_1';
import { bunpoun2_2 } from '../data/bunpou/bunpoun2/bunpoun2_2';
import { bunpoun2_3 } from '../data/bunpou/bunpoun2/bunpoun2_3';
import { bunpoun2_4 } from '../data/bunpou/bunpoun2/bunpoun2_4';
import { bunpoun2_5 } from '../data/bunpou/bunpoun2/bunpoun2_5';
import { bunpoun2_6 } from '../data/bunpou/bunpoun2/bunpoun2_6';
import { bunpoun2_7 } from '../data/bunpou/bunpoun2/bunpoun2_7';
import { bunpoun2_8 } from '../data/bunpou/bunpoun2/bunpoun2_8';
import { bunpoun2_9 } from '../data/bunpou/bunpoun2/bunpoun2_9';
import { bunpoun2_10 } from '../data/bunpou/bunpoun2/bunpoun2_10';
import { bunpoun2_11 } from '../data/bunpou/bunpoun2/bunpoun2_11';
import { bunpoun2_12 } from '../data/bunpou/bunpoun2/bunpoun2_12';
import { bunpoun2_13 } from '../data/bunpou/bunpoun2/bunpoun2_13';
import { bunpoun2_14 } from '../data/bunpou/bunpoun2/bunpoun2_14';
import { bunpoun2_15 } from '../data/bunpou/bunpoun2/bunpoun2_15';
import { bunpoun2_16 } from '../data/bunpou/bunpoun2/bunpoun2_16';
import { bunpoun2_17 } from '../data/bunpou/bunpoun2/bunpoun2_17';
import { bunpoun2_18 } from '../data/bunpou/bunpoun2/bunpoun2_18';
import { bunpoun2_19 } from '../data/bunpou/bunpoun2/bunpoun2_19';
import { bunpoun2_20 } from '../data/bunpou/bunpoun2/bunpoun2_20';
import { bunpoun1_1 } from '../data/bunpou/bunpoun1/bunpoun1_1';
import { bunpoun1_2 } from '../data/bunpou/bunpoun1/bunpoun1_2';
import { bunpoun1_3 } from '../data/bunpou/bunpoun1/bunpoun1_3';
import { bunpoun1_4 } from '../data/bunpou/bunpoun1/bunpoun1_4';
import { bunpoun1_5 } from '../data/bunpou/bunpoun1/bunpoun1_5';
import { bunpoun1_6 } from '../data/bunpou/bunpoun1/bunpoun1_6';
import { bunpoun1_7 } from '../data/bunpou/bunpoun1/bunpoun1_7';
import { bunpoun1_8 } from '../data/bunpou/bunpoun1/bunpoun1_8';
import { bunpoun1_9 } from '../data/bunpou/bunpoun1/bunpoun1_9';
import { bunpoun1_10 } from '../data/bunpou/bunpoun1/bunpoun1_10';
import { bunpoun1_11 } from '../data/bunpou/bunpoun1/bunpoun1_11';
import { bunpoun1_12 } from '../data/bunpou/bunpoun1/bunpoun1_12';
import { bunpoun1_13 } from '../data/bunpou/bunpoun1/bunpoun1_13';
import { bunpoun1_14 } from '../data/bunpou/bunpoun1/bunpoun1_14';
import { bunpoun1_15 } from '../data/bunpou/bunpoun1/bunpoun1_15';
import { bunpoun1_16 } from '../data/bunpou/bunpoun1/bunpoun1_16';
import { bunpoun1_17 } from '../data/bunpou/bunpoun1/bunpoun1_17';
import { bunpoun1_18 } from '../data/bunpou/bunpoun1/bunpoun1_18';
import { bunpoun1_19 } from '../data/bunpou/bunpoun1/bunpoun1_19';
import { bunpoun1_20 } from '../data/bunpou/bunpoun1/bunpoun1_20';

import { kanjin5_1 } from '../data/kanji/kanjin5/kanjin5_1';
import { kanjin5_2 } from '../data/kanji/kanjin5/kanjin5_2';
import { kanjin5_3 } from '../data/kanji/kanjin5/kanjin5_3';
import { kanjin5_4 } from '../data/kanji/kanjin5/kanjin5_4';
import { kanjin5_5 } from '../data/kanji/kanjin5/kanjin5_5';
import { kanjin5_6 } from '../data/kanji/kanjin5/kanjin5_6';
import { kanjin5_7 } from '../data/kanji/kanjin5/kanjin5_7';
import { kanjin5_8 } from '../data/kanji/kanjin5/kanjin5_8';
import { kanjin5_9 } from '../data/kanji/kanjin5/kanjin5_9';
import { kanjin5_10 } from '../data/kanji/kanjin5/kanjin5_10';
import { kanjin5_11 } from '../data/kanji/kanjin5/kanjin5_11';
import { kanjin5_12 } from '../data/kanji/kanjin5/kanjin5_12';
import { kanjin5_13 } from '../data/kanji/kanjin5/kanjin5_13';
import { kanjin5_14 } from '../data/kanji/kanjin5/kanjin5_14';
import { kanjin5_15 } from '../data/kanji/kanjin5/kanjin5_15';
import { kanjin5_16 } from '../data/kanji/kanjin5/kanjin5_16';
import { kanjin5_17 } from '../data/kanji/kanjin5/kanjin5_17';
import { kanjin5_18 } from '../data/kanji/kanjin5/kanjin5_18';
import { kanjin5_19 } from '../data/kanji/kanjin5/kanjin5_19';
import { kanjin5_20 } from '../data/kanji/kanjin5/kanjin5_20';
import { kanjin5_21 } from '../data/kanji/kanjin5/kanjin5_21';
import { kanjin4_1 } from '../data/kanji/kanjin4/kanjin4_1';
import { kanjin4_2 } from '../data/kanji/kanjin4/kanjin4_2';
import { kanjin4_3 } from '../data/kanji/kanjin4/kanjin4_3';
import { kanjin4_4 } from '../data/kanji/kanjin4/kanjin4_4';
import { kanjin4_5 } from '../data/kanji/kanjin4/kanjin4_5';
import { kanjin4_6 } from '../data/kanji/kanjin4/kanjin4_6';
import { kanjin4_7 } from '../data/kanji/kanjin4/kanjin4_7';
import { kanjin4_8 } from '../data/kanji/kanjin4/kanjin4_8';
import { kanjin4_9 } from '../data/kanji/kanjin4/kanjin4_9';
import { kanjin4_10 } from '../data/kanji/kanjin4/kanjin4_10';
import { kanjin4_11 } from '../data/kanji/kanjin4/kanjin4_11';
import { kanjin4_12 } from '../data/kanji/kanjin4/kanjin4_12';
import { kanjin4_13 } from '../data/kanji/kanjin4/kanjin4_13';
import { kanjin4_14 } from '../data/kanji/kanjin4/kanjin4_14';
import { kanjin4_15 } from '../data/kanji/kanjin4/kanjin4_15';
import { kanjin4_16 } from '../data/kanji/kanjin4/kanjin4_16';
import { kanjin4_17 } from '../data/kanji/kanjin4/kanjin4_17';
import { kanjin4_18 } from '../data/kanji/kanjin4/kanjin4_18';
import { kanjin4_19 } from '../data/kanji/kanjin4/kanjin4_19';
import { kanjin4_20 } from '../data/kanji/kanjin4/kanjin4_20';
import { kanjin4_21 } from '../data/kanji/kanjin4/kanjin4_21';

// Import Kanji N3
import { kanjin3_1 } from '../data/kanji/kanjin3/kanjin3_1';
import { kanjin3_2 } from '../data/kanji/kanjin3/kanjin3_2';
import { kanjin3_3 } from '../data/kanji/kanjin3/kanjin3_3';
import { kanjin3_4 } from '../data/kanji/kanjin3/kanjin3_4';
import { kanjin3_5 } from '../data/kanji/kanjin3/kanjin3_5';
import { kanjin3_6 } from '../data/kanji/kanjin3/kanjin3_6';
import { kanjin3_7 } from '../data/kanji/kanjin3/kanjin3_7';
import { kanjin3_8 } from '../data/kanji/kanjin3/kanjin3_8';
import { kanjin3_9 } from '../data/kanji/kanjin3/kanjin3_9';
import { kanjin3_10 } from '../data/kanji/kanjin3/kanjin3_10';
import { kanjin3_11 } from '../data/kanji/kanjin3/kanjin3_11';
import { kanjin3_12 } from '../data/kanji/kanjin3/kanjin3_12';
import { kanjin3_13 } from '../data/kanji/kanjin3/kanjin3_13';
import { kanjin3_14 } from '../data/kanji/kanjin3/kanjin3_14';
import { kanjin3_15 } from '../data/kanji/kanjin3/kanjin3_15';
import { kanjin3_16 } from '../data/kanji/kanjin3/kanjin3_16';
import { kanjin3_17 } from '../data/kanji/kanjin3/kanjin3_17';
import { kanjin3_18 } from '../data/kanji/kanjin3/kanjin3_18';
import { kanjin3_19 } from '../data/kanji/kanjin3/kanjin3_19';
import { kanjin3_20 } from '../data/kanji/kanjin3/kanjin3_20';
import { kanjin3_21 } from '../data/kanji/kanjin3/kanjin3_21';

// Import Kanji N2
import { kanjin2_1 } from '../data/kanji/kanjin2/kanjin2_1';
import { kanjin2_2 } from '../data/kanji/kanjin2/kanjin2_2';
import { kanjin2_3 } from '../data/kanji/kanjin2/kanjin2_3';
import { kanjin2_4 } from '../data/kanji/kanjin2/kanjin2_4';
import { kanjin2_5 } from '../data/kanji/kanjin2/kanjin2_5';
import { kanjin2_6 } from '../data/kanji/kanjin2/kanjin2_6';
import { kanjin2_7 } from '../data/kanji/kanjin2/kanjin2_7';
import { kanjin2_8 } from '../data/kanji/kanjin2/kanjin2_8';
import { kanjin2_9 } from '../data/kanji/kanjin2/kanjin2_9';
import { kanjin2_10 } from '../data/kanji/kanjin2/kanjin2_10';
import { kanjin2_11 } from '../data/kanji/kanjin2/kanjin2_11';
import { kanjin2_12 } from '../data/kanji/kanjin2/kanjin2_12';
import { kanjin2_13 } from '../data/kanji/kanjin2/kanjin2_13';
import { kanjin2_14 } from '../data/kanji/kanjin2/kanjin2_14';
import { kanjin2_15 } from '../data/kanji/kanjin2/kanjin2_15';
import { kanjin2_16 } from '../data/kanji/kanjin2/kanjin2_16';
import { kanjin2_17 } from '../data/kanji/kanjin2/kanjin2_17';
import { kanjin2_18 } from '../data/kanji/kanjin2/kanjin2_18';
import { kanjin2_19 } from '../data/kanji/kanjin2/kanjin2_19';
import { kanjin2_20 } from '../data/kanji/kanjin2/kanjin2_20';

// Import Kanji N1
import { kanjin1_1 } from '../data/kanji/kanjin1/kanjin1_1';
import { kanjin1_2 } from '../data/kanji/kanjin1/kanjin1_2';
import { kanjin1_3 } from '../data/kanji/kanjin1/kanjin1_3';
import { kanjin1_4 } from '../data/kanji/kanjin1/kanjin1_4';
import { kanjin1_5 } from '../data/kanji/kanjin1/kanjin1_5';
import { kanjin1_6 } from '../data/kanji/kanjin1/kanjin1_6';
import { kanjin1_7 } from '../data/kanji/kanjin1/kanjin1_7';
import { kanjin1_8 } from '../data/kanji/kanjin1/kanjin1_8';
import { kanjin1_9 } from '../data/kanji/kanjin1/kanjin1_9';
import { kanjin1_10 } from '../data/kanji/kanjin1/kanjin1_10';
import { kanjin1_11 } from '../data/kanji/kanjin1/kanjin1_11';
import { kanjin1_12 } from '../data/kanji/kanjin1/kanjin1_12';
import { kanjin1_13 } from '../data/kanji/kanjin1/kanjin1_13';
import { kanjin1_14 } from '../data/kanji/kanjin1/kanjin1_14';
import { kanjin1_15 } from '../data/kanji/kanjin1/kanjin1_15';
import { kanjin1_16 } from '../data/kanji/kanjin1/kanjin1_16';
import { kanjin1_17 } from '../data/kanji/kanjin1/kanjin1_17';
import { kanjin1_18 } from '../data/kanji/kanjin1/kanjin1_18';
import { kanjin1_19 } from '../data/kanji/kanjin1/kanjin1_19';
import { kanjin1_20 } from '../data/kanji/kanjin1/kanjin1_20';

import { katakana_1 } from '../data/kana/katakana/katakana_1';
import { katakana_2 } from '../data/kana/katakana/katakana_2';
import { katakana_3 } from '../data/kana/katakana/katakana_3';
import { katakana_4 } from '../data/kana/katakana/katakana_4';
import { katakana_5 } from '../data/kana/katakana/katakana_5';
import { katakana_6 } from '../data/kana/katakana/katakana_6';
import { katakana_7 } from '../data/kana/katakana/katakana_7';
import { katakana_8 } from '../data/kana/katakana/katakana_8';
import { katakana_9 } from '../data/kana/katakana/katakana_9';
import { katakana_10 } from '../data/kana/katakana/katakana_10';
import { katakana_11 } from '../data/kana/katakana/katakana_11';
import { katakana_12 } from '../data/kana/katakana/katakana_12';
import { katakana_13 } from '../data/kana/katakana/katakana_13';
import { katakana_14 } from '../data/kana/katakana/katakana_14';
import { katakana_15 } from '../data/kana/katakana/katakana_15';
import { katakana_16 } from '../data/kana/katakana/katakana_16';
import { katakana_17 } from '../data/kana/katakana/katakana_17';
import { katakana_18 } from '../data/kana/katakana/katakana_18';
import { katakana_19 } from '../data/kana/katakana/katakana_19';
import { katakana_20 } from '../data/kana/katakana/katakana_20';
import { hiragana_1 } from '../data/kana/hiragana/hiragana_1';
import { hiragana_2 } from '../data/kana/hiragana/hiragana_2';
import { hiragana_3 } from '../data/kana/hiragana/hiragana_3';
import { hiragana_4 } from '../data/kana/hiragana/hiragana_4';
import { hiragana_5 } from '../data/kana/hiragana/hiragana_5';
import { hiragana_6 } from '../data/kana/hiragana/hiragana_6';
import { hiragana_7 } from '../data/kana/hiragana/hiragana_7';
import { hiragana_8 } from '../data/kana/hiragana/hiragana_8';
import { hiragana_9 } from '../data/kana/hiragana/hiragana_9';
import { hiragana_10 } from '../data/kana/hiragana/hiragana_10';
import { hiragana_11 } from '../data/kana/hiragana/hiragana_11';
import { hiragana_12 } from '../data/kana/hiragana/hiragana_12';
import { hiragana_13 } from '../data/kana/hiragana/hiragana_13';
import { hiragana_14 } from '../data/kana/hiragana/hiragana_14';
import { hiragana_15 } from '../data/kana/hiragana/hiragana_15';
import { hiragana_16 } from '../data/kana/hiragana/hiragana_16';
import { hiragana_17 } from '../data/kana/hiragana/hiragana_17';
import { hiragana_18 } from '../data/kana/hiragana/hiragana_18';
import { hiragana_19 } from '../data/kana/hiragana/hiragana_19';
import { hiragana_20 } from '../data/kana/hiragana/hiragana_20';

@Injectable({
  providedIn: 'root'
})
export class JapaneseDataService {
  
  // MOCK DATA - In a real app, this comes from MongoDB/Node.js

  // KANJI DATA
  private kanjiList: Kanji[] = [
    // Import N5 Data
    ...kanjin5_1, ...kanjin5_2, ...kanjin5_3, ...kanjin5_4, ...kanjin5_5,
    ...kanjin5_6, ...kanjin5_7, ...kanjin5_8, ...kanjin5_9, ...kanjin5_10,
    ...kanjin5_11, ...kanjin5_12, ...kanjin5_13, ...kanjin5_14, ...kanjin5_15,
    ...kanjin5_16, ...kanjin5_17, ...kanjin5_18, ...kanjin5_19, ...kanjin5_20,
    ...kanjin5_21,
    
    // Import N4 Data
    ...kanjin4_1, ...kanjin4_2, ...kanjin4_3, ...kanjin4_4, ...kanjin4_5,
    ...kanjin4_6, ...kanjin4_7, ...kanjin4_8, ...kanjin4_9, ...kanjin4_10,
    ...kanjin4_11, ...kanjin4_12, ...kanjin4_13, ...kanjin4_14, ...kanjin4_15,
    ...kanjin4_16, ...kanjin4_17, ...kanjin4_18, ...kanjin4_19, ...kanjin4_20,
    ...kanjin4_21,

    // Import N3 Data
    ...kanjin3_1, ...kanjin3_2, ...kanjin3_3, ...kanjin3_4, ...kanjin3_5,
    ...kanjin3_6, ...kanjin3_7, ...kanjin3_8, ...kanjin3_9, ...kanjin3_10,
    ...kanjin3_11, ...kanjin3_12, ...kanjin3_13, ...kanjin3_14, ...kanjin3_15,
    ...kanjin3_16, ...kanjin3_17, ...kanjin3_18, ...kanjin3_19, ...kanjin3_20,
    ...kanjin3_21,

    // Import N2 Data
    ...kanjin2_1, ...kanjin2_2, ...kanjin2_3, ...kanjin2_4, ...kanjin2_5,
    ...kanjin2_6, ...kanjin2_7, ...kanjin2_8, ...kanjin2_9, ...kanjin2_10,
    ...kanjin2_11, ...kanjin2_12, ...kanjin2_13, ...kanjin2_14, ...kanjin2_15,
    ...kanjin2_16, ...kanjin2_17, ...kanjin2_18, ...kanjin2_19, ...kanjin2_20,

    // Import N1 Data
    ...kanjin1_1, ...kanjin1_2, ...kanjin1_3, ...kanjin1_4, ...kanjin1_5,
    ...kanjin1_6, ...kanjin1_7, ...kanjin1_8, ...kanjin1_9, ...kanjin1_10,
    ...kanjin1_11, ...kanjin1_12, ...kanjin1_13, ...kanjin1_14, ...kanjin1_15,
    ...kanjin1_16, ...kanjin1_17, ...kanjin1_18, ...kanjin1_19, ...kanjin1_20
  ];

  // VOCAB DATA
  private vocabList: Vocab[] = [
    // Import N5 Data
    ...kosakatan5_1, ...kosakatan5_2, ...kosakatan5_3, ...kosakatan5_4, ...kosakatan5_5,
    ...kosakatan5_6, ...kosakatan5_7, ...kosakatan5_8, ...kosakatan5_9, ...kosakatan5_10,
    ...kosakatan5_11, ...kosakatan5_12, ...kosakatan5_13, ...kosakatan5_14, ...kosakatan5_15,
    ...kosakatan5_16, ...kosakatan5_17, ...kosakatan5_18, ...kosakatan5_19, ...kosakatan5_20,
    ...kosakatan5_21, ...kosakatan5_22, ...kosakatan5_23, ...kosakatan5_24, ...kosakatan5_25,
    ...kosakatan5_26, ...kosakatan5_27, ...kosakatan5_28, ...kosakatan5_29, ...kosakatan5_30,
    
    // Import N4 Data
    ...kosakatan4_1, ...kosakatan4_2, ...kosakatan4_3, ...kosakatan4_4, ...kosakatan4_5,
    ...kosakatan4_6, ...kosakatan4_7, ...kosakatan4_8, ...kosakatan4_9, ...kosakatan4_10,
    ...kosakatan4_11, ...kosakatan4_12, ...kosakatan4_13, ...kosakatan4_14, ...kosakatan4_15,
    ...kosakatan4_16, ...kosakatan4_17, ...kosakatan4_18, ...kosakatan4_19, ...kosakatan4_20,
    ...kosakatan4_21, ...kosakatan4_22,

    // Import N3 Data
    ...kosakatan3_1, ...kosakatan3_2, ...kosakatan3_3, ...kosakatan3_4, ...kosakatan3_5,
    ...kosakatan3_6, ...kosakatan3_7, ...kosakatan3_8, ...kosakatan3_9, ...kosakatan3_10,
    ...kosakatan3_11, ...kosakatan3_12, ...kosakatan3_13, ...kosakatan3_14, ...kosakatan3_15,
    ...kosakatan3_16, ...kosakatan3_17, ...kosakatan3_18, ...kosakatan3_19, ...kosakatan3_20,
    ...kosakatan3_21, ...kosakatan3_22,

    // Import N2 Data
    ...kosakatan2_1, ...kosakatan2_2, ...kosakatan2_3, ...kosakatan2_4, ...kosakatan2_5,
    ...kosakatan2_6, ...kosakatan2_7, ...kosakatan2_8, ...kosakatan2_9, ...kosakatan2_10,
    ...kosakatan2_11, ...kosakatan2_12, ...kosakatan2_13, ...kosakatan2_14, ...kosakatan2_15,
    ...kosakatan2_16, ...kosakatan2_17, ...kosakatan2_18, ...kosakatan2_19, ...kosakatan2_20,
    ...kosakatan2_21, ...kosakatan2_22,

    // Import N1 Data
    ...kosakatan1_1, ...kosakatan1_2, ...kosakatan1_3, ...kosakatan1_4, ...kosakatan1_5,
    ...kosakatan1_6, ...kosakatan1_7, ...kosakatan1_8, ...kosakatan1_9, ...kosakatan1_10,
    ...kosakatan1_11, ...kosakatan1_12, ...kosakatan1_13, ...kosakatan1_14, ...kosakatan1_15,
    ...kosakatan1_16, ...kosakatan1_17, ...kosakatan1_18, ...kosakatan1_19, ...kosakatan1_20,
    ...kosakatan1_21, ...kosakatan1_22
  ];

  // GRAMMAR DATA
  private grammarList: Grammar[] = [
    // Import N5 Data
    ...bunpoun5_1, ...bunpoun5_2, ...bunpoun5_3, ...bunpoun5_4, ...bunpoun5_5,
    ...bunpoun5_6, ...bunpoun5_7, ...bunpoun5_8, ...bunpoun5_9, ...bunpoun5_10,
    ...bunpoun5_11, ...bunpoun5_12, ...bunpoun5_13, ...bunpoun5_14, ...bunpoun5_15,
    ...bunpoun5_16, ...bunpoun5_17, ...bunpoun5_18, ...bunpoun5_19, ...bunpoun5_20,
    
    // Import N4 Data
    ...bunpoun4_1, ...bunpoun4_2, ...bunpoun4_3, ...bunpoun4_4, ...bunpoun4_5,
    ...bunpoun4_6, ...bunpoun4_7, ...bunpoun4_8, ...bunpoun4_9, ...bunpoun4_10,
    ...bunpoun4_11, ...bunpoun4_12, ...bunpoun4_13, ...bunpoun4_14, ...bunpoun4_15,
    ...bunpoun4_16, ...bunpoun4_17, ...bunpoun4_18, ...bunpoun4_19, ...bunpoun4_20,

    // Import N3 Data
    ...bunpoun3_1, ...bunpoun3_2, ...bunpoun3_3, ...bunpoun3_4, ...bunpoun3_5,
    ...bunpoun3_6, ...bunpoun3_7, ...bunpoun3_8, ...bunpoun3_9, ...bunpoun3_10,
    ...bunpoun3_11, ...bunpoun3_12, ...bunpoun3_13, ...bunpoun3_14, ...bunpoun3_15,
    ...bunpoun3_16, ...bunpoun3_17, ...bunpoun3_18, ...bunpoun3_19, ...bunpoun3_20,

    // Import N2 Data
    ...bunpoun2_1, ...bunpoun2_2, ...bunpoun2_3, ...bunpoun2_4, ...bunpoun2_5,
    ...bunpoun2_6, ...bunpoun2_7, ...bunpoun2_8, ...bunpoun2_9, ...bunpoun2_10,
    ...bunpoun2_11, ...bunpoun2_12, ...bunpoun2_13, ...bunpoun2_14, ...bunpoun2_15,
    ...bunpoun2_16, ...bunpoun2_17, ...bunpoun2_18, ...bunpoun2_19, ...bunpoun2_20,

    // Import N1 Data
    ...bunpoun1_1, ...bunpoun1_2, ...bunpoun1_3, ...bunpoun1_4, ...bunpoun1_5,
    ...bunpoun1_6, ...bunpoun1_7, ...bunpoun1_8, ...bunpoun1_9, ...bunpoun1_10,
    ...bunpoun1_11, ...bunpoun1_12, ...bunpoun1_13, ...bunpoun1_14, ...bunpoun1_15,
    ...bunpoun1_16, ...bunpoun1_17, ...bunpoun1_18, ...bunpoun1_19, ...bunpoun1_20
  ];

  // PARTICLE DATA
  private particleList: Particle[] = [
    // Import N5 Data
    ...partikeln5_1, ...partikeln5_2, ...partikeln5_3, ...partikeln5_4, ...partikeln5_5,
    ...partikeln5_6, ...partikeln5_7, ...partikeln5_8, ...partikeln5_9, ...partikeln5_10,
    ...partikeln5_11, ...partikeln5_12, ...partikeln5_13, ...partikeln5_14, ...partikeln5_15,
    ...partikeln5_16, ...partikeln5_17, ...partikeln5_18, ...partikeln5_19, ...partikeln5_20,
    
    // Import N4 Data
    ...partikeln4_1, ...partikeln4_2, ...partikeln4_3, ...partikeln4_4, ...partikeln4_5,
    ...partikeln4_6, ...partikeln4_7, ...partikeln4_8, ...partikeln4_9, ...partikeln4_10,
    ...partikeln4_11, ...partikeln4_12, ...partikeln4_13, ...partikeln4_14, ...partikeln4_15,
    ...partikeln4_16, ...partikeln4_17, ...partikeln4_18, ...partikeln4_19, ...partikeln4_20,

    // Import N3 Data
    ...partikeln3_1, ...partikeln3_2, ...partikeln3_3, ...partikeln3_4, ...partikeln3_5,
    ...partikeln3_6, ...partikeln3_7, ...partikeln3_8, ...partikeln3_9, ...partikeln3_10,
    ...partikeln3_11, ...partikeln3_12, ...partikeln3_13, ...partikeln3_14, ...partikeln3_15,
    ...partikeln3_16, ...partikeln3_17, ...partikeln3_18, ...partikeln3_19, ...partikeln3_20,

    // Import N2 Data
    ...partikeln2_1, ...partikeln2_2, ...partikeln2_3, ...partikeln2_4, ...partikeln2_5,
    ...partikeln2_6, ...partikeln2_7, ...partikeln2_8, ...partikeln2_9, ...partikeln2_10,
    ...partikeln2_11, ...partikeln2_12, ...partikeln2_13, ...partikeln2_14, ...partikeln2_15,
    ...partikeln2_16, ...partikeln2_17, ...partikeln2_18, ...partikeln2_19, ...partikeln2_20,

    // Import N1 Data
    ...partikeln1_1, ...partikeln1_2, ...partikeln1_3, ...partikeln1_4, ...partikeln1_5,
    ...partikeln1_6, ...partikeln1_7, ...partikeln1_8, ...partikeln1_9, ...partikeln1_10,
    ...partikeln1_11, ...partikeln1_12, ...partikeln1_13, ...partikeln1_14, ...partikeln1_15,
    ...partikeln1_16, ...partikeln1_17, ...partikeln1_18
  ];

  // KANA DATA
  private hiraganaList: Kana[] = [
    ...hiragana_1, ...hiragana_2, ...hiragana_3, ...hiragana_4, ...hiragana_5,
    ...hiragana_6, ...hiragana_7, ...hiragana_8, ...hiragana_9, ...hiragana_10,
    ...hiragana_11, ...hiragana_12, ...hiragana_13, ...hiragana_14, ...hiragana_15,
    ...hiragana_16, ...hiragana_17, ...hiragana_18, ...hiragana_19, ...hiragana_20
  ];

  private katakanaList: Kana[] = [
    ...katakana_1, ...katakana_2, ...katakana_3, ...katakana_4, ...katakana_5,
    ...katakana_6, ...katakana_7, ...katakana_8, ...katakana_9, ...katakana_10,
    ...katakana_11, ...katakana_12, ...katakana_13, ...katakana_14, ...katakana_15,
    ...katakana_16, ...katakana_17, ...katakana_18, ...katakana_19, ...katakana_20
  ];

  getKanji(level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'ALL') {
    if (level === 'ALL') return this.kanjiList;
    return this.kanjiList.filter(k => k.level === level);
  }

  getVocab(level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'ALL') {
    if (level === 'ALL') return this.vocabList;
    return this.vocabList.filter(v => v.level === level);
  }

  getGrammar(level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') {
    return this.grammarList.filter(g => g.level === level);
  }

  getParticles(level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1') {
    return this.particleList.filter(p => p.level === level);
  }

  getKana(type: 'HIRAGANA' | 'KATAKANA', group: 'GOJUUON' | 'DAKUON' | 'HANDAKUON' | 'YOON') {
    const list = type === 'HIRAGANA' ? this.hiraganaList : this.katakanaList;
    return list.filter(k => k.group === group);
  }
}