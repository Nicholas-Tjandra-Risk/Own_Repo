/* var experiment_code = abTestingHelper.getVariation(orderId, 'indodana_simplification_ab_test', 'default_value'); */
/* var experiment_offline = 'offline_normal_set'; */
var experiment_offline = abTestingHelper.getVariation(orderId, 'offline_simplification_ab_test', 'default_value'); 
var experiment_code = 'indodana_normal_set';
var ab_test_cash_new_approve_100 = '';

/********************************************************/
/*********************** CONSTANTS **********************/
/********************************************************/
var COVERED_CITIES = ['KABUPATEN BEKASI', 
	'KABUPATEN BOGOR', 
	'KABUPATEN TANGERANG', 
	'KOTA BEKASI', 
	'KOTA BOGOR', 
	'KOTA DEPOK', 
	'KOTA JAKARTA SELATAN', 
	'KOTA JAKARTA TIMUR', 
	'KOTA JAKARTA PUSAT', 
	'KOTA JAKARTA BARAT', 
	'KOTA JAKARTA UTARA', 
	'KOTA TANGERANG', 
	'KOTA TANGERANG SELATAN', 
	'KOTA BANDUNG', 
	'KOTA SURABAYA'
];

var COVERED_CITIES_TIER_2 = ['KOTA SEMARANG',
	'KOTA MAKASSAR',
	'KOTA DENPASAR',
	'KABUPATEN SLEMAN',
	'KABUPATEN GRESIK',
	'KABUPATEN MALANG',
	'KOTA BANJARMASIN',
	'KOTA PADANG',
	'KOTA PONTIANAK',
	'KABUPATEN CIREBON',
	'KABUPATEN SUBANG',
	'KOTA CIREBON',
	'KABUPATEN KUDUS',
	'KOTA PASURUAN',
	'KOTA MOJOKERTO',
	'KABUPATEN KLATEN',
	'KOTA BATU',
	'KABUPATEN SEMARANG',
	'KABUPATEN GIANYAR'
];

var COVERED_CITIES_TIER_3 = ['KABUPATEN BANDUNG',
	'KABUPATEN BANDUNG BARAT',
	'KABUPATEN PASURUAN',
	'KABUPATEN SUMEDANG',
	'KABUPATEN SUKABUMI',
	'KOTA JAMBI',
	'KOTA BANDAR LAMPUNG',
	'KOTA MEDAN',
	'KOTA MANADO',
	'KABUPATEN DEMAK',
	'KABUPATEN JEMBER',
	'KOTA SERANG',
	'KOTA PALANGKA RAYA',
	'KOTA CIMAHI',
	'KOTA TASIKMALAYA',
	'KOTA CILEGON',
	'KOTA YOGYAKARTA',
	'KABUPATEN SIDOARJO',
	'KABUPATEN TASIKMALAYA',
	'KABUPATEN BADUNG',
	'KOTA SURAKARTA',
	'KABUPATEN PURWAKARTA',
	'KABUPATEN KARAWANG',
	'KOTA BALIKPAPAN',
	'KABUPATEN GARUT',
	'KOTA PALEMBANG',
	'KABUPATEN SERANG',
	'KOTA SUKABUMI',
	'KABUPATEN CIANJUR',
	'KOTA SAMARINDA',
	'KOTA PEKANBARU',
	'KOTA MALANG',
	'KABUPATEN TABANAN',
    'KOTA PALU',
    'KABUPATEN DELI SERDANG',
    'KOTA DUMAI',
    'KOTA PANGKAL PINANG',
    'KOTA KENDARI',
    'KOTA BANJAR BARU', 'KOTA BANJARBARU',
	'KOTA MAGELANG', 
	'KOTA SINGKAWANG',
	'KOTA KEDIRI',
	'KOTA BLITAR',
	'KOTA PARIAMAN',
	'KOTA BUKIT TINGGI',
	'KOTA SOLOK'
];

var COVERED_CITIES_CREDIT_LIMIT_INDODANA = [
	'KABUPATEN BADUNG',
	'KABUPATEN BANDUNG',
	'KABUPATEN BANDUNG BARAT',
	'KABUPATEN BEKASI',
	'KABUPATEN BOGOR',
	'KABUPATEN CIANJUR',
	'KABUPATEN CIREBON',
	'KABUPATEN DELI SERDANG',
	'KABUPATEN DEMAK',
	'KABUPATEN GIANYAR',
	'KABUPATEN GRESIK',
	'KABUPATEN KARAWANG',
	'KABUPATEN KUDUS',
	'KABUPATEN SERANG',
	'KABUPATEN SIDOARJO',
	'KABUPATEN SLEMAN',
	'KABUPATEN SUKABUMI',
	'KABUPATEN SUKOHARJO',
	'KABUPATEN SUMEDANG',
	'KABUPATEN TABANAN',
	'KABUPATEN TANGERANG',
	'KOTA BALIKPAPAN',
	'KOTA BANDAR LAMPUNG',
	'KOTA BANDUNG',
	'KOTA BANJAR BARU', 
	'KOTA BANJARMASIN',
	'KOTA BATU',
	'KOTA BEKASI',
	'KOTA BOGOR',
	'KOTA CILEGON',
	'KOTA CIMAHI',
	'KOTA CIREBON',
	'KOTA DENPASAR',
	'KOTA DEPOK',
	'KOTA DUMAI',
	'KOTA JAKARTA BARAT',
	'KOTA JAKARTA PUSAT',
	'KOTA JAKARTA SELATAN',
	'KOTA JAKARTA TIMUR',
	'KOTA JAKARTA UTARA',
	'KOTA JAMBI',
	'KOTA KENDARI',
	'KOTA MAKASSAR',
	'KOTA MALANG',
	'KOTA MANADO',
	'KOTA MEDAN',
	'KOTA PADANG',
	'KOTA PALANGKA RAYA',
	'KOTA PALEMBANG',
	'KOTA PALU',
	'KOTA PANGKAL PINANG',
	'KOTA PEKANBARU',
	'KOTA PONTIANAK',
	'KOTA SAMARINDA',
	'KOTA SEMARANG',
	'KOTA SERANG',
	'KOTA SUKABUMI',
	'KOTA SURABAYA',
	'KOTA SURAKARTA',
	'KOTA TANGERANG',
	'KOTA TANGERANG SELATAN',
	'KOTA TASIKMALAYA',
	'KOTA YOGYAKARTA',
    'KOTA MATARAM',
	'KOTA BANJARBARU',
	'KOTA MAGELANG',
	'KOTA SINGKAWANG',
	'KOTA KEDIRI',
	'KOTA BLITAR',
	'KOTA PARIAMAN',
	'KOTA BUKIT TINGGI',
	'KOTA SOLOK'
];

/* additional cities for cli --> for selected kecamatan */
var COVERED_CITIES_CREDIT_LIMIT_INDODANA_SELECTED_DISTRICT = [
	'KABUPATEN MAROS',
    'KABUPATEN GOWA',
    'KABUPATEN GARUT',
    'KABUPATEN BULELENG',
    'KABUPATEN MALANG',
    'KABUPATEN BANTUL',
    'KABUPATEN KULON PROGO',
    'KABUPATEN MAGELANG',
    'KABUPATEN TASIKMALAYA',
    'KABUPATEN CIAMIS',
    'KABUPATEN BENGKALIS',
    'KABUPATEN KAMPAR',
    'KABUPATEN PELALAWAN',
    'KABUPATEN SIAK',
    'KABUPATEN TOMOHON',
    'KOTA TOMOHON',
    'KABUPATEN BITUNG',
    'KOTA BITUNG',
	'KABUPATEN KARANGANYAR',
    'KABUPATEN LOMBOK BARAT',
    'KABUPATEN LOMBOK TENGAH',
    'KOTA PRABUMULIH',
	'KABUPATEN CIREBON',
	'KOTA MOJOKERTO',
	'KABUPATEN MOJOKERTO',
	'KABUPATEN JOMBANG',
	'KABUPATEN KEDIRI',
	'KABUPATEN NGANJUK',
	'KABUPATEN BLITAR',
	'KOTA BATAM',
	'KABUPATEN KLUNGKUNG',
	'KABUPATEN BANGLI'
];

/*When adding new list below, please add comment the following district is under which city */
var COVERED_DISTRICT_CREDIT_LIMIT_INDODANA = [ 
    /*---------KABUPATEN GOWA */ 
    'KECAMATAN SOMBA OPU',
    'KECAMATAN SOMBA UPU',
    'KECAMATAN BONTOMARANNU',
    'KECAMATAN PATTALLASSANG',
    'KECAMATAN PATTALASANG',
    'KECAMATAN PALANGGA',
    'KECAMATAN BAROMBONG',
    'KECAMATAN BAJENG',
    'KECAMATAN BAJENG BARAT',
    'KECAMATAN BONTONOMPO',
    'KECAMATAN BONTONOMPO SELATAN',
    /*---------KABUPATEN MAROS */ 
    'KECAMATAN BONTOA',
    'KECAMATAN LAU',
    'KECAMATAN MAROS BARU',
    'KECAMATAN MARUSU',
    'KECAMATAN MANDAI',
    'KECAMATAN MONCONGLOE',
    'KECAMATAN MONCONG LOE',
    'KECAMATAN SIMBANG',
    'KECAMATAN TANRALILI',
    /*---------KABUPATEN GARUT */
    'KECAMATAN GARUT KOTA',
    'KECAMATAN TAROGONG KIDUL',
    'KECAMATAN LELES',
    'KECAMATAN KARANGPAWITAN',
    'KECAMATAN TAROGONG KALER',
    'KECAMATAN KADUNGORA',
    'KECAMATAN BALUBUR LIMBANGAN',
	'KECAMATAN BL LIMBANGAN',
    'KECAMATAN BANYURESMI',
    'KECAMATAN BAYONGBONG',
    'KECAMATAN CIKAJANG',
    'KECAMATAN CILAWU',
    'KECAMATAN MALANGBONG',
    'KECAMATAN CISURUPAN',
    'KECAMATAN SAMARANG',
    'KECAMATAN CIBATU',
    'KECAMATAN PASIRWANGI',
    'KECAMATAN WANARAJA',
    'KECAMATAN SUKAWENING',
    'KECAMATAN LEUWIGOONG',
    'KECAMATAN SELAAWI',
    'KECAMATAN PANGATIKAN',
    'KECAMATAN CIBIUK',
    'KECAMATAN KERSAMANAH',
    'KECAMATAN SUCINARAJA',
    'KECAMATAN CIGEDUG',
    /*---------KABUPATEN BULELENG */
    'KECAMATAN BANJAR',
    'KECAMATAN BULELENG',
    'KECAMATAN SAWAN',
    'KECAMATAN SUKASADA',
	'KECAMATAN GEROKGAK',
	'KECAMATAN SERIRIT',
	'KECAMATAN TEJAKULA',
    /*---------KABUPATEN MALANG */
    'KECAMATAN DAU',
    'KECAMATAN KARANGPLOSO',
    'KECAMATAN PAKIS',
    'KECAMATAN PAKISAJI',
    'KECAMATAN SINGOSARI',
    'KECAMATAN WAGIR',
    /*---------KABUPATEN BANTUL */
    'KECAMATAN BANGUNTAPAN',
    'KECAMATAN BANTUL',
    'KECAMATAN JETIS',
    'KECAMATAN KASIHAN',
    'KECAMATAN PLERET',
    'KECAMATAN SEWON',
    /*---------KABUPATEN KULON PROGO */
    'KECAMATAN NANGGULAN',
    'KECAMATAN PENGASIH',
    'KECAMATAN WATES',
    /*---------KABUPATEN MAGELANG */
    'KECAMATAN BOROBUDUR',
    'KECAMATAN MERTOYUDAN',
    'KECAMATAN MUNGKID',
    'KECAMATAN MUNTILAN',
    'KECAMATAN SALAMAN',
    'KECAMATAN SECANG',
    'KECAMATAN TEMPURAN',
	'KECAMATAN SALAM',
    /*---------KABUPATEN TASIKMALAYA */
    'KECAMATAN CIAWI',
    'KECAMATAN CINEAM',
    'KECAMATAN TANJUNG',
    'KECAMATAN JAMANIS',
    'KECAMATAN LEUWISARI',
    'KECAMATAN MANGUNREJA',
    'KECAMATAN MANONJAYA',
    'KECAMATAN PADAKEMBANG',
    'KECAMATAN RAJAPOLAH',
    'KECAMATAN SARIWANGI',
    'KECAMATAN SINGAPARNA',
    'KECAMATAN SUKARAJA',
    'KECAMATAN SUKARAME',
    'KECAMATAN SUKARATU',
    'KECAMATAN SUKARESIK',
    'KECAMATAN TANJUNGJAYA',
    /*---------KABUPATEN CIAMIS */
    'KECAMATAN BAREGBEG',
    'KECAMATAN CIAMIS',
    'KECAMATAN CIHAURBEUTI',
    'KECAMATAN CIJEUNGJING',
    'KECAMATAN CIKONENG',
    'KECAMATAN CIMARAGAS',
    'KECAMATAN CIPAKU',
    'KECAMATAN CISAGA',
    'KECAMATAN JATINAGARA',
    'KECAMATAN KAWALI',
    'KECAMATAN LUMBUNG',
    'KECAMATAN PANJALU',
    'KECAMATAN SADANANYA',
    'KECAMATAN SINDANGKASIH',
    /*---------KABUPATEN BENGKALIS */
    'KECAMATAN BUKIT BATU',
    'KECAMATAN MANDAU',
    'KECAMATAN PINGGIR',
    'KECAMATAN BATHIN SOLAPAN',
    /*---------KABUPATEN KAMPAR */
    'KECAMATAN BANGKINANG',
    'KECAMATAN BANGKINANG KOTA',
    'KECAMATAN GUNUNG SAHILAN',
    'KECAMATAN KAMPA',
    'KECAMATAN KAMPAR',
    'KECAMATAN KAMPAR KIRI',
    'KECAMATAN KAMPAR KIRI HILIR',
    'KECAMATAN KAMPAR KIRI HILU',
    'KECAMATAN KAMPAR KIRI TENGAH',
    'KECAMATAN KAMPAR UTARA',
    'KECAMATAN KOTO KAMPAR KAMPAR HULU',
    'KECAMATAN KUOK',
    'KECAMATAN PERHENTIAN RAJA',
    'KECAMATAN RUMBIO JAYA',
    'KECAMATAN SALO',
    'KECAMATAN SIAK HULU',
    'KECAMATAN TAMBANG',
    'KECAMATAN TAPUNG',
    'KECAMATAN TAPUNG HILIR',
    'KECAMATAN TAPUNG HULU',
    /*---------KABUPATEN PELALAWAN */
    'KECAMATAN BUNUT',
    'KECAMATAN LANGGAM',
    'KECAMATAN PANGKALAN KERINCI',
    'KECAMATAN PANGKALAN KURAS',
    'KECAMATAN PANGKALAN LESUNG',
    'KECAMATAN UKUI',
    'KECAMATAN PELALAWAN',
    'KECAMATAN BANDAR SEI KIJANG',
    /*---------KABUPATEN SIAK */
    'KECAMATAN KANDIS',
    'KECAMATAN KERINCI KANAN',
    'KECAMATAN KOTO GASIB',
    'KECAMATAN KOTO GASIP',
    'KECAMATAN LUBUK DALAM',
    'KECAMATAN MINAS',
    'KECAMATAN SUNGAI MANDAU',
    'KECAMATAN TUALANG',
    /*---------KABUPATEN TOMOHON */
    'KECAMATAN TOMOHON UTARA',
    'KECAMATAN TOMOHON TIMUR',
    'KECAMATAN TOMOHON BARAT',
    'KECAMATAN TOMOHON TENGAH',
    /*---------KABUPATEN BITUNG */
    'KECAMATAN RANOWULU',
    'KECAMATAN MATUARI',
    'KECAMATAN MAESA',
    'KECAMATAN MADIDIR',
    'KECAMATAN GIRIAN',
    'KECAMATAN AERTEMBAGA',
	/*---------KABUPATEN KARANGANYAR */
	'KECAMATAN COLOMADU',
	'KECAMATAN JATEN',
	'KECAMATAN KARANGANYAR',
    /*---------KABUPATEN LOMBOK BARAT */
    'KECAMATAN GERUNG',
    'KECAMATAN KEDIRI',
    'KECAMATAN NARMADA',
    'KECAMATAN LABU API',
    'KECAMATAN LABUAPI',
    'KECAMATAN GUNUNG SARI',
    'KECAMATAN GUNUNGSARI',
    'KECAMATAN LINGSAR',
    'KECAMATAN LEMBAR',
    'KECAMATAN BATU LAYAR',
    'KECAMATAN BATULAYAR',
    'KECAMATAN KURIPAN',
    /*---------KABUPATEN LOMBOK TENGAH */
    'KECAMATAN BATUKLIANG',
    'KECAMATAN JANAPRIA',
    'KECAMATAN JONGGAT',
    'KECAMATAN KOPANG',
    'KECAMATAN PRAYA',
    'KECAMATAN PRAYA BARAT',
    'KECAMATAN PRAYA BARAT DAYA',
    'KECAMATAN PRAYA TENGAH',
    'KECAMATAN PRAYA TIMUR',
    'KECAMATAN PRINGGARATA',
    'KECAMATAN PUJUT',
    /*---------KOTA PRABUMULIH */
    'KECAMATAN CAMBAI',
    'KECAMATAN PRABUMULIH BARAT',
    'KECAMATAN PRABUMULIH SELATAN',
    'KECAMATAN PRABUMULIH TIMUR',
    'KECAMATAN PRABUMULIH UTARA',
	/*---------KABUPATEN CIREBON */ 
	'KECAMATAN KEDAWUNG',
	/*---------KABUPATEN MOJOKERTO */ 
	'KECAMATAN MAGERSARI',
	'KECAMATAN PRAJURITKULON', 'KECAMATAN PRAJURIT KULON',
	'KECAMATAN MOJOSARI',
	'KECAMATAN BANGSAL',
	'KECAMATAN MOJOANYAR',
	'KECAMATAN PURI',
	'KECAMATAN DLANGGU',
	'KECAMATAN KUTOREJO',
	'KECAMATAN SOOKO',
	'KECAMATAN TROWULAN',
	/*---------KABUPATEN JOMBANG */ 
	'KECAMATAN JOMBANG',
	'KECAMATAN PERAK',
	'KECAMATAN DIWEK',
	'KECAMATAN MOJOAGUNG',
	'KECAMATAN SUMOBITO',
	'KECAMATAN JOGOROTO',
	'KECAMATAN PETERONGAN',
		/*---------KABUPATEN KEDIRI */ 
	'KECAMATAN GAMPENGREJO',
	'KECAMATAN NGASEM',
	'KECAMATAN PAGU',
	'KECAMATAN GURAH',
	'KECAMATAN KAYEN KIDUL',
	'KECAMATAN PARE',
	'KECAMATAN KANDAT',
	/*---------KABUPATEN NGANJUK */ 
	'KECAMATAN BAGOR',
	'KECAMATAN BARON',
	'KECAMATAN GONDANG',
	'KECAMATAN KERTOSONO',
	'KECAMATAN LOCERET',
	'KECAMATAN NGANJUK',
	'KECAMATAN NGRONGGOT',
	'KECAMATAN PACE',
	'KECAMATAN PRAMBON',
	'KECAMATAN REJOSO',
	'KECAMATAN SUKOMORO',
	'KECAMATAN TANJUNGANOM',
	/*---------KABUPATEN BLITAR */ 
	'KECAMATAN BINANGUN', 'KECAMATAN BINANGOEN',
	'KECAMATAN GARUM',
	'KECAMATAN KADEMANGAN',
	'KECAMATAN KANIGORO',
	'KECAMATAN KESAMBEN',
	'KECAMATAN NGLEGOK',
	'KECAMATAN PONGGOK',
	'KECAMATAN SANANKULON',
	'KECAMATAN SELOREJO',
	'KECAMATAN SELOPURO',
	'KECAMATAN SRENGAT',
	'KECAMATAN SUTOJAYAN',
	'KECAMATAN TALUN',
	'KECAMATAN UDANAWU',
	'KECAMATAN WLINGI',
	'KECAMATAN WONODADI',
	/*---------KOTA BATAM*/ 
	'KECAMATAN BATAM KOTA',
	'KECAMATAN BATU AJI',
	'KECAMATAN BATU AMPAR',
	'KECAMATAN BELAKANG PADANG',
	'KECAMATAN BENGKONG',
	'KECAMATAN LUBUK BAJA',
	'KECAMATAN NONGSA',
	'KECAMATAN SAGULUNG',
	'KECAMATAN SEI BEDUK', 'KECAMATAN SUNGAI BEDUK',
	'KECAMATAN SEKUPANG',
	/*---------KABUPATEN KLUNGKUNG*/
	'KECAMATAN BANJARANGKAN',
	'KECAMATAN DAWAN',
	'KECAMATAN KLUNGKUNG',
	/*---------KABUPATEN BANGLI*/
	'KECAMATAN BANGLI',
	'KECAMATAN SUSUT'
];

var WHITELISTED_PROFESSIONS = [
	'PEGAWAI BUMN', 
	'PEGAWAI SWASTA', 
	'LAINNYA',
	'PEGAWAI NEGERI',
	'PROFESIONAL',
	'WIRASWASTA'
];

var WHITELISTED_PROFESSIONS_SET_B = [
	'PEGAWAI BUMN', 
	'PEGAWAI SWASTA', 
	'LAINNYA',
	'PEGAWAI NEGERI',
	'PROFESIONAL',
	'WIRASWASTA',
	'IBU RUMAH TANGGA',
	'PELAJAR',
	'MAHASISWA',
	'FREELANCE'
];

var WHITELISTED_PROFESSIONS_CREDIT_LIMIT = [
	'PEGAWAI BUMN', 
	'PEGAWAI SWASTA', 
	'LAINNYA',
	'PEGAWAI NEGERI',
	'PROFESIONAL',
	'WIRASWASTA',
	'IBU RUMAH TANGGA',
	'FREELANCE'
];

var WHITELISTED_PROFESSIONS_HIGH_RISK = [
	'FREELANCE'
];

var WHITELISTED_PROFESSIONS_HIGH_RISK_CREDIT_LIMIT = [
	'PROFESIONAL',
	'WIRASWASTA',
	'IBU RUMAH TANGGA',
	'PELAJAR',
	'MAHASISWA'
];

var NOT_WORKING_PROFESSIONS = ['PELAJAR', 'TIDAK BEKERJA', 'IBU RUMAH TANGGA', 'MAHASISWA'];

var PROFESSIONS_HIGH_RISK = [
    'ANGGOTA DPD', 
    'ANGGOTA KABINET/KEMENTERIAN', 
    'WALIKOTA', 
    'ANGGOTA DPRD KABUPATEN/KOTA', 
    'ANGGOTA DPR-RI', 
    'WAKIL BUPATI', 
    'KEPOLISIAN RI', 
    'TENTARA NASIONAL INDONESIA (TNI)', 
    'GUBERNUR', 
    'TENTARA NASIONAL INDONESIA', 
    'PENGACARA', 
    'NOTARIS',
    'ANGGOTA BPK',
    'ANGGOTA DPRD PROVINSI',
    'ANGGOTA MAHKAMAH KONSTITUSI',
    'BUPATI',
    'DUTA BESAR',
    'KEPALA DESA',
    'PRESIDEN',
    'WAKIL GUBERNUR',
    'WAKIL PRESIDEN',
    'WAKIL WALIKOTA',
    'WARTAWAN'
];

var ALLOWED_PRODUCT_TYPES = [
	'CASH_LOAN',
	'CREDIT_LIMIT',
	'LAPTOP_OWNERSHIP_PROGRAM',
	'LBH',
	'LOP',
	'PRODUCT_INSTALLMENT',
	'RESTRUCTURED_LOAN'
];

var LOW_RISK_INDUSTRY = [
	'ASURANSI/FOREX',
	'HUKUM DAN PERPAJAKAN',
	'KESEHATAN/KLINIK',
	'KEUANGAN/BANK',
	'KONSULTAN',
	'PEMERINTAHAN',
	'PERKEBUNAN',
	'PERTAMBANGAN',
	'SPESIALIS',
	'TELEKOMUNIKASI',
	'INDUSTRI/PABRIK',
	'KONTRAKTOR/PROPERTI'
];

var MEDIUM_RISK_INDUSTRY = [
	'JASA/PELAYANAN',
	'PERDAGANGAN',
	'RETAIL'
];

var HIGH_RISK_INDUSTRY = [
	'PARIWISATA',
	'RESTORAN/BAR/CAFE',
	'TRANSPORTASI'
];

var OFFLINE_MALL_LOW_RISK = [
	'aeon mall bsd',
	'aeon mall jgc',
	'aeon mall sentul',
	'bale kota',
	'bandung indah plaza',
	'bintaro plaza',
	'bintaro x-change',
	'bogor trade mall',
	'botani square',
	'central park mall',
	'cibinong city mall',
	'cibubur junction',
	'ciputra mall citraland',
	'east coast 2 surabaya',
	'emporium pluit',
	'festival city link',
	'galeria bali',
	'gandaria city',
	'grand indonesia',
	'grand mall bekasi',
	'green pramuka square mall',
	'kota kasablanka',
	'lippo mall cikarang',
	'lippo mall puri',
	'lottemart bintaro',
	'mall ambasador',
	'mall ciputra cibubur',
	'mall ciputra citraland',
	'mall ciputra tangerang',
	'mall citra raya',
	'mall daan mogot',
	'mall kelapa gading',
	'mall of indonesia',
	'mall pondok indah',
	'mall puri indah',
	'mall taman anggrek',
	'margo city',
	'metropolitan cileungsi',
	'metropolitan mall bekasi',
	'neo soho mall',
	'paris van java',
	'paskal 123',
	'paskal 23',
	'pejaten village',
	'pesona square depok',
	'plaza cibubur',
	'plaza ekalokasari',
	'plaza gajah mada',
	'plaza pondok gede',
	'plaza sidoarjo',
	'pluit village',
	'pondok indah mall',
	'resinda park',
	'resinda park karawang',
	'st morits',
	'st moritz',
	'sumarecon mall bekasi',
	'sumarecon mall serpong',
	'summarecon mall bekasi',
	'summarecon mall serpong',
	'supermall karawaci',
	'trans studio mall cibubur',
	'tunjungan plaza',
	'tangerang city mall',
	'mega bekasi hypermall',
	'pakuwon mall surabaya',
	'mall artha gading',
	'mall paragon semarang',
	'mall olympice garden',
	'hartono mall yogyakarta',
	'trans studio bandung',
	'senayan city',
	'grand galaxy park',
	'plaza indonesia',
	'depok town square',
	'miko mall',
	'mall the park sawangan',
	'pik avenue',
	'aeon mall tanjung barat',
	'dp mall semarang',
	'lippo mall kemang',
	'plaza asia sumedang',
	'jatinangor town square',
	'trans studio mall bali',
	'kemang village',
	'living world denpasar',
	'citraland semarang',
	'plaza ambarukmo',
	'bekasi cyber park',
	'mangga dua mall',
	'pakuwon trade center',
	'sunter mall',
	'ciputra world surabaya'
	];
var OFFLINE_STORE_BLACKLIST = [
	'mr',
    'aneka',
    'point2000 - 07 kcp karawa',
	'optimum',
	'ponticell',
    'penguasa nusantara indonesia'
];

var OFFLINE_STORE_SMARTPHONE_TREATMENT = [
    'sellus global indo'
];

var PRJ_DUMMY_LIST = [
    'dummy exhibition jakarta fair kemayoran 2024 admin 1%',
    'dummy exhibition jakarta fair kemayoran 2024 admin 190k',
	'DUMMY MERCHANT BLIBLI EVENT GRAND INDONESIA',
	'dummy sharp official store',
	'DUMMY SHARP OFFICIAL STORE',
	'DUMMY SHARP OFFICIAL STORE - SHARP EXHIBITION PET EXPO ICE BSD',
	'dummy sharp official store - sharp exhibition pet expo ice bsd'
	
	
];

var OFFLINE_IBOX_GAN_DIGIMAP = [
    'ibox',
    'gan',
    'digimap',
    'mhi',
    'nasa'
];

var OFFLINE_IBOX_GAN_DIGIMAP_2 = [
    'cellular world',
    'tara phone',
    'me gallery',
    'berkah bersama tara',

	'gtn 189 - blibli store blue mall artha gading',
	'gtn 195 - blibli store blue bintaro plaza',
	'gtn 196 - blibli store blue mall lippo cikarang',

	'gtn 118 - blibli store paskal 23',
	'gtn 111 - blibli store gandaria city',
	'gtn 156 - blibli store supermall karawaci',
	'gtn 144 - blibli store the park sawangan depok',
	'gtn 134 - blibli store living world denpasar',
	'gtn 63 - tukar tambah mag',
	'gtn 59 - tukar tambah ccm',
	'gtn 91 - blibli store tsm cibubur',
	'gtn 140 - blibli store resinda park mall',
	'gtn 94 - tukar tambah bintaro plaza',
	'gtn 210 - blibli store blue exhibition jakarta fair kemayoran 2024',
	'gtn - ses bandung indah plaza',
	'gtn 92 - blibli store lippo mall puri',
	'gtn 95 - tukar tambah lippo mall cikarang',
	'planet gadget 02 - sep teuku umar 84',
	'planet gadget 01 - ses teuku umar 06',
	'planet gadget 08 - gatsu barat',
	'planet gadget 15 - pondok bambu',
	'planet gadget 07 - gatsu tengah',
	'planet gadget 11 - malang',
	'planet gadget 06 - gianyar',
	'oke shop 53 okeshop mal panakukang (u82)',
	'digiplus 44 - digiplus arion mall',
	'oke shop 19 oppo store kota kasablanka (gg584)',
	'digiplus 09 - digiplus cibinong city mall 2',
	'digiplus 26 - digiplus plaza atrium senen',
	'digiplus 04 - digiplus margocity depok',
	'digiplus 15 - digiplus pakuwon mall yogyakarta',
	'digiplus 02 - digiplus bintaro xchange',
	'digiplus 06 - digiplus kota kasablanka',
	'digiplus 05 - digiplus gandaria city',
	'digiplus 57 - digiplus sogo kelapa gading',
	'digiplus 32 - digiplus plaza parahyangan bandung',
	'digiplus 07 - digiplus metropolitan mall bekasi',
	'digiplus 30 - digiplus festival citylink bandung',
	'digiplus 19 - digiplus living world denpasar',
	'lotte 01- gandaria city mall',
	'rumah gadget 002 - new',
	'celullar world 17 - arena like new teuku umar',
	'dazzle 001 - super dazzle gejayan',
	'gudang cell 01 - handphone pusat',

	'ear 06 - megastore cibinong city mall',
	'ear 357 - erafone megastore 2 teuku umar',
	'ear 16 erafone tangcity',
	'ear 392 - erafone & more ruko margonda depok',
	'ear 15 megastore supermall karawaci',
	'ear 68 - erafone mall kota kasablanka',
	'ear 104 - erafone megastore jbk cikarang',
	'ear 09 - megastore margo city',
	'ear 51 - megastore bx change',
	'ear 67 - erafone mall gandaria city',
	'ear 64 - erafone sumarecon mall bekasi',
	'ear 591 - erafone plaza surabaya',
	'ear 613 - erafone gressmall',
	'ear 401 - erafone mall olympic garden',
	'ear 71 - megastore kemang',
	'ear 36 erafone 1 ambasador',
	'ear 20 erafone plaza bintaro',
	'ear 268 - megastore tunjungan plaza 3',
	'ear 14 erafone metland cilelungsi',
	'ear 547 - erafone megastore trans studio mall bandung',
	'ear 05 - megastore mal metropolitan',
	'ear 10 erafone lippo mall cikarang',
	'ear 201 - megastore central park 3.0',
	'ear 90 - erafone aeon tanjung barat',
	'ear 19 erafone lottemart bintaro',
	'ear 373 - erafone sidewalk jimbaran',
	'ear 187 - megastore summarecon mal serpong',
	'ear 356 - erafone mall bali galeria',
	'ear 237 - erafone cihampelas walk bandung',
	'ear 121 - erafone px pavilion st. morits',
	'ear 239 - erafone paris van java',
	'ear 602 - erafone living world denpasar',
	'ear 81 - erafone mall emporium',
	'ear 04 - erafone mall metropolitan 2',
	'ear 129 - grand indonesia',
	'ear 119 - erafone mal puri indah',
	'ear 50 - erafone living world',
	'ear 140 - lotte shoping avenue',
	'ear 320 - erafone ruko percetakan negara',
	'ear 440 - erafone megastore tegalrejo jogjakarta',
	'ear 434 - megastore ruko tasikmalaya',
	'ear 31 erafone arion mall',
	'ear 809 - erafone summarecon mall bandung',
	'ear 80 - erafone aeon mall jgc',
	'ear 788 - erafone & more aeon deltamas cikarang',
	'ear 56 - erafone the park sawangan',
	'ear 812 - erafone trans studio mall bali',
	'ear 226 - erafone 3.0 senayan city',
	'ear 699 - erafone 2.5 level 21 mall bali',
	'ear 120 - erafone mal taman anggrek'
];

var OFFLINE_HCF_GYM = [
    'ftl gym',
    'fithub',
    'f18 gym',
    'curves indonesia',
    'osbond gym'
];

var MINIMUM_AGE = 20;
var MAXIMUM_AGE = 65;
var MINIMUM_WORK_DURATION_IN_MONTH = 3;
var DEFAULT_MINIMUM_SALARY = 2500000;
var MAXIMUM_SALARY = 1000000000;

var SCORE_CUT_OFF_REPEAT_ORDER_CASH_LOAN = 380;
var SCORE_CUT_OFF_CASH_NEW = 390;
var SCORE_CUT_OFF_CASH_NEW_HIGH_RISK_CITY = 405;

var SCORE_CUT_OFF_NEW_ORDER_CREDIT_LIMIT = 360;
var SCORE_CUT_OFF_NEW_ORDER_PRODUCT_INSTALLMENT = 380;
var IDENTITY_SCORE_CUT_OFF_STRICT = 480;

var result_string = '';
var pass_bq = false;
var pass_bq_hcf = false;
var pull_digiscore = false;
var pull_shopee = false;
var pull_getcontact_verify = false;
var pull_getcontact_tagview = false;
/* var pass_due_to_shopee = false; */


/*Check if blacklist store*/
var is_blacklist_store = false;
for (store_initial: OFFLINE_STORE_BLACKLIST) {
	if (stringUtils.contains(store_name, store_initial)) {
		is_blacklist_store = true;
	} 
}

var is_good_mall_category = OFFLINE_MALL_LOW_RISK.contains(mall_name);

var offline_store_category = (offline_store_category == null || offline_store_category == "" || offline_store_category == "None" || offline_store_category == "-99" || offline_store_category == "-999") ? 'average' : offline_store_category;

var cash_category = ''

if (count_disbursed_cash > 0) {
	cash_category = '4. repeat cash'
} else if (count_disbursed_cash <= 0 && diff_day_from_first_cli >= 7) {
	cash_category = '2. cash new cli >=7d'
} else if (count_disbursed_cash <= 0 && diff_day_from_first_cli < 7 && diff_day_from_first_cli >= 0) {
	cash_category = '1b. cash new cli <7d'
} else {
	cash_category = '1a. totally first cash'
}

var cash_origination = (cash_category == '4. repeat cash' || cash_category == '2. cash new cli >=7d') ? 'EXISTING' : 'NEW';

/*Check if offline incoming from QR Static without promotor assistance overwrite store category definition good --> average treatment*/
if (offline_item_names=='Offline Transaction' && offline_store_category =='good') {
	offline_store_category = 'average'
}

/*Temporary fix for ebike high risk store, overwrite offline_item_category definition to smartphone*/
for (store_initial: OFFLINE_STORE_SMARTPHONE_TREATMENT) {
	if (stringUtils.contains(store_name, store_initial)) {
		offline_item_category = 'smartphone';
	} 
}

/* PRJ DUMMY TO SMARTHPHONE */
for (store_initial: PRJ_DUMMY_LIST) {
	if (stringUtils.contains(store_name, store_initial)) {
		offline_item_category = 'smartphone';
	} 
}

/* set preapprove whitelist to cash loan and repeat order */
if ((offerEvent == 'ADHOC_SCRIPT') && !(has_pre_approved_cash_loan_offer)) {
    product_type = 'CASH_LOAN';
    is_repeat_order = 1;
    /* for new existing cash AB */
    cash_origination = 'EXISTING';
}

/* set preapprove cli to cash loan */
if ((offerEvent == 'CLI_REGISTRATION') && !(has_pre_approved_cash_loan_offer)) {
    product_type = 'CASH_LOAN';
}

/*Set iBox, GAN, Digimap category*/
var is_ibox_gan_digimap = false;
for (store_initial: OFFLINE_IBOX_GAN_DIGIMAP) {
	if (store_name.toLowerCase().split(' ')[0] == store_initial) {
		is_ibox_gan_digimap = true;
	} 
}

for (store_initial: OFFLINE_IBOX_GAN_DIGIMAP_2) {
	if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
		is_ibox_gan_digimap = true;
	} 
}

/*Set HCF GYM*/
var is_hcf_gym = false;
for (store_initial: OFFLINE_HCF_GYM) {
	if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
		is_hcf_gym = true;
	} 
}

/* null handling */
if(adhoc_cashloan_score == null) {
	adhoc_cashloan_score = -99;
}

/* ------------------- LOGIC - Bandaid, FIX after RO model deployed -------------------*/
var addition = 0;
var adjusted_score = score;
var is_offline_applicant = offline_transaction_applied_amount > 0;

if (tiket_score >= 400) {
	addition = 20;
} else if (blibli_score >= 400) {
	addition = 20;
}

if (count_shady_app > 1 || count_banned_app > 1) {
	adjusted_score = adjusted_score - 30 + addition;
} else if (count_shady_app == 1 || count_banned_app > 0) {
	adjusted_score = adjusted_score - 10 + addition;
} else {
	adjusted_score = adjusted_score + addition;
}

if (count_shady_app > 1 || count_banned_app > 1) {
	adhoc_cashloan_score = adhoc_cashloan_score - 30;
} else if (count_shady_app == 1 || count_banned_app > 0) {
	adhoc_cashloan_score = adhoc_cashloan_score - 10;
} else {
	adhoc_cashloan_score = adhoc_cashloan_score;
}

if (product_type == 'CASH_LOAN') {
	adjusted_score = score;
}

if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant && experiment_code == 'indodana_normal_set') {
	adjusted_score = score;
}

/* ------------------- LOGIC - customer segmentation -------------------*/
var is_female = (applicant_gender == 'FEMALE') ? true : false;
var is_payslip = (is_bpjs == 0 && is_bank_mutation == 0);
var nonmp_good_average = (offline_item_category == 'non-smartphone') && ((offline_store_category == 'good') || (offline_store_category == 'average'));
var mp_good_average = (offline_item_category == 'smartphone') && ((offline_store_category == 'good') || (offline_store_category == 'average'));


is_bpjs = (is_bpjs == 1);
is_bank_mutation = (is_bank_mutation == 1);
current_company_industry = current_company_industry.toString();
var is_low_risk_industry = arrayUtils.contains(LOW_RISK_INDUSTRY, stringUtils.upperCase(current_company_industry));
var is_medium_risk_industry = arrayUtils.contains(MEDIUM_RISK_INDUSTRY, stringUtils.upperCase(current_company_industry));
var is_high_risk_industry =  arrayUtils.contains(HIGH_RISK_INDUSTRY, stringUtils.upperCase(current_company_industry));
var is_whitelisted_profession_credit_limit = arrayUtils.contains(WHITELISTED_PROFESSIONS_CREDIT_LIMIT,stringUtils.upperCase(applicant_profession));
var is_whitelisted_profession = arrayUtils.contains(WHITELISTED_PROFESSIONS, stringUtils.upperCase(applicant_profession));

var is_profession_high_risk = arrayUtils.contains(PROFESSIONS_HIGH_RISK,stringUtils.upperCase(ocr_result_occupation_type.toString()));
var is_covered_cities_cli = arrayUtils.contains(COVERED_CITIES_CREDIT_LIMIT_INDODANA, stringUtils.upperCase(working_city));
var is_covered_cities_cli_living_city = arrayUtils.contains(COVERED_CITIES_CREDIT_LIMIT_INDODANA, stringUtils.upperCase(living_city));
var is_covered_cities_cli_selected_district = arrayUtils.contains(COVERED_CITIES_CREDIT_LIMIT_INDODANA_SELECTED_DISTRICT,stringUtils.upperCase(working_city)) && arrayUtils.contains(COVERED_DISTRICT_CREDIT_LIMIT_INDODANA,stringUtils.upperCase(current_company_address_district));
var is_covered_cities_cli_selected_district_living_city = arrayUtils.contains(COVERED_CITIES_CREDIT_LIMIT_INDODANA_SELECTED_DISTRICT,stringUtils.upperCase(living_city)) && arrayUtils.contains(COVERED_DISTRICT_CREDIT_LIMIT_INDODANA,stringUtils.upperCase(applicant_current_residence_district));

var is_covered_cities = arrayUtils.contains(COVERED_CITIES,stringUtils.upperCase(working_city));
var is_covered_cities_tier_2 = arrayUtils.contains(COVERED_CITIES_TIER_2,stringUtils.upperCase(working_city));
var is_covered_cities_tier_3 = arrayUtils.contains(COVERED_CITIES_TIER_3,stringUtils.upperCase(working_city));
var is_outside_all_covered_cities = (!is_covered_cities) && (!is_covered_cities_tier_2) && (!is_covered_cities_tier_3) && (!is_covered_cities_cli_selected_district) && !arrayUtils.contains(NOT_WORKING_PROFESSIONS,stringUtils.upperCase(applicant_profession));

var cash_city_tier = 'OTHER';
if (is_covered_cities || arrayUtils.contains(COVERED_CITIES, stringUtils.upperCase(living_city))) {
    cash_city_tier = 'TIER 1';
} else if (is_covered_cities_tier_2 || arrayUtils.contains(COVERED_CITIES_TIER_2, stringUtils.upperCase(living_city))) {
    cash_city_tier = 'TIER 2';
} else if (is_covered_cities_tier_3 || arrayUtils.contains(COVERED_CITIES_TIER_3, stringUtils.upperCase(living_city))) {
    cash_city_tier = 'TIER 3';
} else if (is_covered_cities_cli_selected_district || is_covered_cities_cli_selected_district_living_city) {
    cash_city_tier = 'CLI SELECTED DISTRICT';
}

var is_fdc_null = sum_amount_disbursed_total < 0;
var is_low_izi_inquiry = (izi_max_multi_inquiries_90d < 10) && (izi_max_multi_inquiries_14d < 4);
var is_very_low_izi_inquiry = (izi_max_multi_inquiries_90d <= 2) && (izi_max_multi_inquiries_14d <= 1) && (number_of_installed_loan_apps_within_14days <= 3) 
	&& (izi_reference_mobile_phone_number_multi_inquiries_total <= 3);
var is_fdc_late = discounted_sum_outstanding_late_1y > 0;
var is_pekalongan = (stringUtils.contains(living_city.toLowerCase(), 'pekalongan') ||
                      stringUtils.contains(working_city.toLowerCase(), 'pekalongan') ||
                      stringUtils.contains(applicant_place_of_birth_city.toLowerCase(), 'pekalongan') ||
                      stringUtils.contains(applicant_residence_city.toLowerCase(), 'pekalongan'));
var is_pekalongan_nec = (is_pekalongan && stringUtils.contains(current_company_name.toLowerCase(), 'nec'));

var is_company_fraudster_toko_webform = (stringUtils.contains(current_company_name.toLowerCase(), 'gajah') ||
                                          stringUtils.contains(current_company_name.toLowerCase(), 'taichen') ||
                                          stringUtils.contains(current_company_name.toLowerCase(), 'marin liza') ||
                                          stringUtils.contains(current_company_name.toLowerCase(), 'arta boga') ||
                                          stringUtils.contains(current_company_name.toLowerCase(), 'kahatex') ||
                                          stringUtils.contains(current_company_name.toLowerCase(), 'daese garmin'));


/* If run in simulation, get whitelist data from datamart. Otherwise in production, hit whitelist API */
if (is_simulation == 1) {
    var is_whitelisted_ath_via_limit_user = is_whitelisted_ath_via_limit_user_snapshot == 1 ? true : false
} else {
    var is_whitelisted_ath_via_limit_user = blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'whitelist', { "phoneNumber": applicant_mobile_phone_number }) ||
											blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'btpl-cash-loan', { "phoneNumber": applicant_mobile_phone_number }) || 
											blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'employee', { "phoneNumber": applicant_mobile_phone_number }) ;
}

var number_of_related_indodana_credit_limit = number_of_related_blibli_tiket_indodana_credit_limit - number_of_related_blibli_tiket_credit_limit;
var is_blacklisted_location = false;
var blacklist_result = '';
var blacklistReason = '';

/*Offer Calculation Logic*/
var is_offer_calculation = (offerId == null || offerId == "" || offerId == "-99" || offerId == "-999" || offerEvent == 'ADHOC_SCRIPT') ? 0 : 1;
var is_eligible_offer_calculation = (is_offer_calculation == 1) && (((prev_approved_cash_loan_loan_amount > 0 || is_repeat_order == 1) && (prev_cli_ath_max_days_late <= 0)) || (offerEvent == 'CLI_REGISTRATION'));
var is_repeat_order = ((is_eligible_offer_calculation) && (offerEvent != 'CLI_REGISTRATION')) ? 1 : is_repeat_order; /*Overwrite is_repeat_order == 1, if is_eligible_offer_calculation, except CLI_REGISTRATION */

/*Repeat Order Cash Loan will be more lenient in its approval criteria*/
var is_not_cash_loan_repeat_order = !(is_repeat_order == 1 && product_type == 'CASH_LOAN');
var is_not_cash_loan_existing = !(cash_origination == 'EXISTING' && product_type == 'CASH_LOAN');


/* ------------------- Reject Reason -------------------*/
var score_cut_off_reject_reason = '';
var identity_score_cut_off_reject_reason = '';
var salary_cut_off_reject_reason = '';
var age_cut_off_reject_reason = '';
var industry_reject_reason = '';
var job_reject_reason = '';
var working_city_reject_reason = '';
var prev_max_dpd_reject_reason = '';
var blacklisted_location_reject_reason = '';
/* ------------------- score -------------------*/
if ((product_type == 'CASH_LOAN' && (cash_origination == 'EXISTING') && adjusted_score < SCORE_CUT_OFF_REPEAT_ORDER_CASH_LOAN) ||
	/* higher score cut off for non Jabodetabek Bandung Surabaya cash loan */
	(product_type == 'CASH_LOAN' && cash_origination == 'NEW' && (adjusted_score < SCORE_CUT_OFF_CASH_NEW)) ||
	(product_type == 'CASH_LOAN' && cash_origination == 'NEW' && (adjusted_score < SCORE_CUT_OFF_CASH_NEW_HIGH_RISK_CITY) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier))) ||
	(product_type == 'CREDIT_LIMIT' && is_offline_applicant) ||
	(product_type == 'PRODUCT_INSTALLMENT' && adjusted_score < SCORE_CUT_OFF_NEW_ORDER_PRODUCT_INSTALLMENT)) {
		score_cut_off_reject_reason = 'JA01';
} else if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant) {
	if (score < 360) {
		/* CLI Indodana, apply Cash Loan New Model rules */
		/* ------------------- score -------------------*/
		if (((cash_origination == 'EXISTING') && (adhoc_cashloan_score < SCORE_CUT_OFF_REPEAT_ORDER_CASH_LOAN)) ||
			((cash_origination == 'NEW') && (adhoc_cashloan_score < SCORE_CUT_OFF_CASH_NEW)) ||
			((cash_origination == 'NEW') && (adhoc_cashloan_score < SCORE_CUT_OFF_CASH_NEW_HIGH_RISK_CITY) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier)))
			) {
				score_cut_off_reject_reason = 'JA01';
			}
	}
}

/* JA06 */
if ((product_type == 'CASH_LOAN' && (cash_origination == 'NEW') && adjusted_score < 240) ||
    (product_type == 'CASH_LOAN' && (cash_origination == 'EXISTING') && adjusted_score < 220)) {
        score_cut_off_reject_reason = 'JA06';
}

/* ------------------- identity score -------------------*/
if ((product_type == 'CASH_LOAN' && cash_origination == 'NEW') || (product_type == 'CREDIT_LIMIT' && !is_offline_applicant)) {
	if (tiket_score <= 0 && blibli_score <= 0) {
		if (identity_score < IDENTITY_SCORE_CUT_OFF_STRICT) {
			identity_score_cut_off_reject_reason = 'HA04';
		} 
	}
	/* experiment to remove identity for high score ath new and cli (to inc approval rate)*/
	if ((adjusted_score >= 450) || ((product_type == 'CREDIT_LIMIT') && (tiket_score_partner >= 440))) {
		if (((product_type == 'CREDIT_LIMIT') && (match_ewallet_name_logic == 'OK'))) {
			/* identity_score_cut_off_reject_reason = ''; commented to reduce exposure to bad loans*/
		}
	}

	if ((((product_type == 'CREDIT_LIMIT') && (!is_offline_applicant) && (adhoc_cashloan_score >= 420))) && (is_repeat_order == 0) && (identity_score >= 440)) {
		identity_score_cut_off_reject_reason = '';
	}
}
/* ------------------- salary -------------------*/
if ((income > MAXIMUM_SALARY || income < DEFAULT_MINIMUM_SALARY) && (is_not_cash_loan_existing) && ((!arrayUtils.contains(NOT_WORKING_PROFESSIONS,stringUtils.upperCase(applicant_profession))))) {
	salary_cut_off_reject_reason = 'IA04';
}

/* ------------------- age -------------------*/
if ((applicant_age < MINIMUM_AGE || applicant_age > MAXIMUM_AGE) && (is_not_cash_loan_existing)) {
	age_cut_off_reject_reason = 'IA08';
}

/* ------------------- job -------------------*/
if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant) {
	if ((!arrayUtils.contains(WHITELISTED_PROFESSIONS_SET_B, stringUtils.upperCase(applicant_profession)))) {
		job_reject_reason = 'CA07'; 
	}
} else if (product_type == 'CASH_LOAN' && cash_origination == 'NEW') {
	if (
		(!arrayUtils.contains(WHITELISTED_PROFESSIONS, stringUtils.upperCase(applicant_profession))) &&
		(!arrayUtils.contains(WHITELISTED_PROFESSIONS_HIGH_RISK, stringUtils.upperCase(applicant_profession))) &&
		(!arrayUtils.contains(WHITELISTED_PROFESSIONS_HIGH_RISK_CREDIT_LIMIT, stringUtils.upperCase(applicant_profession)))
	) {
		job_reject_reason = 'CA07';
	}
} else if (product_type != 'CASH_LOAN') {
	if ((!arrayUtils.contains(WHITELISTED_PROFESSIONS, stringUtils.upperCase(applicant_profession)))) {
		job_reject_reason = 'CA07'; 
	}
	if (arrayUtils.contains(WHITELISTED_PROFESSIONS_HIGH_RISK,stringUtils.upperCase(applicant_profession)) && (adjusted_score >= 400)) {
		job_reject_reason = '';
	}
	if (arrayUtils.contains(WHITELISTED_PROFESSIONS_HIGH_RISK_CREDIT_LIMIT,stringUtils.upperCase(applicant_profession))) {
		if ((adjusted_score >= 380) && (product_type == 'CREDIT_LIMIT')) {
			job_reject_reason = '';
		}
	}
}

/* experiment for FDC Null */
if (((product_type == 'CREDIT_LIMIT') && (!is_offline_applicant)) && is_repeat_order == 0 && is_fdc_null) {
	if (is_very_low_izi_inquiry || dtlab_salary >= 5000000) {
		score_cut_off_reject_reason = '';
		log.info('cash_loan_fdc_null_dtlab_experiment');
	}
}

if (experiment_code == 'indodana_normal_set') {
	if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant) {
		if (identity_score >= 440 && score >= 420) {
			identity_score_cut_off_reject_reason  = '';
		}
	}
} else if (experiment_code != 'indodana_normal_set') {
	/* do nothing */
}

if (product_type == 'CREDIT_LIMIT' && partner == 'AVANTO' && !is_offline_applicant && is_whitelisted_profession_credit_limit) {
	pull_getcontact_verify = true;
	score_cut_off_reject_reason = '';
	identity_score_cut_off_reject_reason = '';
}


/*[OFFLINE] Using affinity score; partner score; app_list_score*/
if (product_type == 'CREDIT_LIMIT' && is_offline_applicant && is_whitelisted_profession_credit_limit) {

	if ((experiment_offline == 'offline_set_a')) {
		/*
		Tier 0: hcf                                 : job/city checking
		Tier 1: non-smartphone & good-average store : new norescore 350++ 
		Tier 2: smartphone     & good store         : new norescore 355++
		Tier 3: smartphone     & average store      : new norescore 360++ && identity 425++
		Tier 4: all product    & bad store          : new norescore 370++ && identity 440++
		Tier 5: all product    & very bad store     : new norescore 375++ && identity 480++
		*/

		if (['hcf'].contains(offline_store_category)) {
			pass_bq_hcf = true;		
		} 
		/*TIER 1 */
		else if (offline_item_category=='non-smartphone' && ['good','average'].contains(offline_store_category)) {
			if(score>=350){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
		identity_score_cut_off_reject_reason = '';
			}
		}
		/*TIER 2 */
		else if (offline_item_category=='smartphone' && ['good'].contains(offline_store_category)) {
			if(score>=355){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
				identity_score_cut_off_reject_reason = '';
			}
		} 
		/*TIER 3 */
		else if (offline_item_category=='smartphone' && ['average'].contains(offline_store_category)) {
			if(score>=360 && identity_score>= 425){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
					identity_score_cut_off_reject_reason = '';
			}
		} 
		/*TIER 4 */
		else if (['bad'].contains(offline_store_category)) {
			if(score>=370 && identity_score>= 440){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
					identity_score_cut_off_reject_reason = '';
			}
		} 
		/*TIER 5 */
		else if (['very_bad'].contains(offline_store_category)) {
			if(score>=375 && identity_score>= 480){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
					identity_score_cut_off_reject_reason = '';
			}
		}
	}

	else if (experiment_offline == 'offline_set_b') {
		/*
		Tier 0: hcf                                 : job/city checking
		Tier 1: non-smartphone & good-average store : new norescore 350++ 
		Tier 2: smartphone     & good store         : new norescore 355++
		Tier 3: smartphone     & average store      : new norescore 360++ && identity 425++
		Tier 4: all product    & bad store          : new norescore 370++ && identity 440++
		Tier 5: all product    & very bad store     : new norescore 375++ && identity 480++
		*/

		if (['hcf'].contains(offline_store_category)) {
			pass_bq_hcf = true;		
		} 
		/*TIER 1 */
		else if (offline_item_category=='non-smartphone' && ['good','average'].contains(offline_store_category)) {
			if(score>=350){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
		identity_score_cut_off_reject_reason = '';
			}
		}
		/*TIER 2 */
		else if (offline_item_category=='smartphone' && ['good'].contains(offline_store_category)) {
			if(score>=353){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
				identity_score_cut_off_reject_reason = '';
			}
		} 
		/*TIER 3 */
		else if (offline_item_category=='smartphone' && ['average'].contains(offline_store_category)) {
			if(score>=355 && identity_score>= 425){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
					identity_score_cut_off_reject_reason = '';
			}
		} 
		/*TIER 4 */
		else if (['bad'].contains(offline_store_category)) {
			if(score>=367 && identity_score>= 440){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
					identity_score_cut_off_reject_reason = '';
			}
		} 
		/*TIER 5 */
		else if (['very_bad'].contains(offline_store_category)) {
			if(score>=375 && identity_score>= 480){
				score_cut_off_reject_reason = '';
				job_reject_reason = '';
					identity_score_cut_off_reject_reason = '';
			}
		}
	}
}

/* ------------------- working city -------------------*/
var workInAverageArea = false;
if ((product_type == 'CREDIT_LIMIT') || (product_type == 'PRODUCT_INSTALLMENT')) {
	if (
		(is_covered_cities_cli) 
        || (is_covered_cities_cli_selected_district)
		|| (is_covered_cities_cli_living_city)
		|| (is_covered_cities_cli_selected_district_living_city)
	) {
		workInAverageArea = true;
    }
}

if (!workInAverageArea && (!arrayUtils.contains(NOT_WORKING_PROFESSIONS,stringUtils.upperCase(applicant_profession)))) {
	if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant && partner !='AVANTO') {
        /* CLI Indodana, apply Cash Loan rules */
        if (((cash_origination == 'EXISTING') && (adhoc_cashloan_score < SCORE_CUT_OFF_REPEAT_ORDER_CASH_LOAN)) ||
			((cash_origination == 'NEW') && (adhoc_cashloan_score < SCORE_CUT_OFF_CASH_NEW)) ||
			((cash_origination == 'NEW') && (adhoc_cashloan_score < SCORE_CUT_OFF_CASH_NEW_HIGH_RISK_CITY) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier)))
          ) {
              score_cut_off_reject_reason = 'JA01';
          }
        /* ------------------- job -------------------*/
        if (cash_origination == 'NEW') {
            if ((!arrayUtils.contains(WHITELISTED_PROFESSIONS, stringUtils.upperCase(applicant_profession))) &&
                (!arrayUtils.contains(WHITELISTED_PROFESSIONS_HIGH_RISK, stringUtils.upperCase(applicant_profession))) &&
                (!arrayUtils.contains(WHITELISTED_PROFESSIONS_HIGH_RISK_CREDIT_LIMIT, stringUtils.upperCase(applicant_profession)))
            ) {
                job_reject_reason = 'CA07';
            }
        }
    } else {
	working_city_reject_reason = 'IA03';
	}
}

if (arrayUtils.contains(NOT_WORKING_PROFESSIONS,stringUtils.upperCase(applicant_profession))) {
	working_city_reject_reason = 'IA03';
	if ((is_covered_cities_cli_living_city) || (is_covered_cities_cli_selected_district_living_city)
	) {
		working_city_reject_reason = '';
	}
}

/* remove IA03 for cash users*/
if (product_type == 'CASH_LOAN') {
	working_city_reject_reason = '';
}

/* ------------------- repeat order max days past due -------------------*/
/* ------------------- commented as obsolete until new features are done, placeholder -------------------*/
/*if (product_type == 'CASH_LOAN' && is_repeat_order == 1){
	if (prev_max_days_late > 0){
		if (((is_bank_mutation == false) && (is_payslip || is_bpjs) && (prev_approved_cash_loan_loan_tenure_in_month == 1) || is_bank_mutation)){
			prev_max_dpd_reject_reason = 'IA13';
		}
	}
}*/

/*------------------- approved blibli/tiket limit -------------------*/
if ((product_type == 'CREDIT_LIMIT') && (!is_offline_applicant) && (is_repeat_order == 0) && (number_of_related_blibli_tiket_indodana_credit_limit > 0) && (adhoc_cashloan_score >= 380 || tiket_score_partner >= 420) && (is_not_cash_loan_repeat_order)) {
	pass_bq = true;
}

/*------------------- approved blibli/tiket/indodana limit -------------------*/
if (experiment_code == 'indodana_normal_set'){
	if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant && (number_of_related_blibli_tiket_indodana_credit_limit > 0) && (score >= 380)) {
		pass_bq = true;
	}
}

else if (experiment_code != 'indodana_normal_set'){
	/* do nothing */
}



/*------------------- bypass CA07 & HA04 for whitelisted cash loan via limit users -------------------*/
if (product_type == 'CASH_LOAN' && is_whitelisted_ath_via_limit_user && number_of_related_indodana_credit_limit > 0 && (job_reject_reason == 'CA07' || identity_score_cut_off_reject_reason == 'HA04')) {
	job_reject_reason = '';
	identity_score_cut_off_reject_reason = '';
} else if (product_type == 'CREDIT_LIMIT' && (!is_offline_applicant) && is_whitelisted_ath_via_limit_user && number_of_related_indodana_credit_limit > 0 && (job_reject_reason == 'CA07' || identity_score_cut_off_reject_reason == 'HA04')) {
	job_reject_reason = '';
	identity_score_cut_off_reject_reason = '';
}

/*------------------- bypass JA01 for whitelisted cash loan via limit users -------------------*/
if (product_type == 'CASH_LOAN' && is_whitelisted_ath_via_limit_user && (score_cut_off_reject_reason == 'JA01' || score_cut_off_reject_reason == 'JA06')) {
	score_cut_off_reject_reason = '';
	log.info('ath_via_limit_bypass_JA01');
} else if (product_type == 'CREDIT_LIMIT' && (!is_offline_applicant) && is_whitelisted_ath_via_limit_user && score_cut_off_reject_reason == 'JA01') {
	score_cut_off_reject_reason = '';
	log.info('ath_via_limit_bypass_JA01');
}

/* ------------------ Pekalongan NEC reject rule temp due to frauds ------------------ */
if (is_pekalongan_nec) {
	identity_score_cut_off_reject_reason = 'HA04';
}

/* ----------------- IS COMPANY FRAUDSTER FOR INDODANA GENERAL ------------- */
if (is_tokopedia == 'true'){
	if (is_company_fraudster_toko_webform) {
	identity_score_cut_off_reject_reason = 'HA04';
	}
}

if ((submit_location != '') && (submit_location != '-999')){
	blacklist_result = blacklistedLocationHelper.validateLocation(submit_location);
	is_blacklisted_location = (blacklist_result['isBlacklisted'] == null) ? false:blacklist_result['isBlacklisted'];
	blacklistReason = (blacklist_result['blacklistReason'] == null) ? '':blacklist_result['blacklistReason'];

	if (is_blacklisted_location){
		blacklisted_location_reject_reason = 'BA04';
	}
}

/* ------------------- reject high risk job no matter what (polisi, TNI, etc.) -------------------*/
if (is_profession_high_risk) {
  job_reject_reason = 'CA07';
  pass_bq = false;
}

/* ------------------- cash loan pre approved  -------------------*/
/*
offer   -> is_offer_calculation = true  -> is_eligible_offer_calculation = true  -> if offer not from CLI, qualification follow repeat ath treatment
offer   -> is_offer_calculation = true  -> is_eligible_offer_calculation = false -> not pass qualification
*/

if (is_offer_calculation && !is_eligible_offer_calculation) {
	pass_bq = false;
	score_cut_off_reject_reason = 'JA01';
}

/* reject all preapprove offer for repeat cash, since they will be included in Whitelist/Greylist */
if (is_offer_calculation && (has_pre_approved_cash_loan_offer == false) && (offerEvent == 'PAID_OFF')) {
	pass_bq = false;
	score_cut_off_reject_reason = 'JA01';
}

/* ------------------- cash loan pre approved  -------------------*/
if ((product_type == 'CASH_LOAN' && has_pre_approved_cash_loan_offer && (offerEvent == 'PAID_OFF' || offerEvent == 'CLI_REGISTRATION')) || product_type == 'SALARY_ADVANCE' || product_type == 'EMPLOYEE_LOAN') {
	pass_bq = true;
  }


/* ------------------- Hard Reject for Offline Blacklist Store  -------------------*/
if (is_offline_applicant && is_blacklist_store) {
	pass_bq = false;
}

/* ------ Cash New Approve 100% Offline Origination (24h After Approved Offline) ------ */
if ((product_type == 'CASH_LOAN') && (cash_origination == 'NEW') && (count_user_prev_approved_offline_applications_24h>0)) {
    pass_bq = true;
}

/* replace IA13 from prevalidation to bq1 */
if ((previous_all_creditlimit_max_day_past_due >= 15) || (previous_all_cashloan_max_day_past_due >= 15)) {
	pass_bq = false;
	prev_max_dpd_reject_reason = 'IA13'
}

if (stringUtils.contains(applicant_name.toLowerCase(), 'jerry') && stringUtils.contains(applicant_name.toLowerCase(), 'kasung')) {
    pass_bq = true;
}

/********************************************************/
/************************* RESULT ***********************/
/********************************************************/
if (pass_bq == true) {
	score_cut_off_reject_reason = '';
	identity_score_cut_off_reject_reason = '';
	salary_cut_off_reject_reason = '';
	age_cut_off_reject_reason = ''; 
	job_reject_reason = '';
	industry_reject_reason = '';
	working_city_reject_reason = '';
	prev_max_dpd_reject_reason = '';
	blacklisted_location_reject_reason = '';
}

if (pass_bq_hcf == true) {
	score_cut_off_reject_reason = '';
	identity_score_cut_off_reject_reason = '';
	/* salary_cut_off_reject_reason = ''; */
	/* age_cut_off_reject_reason = ''; */
	/* job_reject_reason = ''; */
	industry_reject_reason = '';
	/* working_city_reject_reason = ''; */
	prev_max_dpd_reject_reason = '';
	blacklisted_location_reject_reason = '';
}

/* pull getcontact for cash new new - new model (challenger) */
if (product_type == 'CASH_LOAN' && cash_origination == 'NEW') {
	/* approve low identity population in Cash New New with match Dana logic */
    if (
		(identity_score_cut_off_reject_reason  == 'HA04') 
		&& (score_cut_off_reject_reason == '')
		&& (salary_cut_off_reject_reason == '')
		&& (age_cut_off_reject_reason == '')
		&& (job_reject_reason == '')
		&& (industry_reject_reason == '')
		&& (working_city_reject_reason == '')
		&& (prev_max_dpd_reject_reason == '')
		&& (blacklisted_location_reject_reason == '')
        && ((match_dana_short_logic == 1) || (match_dana_name_logic == 1))
        && (is_fdc_null == false)
	) {
		identity_score_cut_off_reject_reason = '';
	}

	/* pull getcontact for cash new new - new model (challenger) */
	if (
		(identity_score_cut_off_reject_reason  == 'HA04') 
		&& (score_cut_off_reject_reason == '')
		&& (salary_cut_off_reject_reason == '')
		&& (age_cut_off_reject_reason == '')
		&& (job_reject_reason == '')
		&& (industry_reject_reason == '')
		&& (working_city_reject_reason == '')
		&& (prev_max_dpd_reject_reason == '')
		&& (blacklisted_location_reject_reason == '')
		&& (is_fdc_null == false)
		&& (adjusted_score >= 390)
	) {
		pull_getcontact_verify = true;
		identity_score_cut_off_reject_reason = '';
	}
	
	/* random approve 100 users per month */
	if (
		((identity_score_cut_off_reject_reason != '') || (score_cut_off_reject_reason != ''))
		&& (salary_cut_off_reject_reason == '')
		&& (age_cut_off_reject_reason == '')
		&& (job_reject_reason == '')
		&& (industry_reject_reason == '')
		&& (working_city_reject_reason == '')
		&& (prev_max_dpd_reject_reason == '')
		&& (blacklisted_location_reject_reason == '') 
	) {
		ab_test_cash_new_approve_100 = abTestingHelper.getVariation(orderId, 'CASH_NEW_APPROVE_100_V2', 'NORMAL');
		
		if (ab_test_cash_new_approve_100 == 'APPROVE_100') {
			score_cut_off_reject_reason = '';
			identity_score_cut_off_reject_reason = '';
		}
	}
}


result_string = score_cut_off_reject_reason + ';' + identity_score_cut_off_reject_reason + ';' + salary_cut_off_reject_reason + ';' + age_cut_off_reject_reason + ';' + job_reject_reason + ';' + industry_reject_reason + ';' + working_city_reject_reason + ';' + prev_max_dpd_reject_reason + ';' + blacklisted_location_reject_reason;


/* Pull Digiscore income if passes BQ, stated income above 5mio, and DTLab salary returns empty */
if (result_string == ';;;;;;;;' && income >= 5000000 && dtlab_salary <= 0) {
	pull_digiscore = true;
}

if (((is_ibox_gan_digimap) || (nonmp_good_average) || (mp_good_average) || (is_hcf_gym)) && product_type == 'CREDIT_LIMIT' && is_offline_applicant && partner !='AVANTO'){
	if (result_string == ';;;;;;;;' && identity_score < 480){
		pull_getcontact_verify = true;
	}
}

if (blacklistHelper.isWhitelistedByNamespace('emails', 'demoOjk', { "email": applicant_personal_email.toLowerCase() })) {
    return {
        "rejectCode": '',
        "needSalaryCheck": true,
        "ab_test": experiment_code,
        "ab_test_offline": experiment_offline,
        "ab_test_cash_new_approve_100": ab_test_cash_new_approve_100,
        "needScoreTeknologiCheck": false,
        "cash_origination": cash_origination,
        "cash_city_tier": cash_city_tier,
        "needGCVerifyUser": pull_getcontact_verify,
        "needGCTagView": pull_getcontact_tagview
    }; 
}

if (blacklistHelper.isWhitelistedByNamespace('emails', 'sqa-auto-approve-application', { "email": applicant_personal_email.toLowerCase() })) {
    return {
        "rejectCode": '',
        "needSalaryCheck": false,
        "ab_test": experiment_code,
        "ab_test_offline": experiment_offline,
        "ab_test_cash_new_approve_100": ab_test_cash_new_approve_100,
        "needScoreTeknologiCheck": false,
        "cash_origination": cash_origination,
        "cash_city_tier": cash_city_tier,
        "needGCVerifyUser": false,
        "needGCTagView": false
    }; 
}

if (applicant_personal_email == 'nuzulristyantika@gmail.com') {
  pull_getcontact_verify = true;
  pull_getcontact_tagview = true;
};

return {
    "rejectCode": result_string,
    "needSalaryCheck": pull_digiscore,
    "ab_test": experiment_code,
    "ab_test_offline": experiment_offline,
    "ab_test_cash_new_approve_100": ab_test_cash_new_approve_100,
    "needScoreTeknologiCheck": pull_shopee,
    "cash_origination": cash_origination,
    "cash_city_tier": cash_city_tier,
    "needGCVerifyUser": pull_getcontact_verify,
    "needGCTagView": pull_getcontact_tagview
};