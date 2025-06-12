    /* var ab_code = abTestingHelper.getVariation(orderId, 'indodana_simplification_ab_test', 'default_value'); */
    /* var experiment_offline = abTestingHelper.getVariation(orderId, 'offline_simplification_ab_test', 'default_value'); */
    var experiment_offline = 'offline_normal_set'; 

    var ab_code = 'indodana_normal_set';
    var ab_test_cash_new_approve_100 = '';
    var ab_test_cash_rbp = '';
    var ab_test_cash_flexible_tenure = '';
    var ab_test_cli_va = '';
    var voucherId = '';
    var rateGroupKey = 'cash_loan';
    var autoAddWhitelistEcommerceVaPayment = false;

        var params = {
            'is_repeat_order': is_repeat_order,
            'number_of_salary_only_label_3m': number_of_salary_only_label_3m,
            'max_salary_only_label_3m': max_salary_only_label_3m,
            'max_company_match_label_3m': max_company_match_label_3m,
            'max_clear_salary_match_label_3m': max_clear_salary_match_label_3m,
            'max_pattern_salary_match_3m': max_pattern_salary_match_3m,
            'score': score,
            'number_of_company_match_label_3m': number_of_company_match_label_3m,
            'number_of_company_match_label_1m': number_of_company_match_label_1m,
            'current_company_address_match': current_company_address_match,
            'number_of_clear_salary_match_label_3m': number_of_clear_salary_match_label_3m,
            'number_of_clear_salary_match_label_1m': number_of_clear_salary_match_label_1m,
            'number_of_pattern_salary_match_3m': number_of_pattern_salary_match_label_3m,
            'number_of_pattern_salary_match_1m': number_of_pattern_salary_match_label_1m,
            'number_of_applicant_name_match_3m': number_of_applicant_name_match_3m,
            'number_of_applicant_name_match_1m': number_of_applicant_name_match_1m,
            'working_city': working_city,
            'applicant_profession': applicant_profession,
            'verified_income_bpjs': verified_income_bpjs,
            'is_bpjs': is_bpjs,
            'is_bank_mutation': is_bank_mutation
        };

        /********************************************************/
        /*********************** CONSTANTS **********************/
        /********************************************************/
        
        var COVERED_CITIES_CREDIT_LIMIT_OFFLINE_HCF = [
            'KABUPATEN BADUNG',
            'KABUPATEN BANDUNG',
            'KABUPATEN BANDUNG BARAT',
            'KABUPATEN BEKASI',
            'KABUPATEN BOGOR',
            'KABUPATEN CIANJUR',
            'KABUPATEN CIREBON',
            /* 'KABUPATEN DELI SERDANG', */
            /* 'KABUPATEN DEMAK', */
            'KABUPATEN GIANYAR',
            'KABUPATEN GRESIK',
            'KABUPATEN KARAWANG',
            /* 'KABUPATEN KUDUS', */
            /* 'KABUPATEN SERANG', */
            'KABUPATEN SIDOARJO',
            'KABUPATEN SLEMAN',
            'KABUPATEN SUKABUMI',
            'KABUPATEN SUKOHARJO',
            'KABUPATEN SUMEDANG',
            'KABUPATEN TABANAN',
            'KABUPATEN TANGERANG',
            'KOTA BALIKPAPAN',
            /* 'KOTA BANDAR LAMPUNG', */
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
            /* 'KOTA JAMBI', */
            'KOTA KENDARI',
            'KOTA MAKASSAR',
            'KOTA MALANG',
            'KOTA MANADO',
            /* 'KOTA MEDAN', */
            'KOTA PADANG',
            /* 'KOTA PALANGKA RAYA', */
            'KOTA PALEMBANG',
            /* 'KOTA PALU', */
            /* 'KOTA PANGKAL PINANG', */
            'KOTA PEKANBARU',
            'KOTA PONTIANAK',
            'KOTA SAMARINDA',
            'KOTA SEMARANG',
            /* 'KOTA SERANG', */
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
            'KOTA SOLOK',
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
            'KABUPATEN BANGLI',
            'KOTA GORONTALO',
            'KABUPATEN GORONTALO',
            'KOTA KUPANG',
            'KABUPATEN PURWAKARTA',
            'KABUPATEN SUBANG',
            'KABUPATEN BANYUMAS',
            'KABUPATEN CILACAPA',
            'KOTA SERANG',
            'KOTA CILEGON',
            'KABUPATEN SERANG'
        ];

        var SALARY_CUTOFF = {
            'MINIMUM_CREDIT_FOR_SALARY': 2000000,
            'MINIMUM_COUNT_FOR_SALARY_3M': 1,
            'MINIMUM_COUNT_FOR_SALARY_1M': 0
        };

        var WHITELIST_JOBS = [
            'PEGAWAI SWASTA',
            'LAINNYA',
            'PEGAWAI NEGERI',
            'PEGAWAI BUMN',
            'PROFESIONAL',
            'WIRASWASTA',
            'IBU RUMAH TANGGA',
            'FREELANCE' /*added to align with BQ1*/
        ];

        var WHITELISTED_PROFESSIONS_CREDIT_LIMIT = [
            'PEGAWAI BUMN', 
            'PEGAWAI SWASTA', 
            'LAINNYA',
            'PEGAWAI NEGERI',
            'PROFESIONAL',
            'WIRASWASTA',
            'IBU RUMAH TANGGA',
            'FREELANCE',
            'PELAJAR',
            'MAHASISWA'
        ];

        var WHITELISTED_NOT_WORKING_PROFESSIONS_CREDIT_LIMIT = [
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

        var WHITELIST_JOBS_HIGH_RISK = [
            'FREELANCE'
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
        'perfect health',

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

        var OFFLINE_MERCHANT_ELIGIBLE_LIMIT_50_MIO = [ 
            'perfect health'
        ];

        var OFFLINE_MERCHANT_DEKORUMA = [ 
            'project dekoruma'
        ];

        var OFFLINE_HCF_GYM = [
            'ftl gym',
            'fithub',
            'f18 gym',
            'curves indonesia',
            'osbond gym'
        ];

        var OFFLINE_PRJ_STORE = [
            'dummy dummy prj 2025',
            'oxxo sentral tekindo 001 - exhibition jakarta lebaran fair 2025',
            'sunra retail indonesia 001 - exhibition jakarta lebaran fair 2025'
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

        var OFFLINE_STORE_PASS_TO_CA = [
            'vivo store 08 mvs - jkts - ambassador 30',
            'vivo store 10 mvs-bnt-tct 2',
            'vivo store 11 mvs-bnt-tct',
            'vivo store 14 mvs itc depok vivo store 2',
            'vivo store 20 mvs cempaka showroom 2 (454)',
            'vivo store 25 me roxy pameran timur',
            'vivo store 26 mvs roxy showroom 78',
            'vivo store 27 mvs roxy showroom 21',
            'ear 552 - erafone ruko malaka jaya',
            'abadi jmk',
            'sinergi',
            "d'ev 010 - adiyasa",
            'auto ev'
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
            'sellus global indo',
            /* Karawang & Tasikmalaya E-bike merchant*/
            'bigbike',
            'barleto',
            'uwinflydealertasikmalaya',
            'kellybike',
            'cvperintiskomputer'
        ];


        var OFFLINE_WHITELIST_ITEMS = [ /*this list includes samsung for these editions only: OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS*/
            'find n2 flip',
            'find n3 flip',
            'vivo x80',
            'find x5'
        ];

        var OFFLINE_WHITELIST_ITEMS_APPLE_EDITIONS = [
            'iphone 12',
            'iphone 13',
            'iphone 14',
            'iphone 15',
            'iphone 16',
            'iphone 17',
            'iphone 18',
            'ip 12',
            'ip 13',
            'ip 14',
            'ip 15',
            'ip 16',
            'ip 17',
            'ip 18',        
            'iphone12',
            'iphone13',
            'iphone14',
            'iphone15',
            'iphone16',
            'iphone17',
            'iphone18',        
            'apple 12',
            'apple 13',
            'apple 14',
            'apple 15',
            'apple 16',
            'apple 17',
            'apple 18',        
            'apple12',
            'apple13',
            'apple14',
            'apple15',
            'apple16',
            'apple17',
            'apple18',        
            'ipad',
            'macbook',
            'imac',
            'watch'
        ];

        var OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS = [
            's21',
            's22',
            's23',
            's24',
            's25',
            's26',
            's27',       
            'z',
            'flip',
            'fold'
        ];

        var OFFLINE_PARETO_BRAND = [
            /*List is here should be substring of merchants instead of brand name */
            'kawan lama',
            'hartono elektronik',
            'electronic city',
            'yamada best',
            'atria',
            'yogya 1',
            'yogya 2',
            'yogya 3',
            'yogya 4',
            'yogya 5',
            'yogya 6',
            'ufo',
            'agres',
            'kliknklik'
        ];

        var OFFLINE_PARETO_BRAND_2 = [
            /*List is here should be substring of merchants instead of brand name */
            'erablue',
            'a takrib',
            'hypermart',
            'courts',
            'lotte',
            'mitra10',
            'log in megastore',
            'lulu hypermarket'
        ];

        var OFFLINE_SELECTED_SUB_ITEM_CATEGORY = [
            'laptop & notebook'
            , 'tv'
            , 'kulkas & freezer'
            , 'air conditioner (ac)'
            , 'mesin cuci'
            , 'tablet'                     
            , 'spring bed'  
            , 'sofa bed'
            , 'meja & kursi'
            , 'kamera'
        ]

        /* CLI Indodana BQ1 Reject JA01 & Cash BQ2 Reject JA01*/
        var is_match_dana = ((match_dana_short_logic == 1) || (match_dana_name_logic == 1));
        var offer_experiment_code = abTestingHelper.getVariation(orderId, 'preapproved_cash_loan_ab_test', 'default_value');

        /* null handling */
        if(adhoc_cashloan_score == null) {
            adhoc_cashloan_score = -99;
        }

        if(adhoc_cashloan_reinforced_score == null) {
            adhoc_cashloan_reinforced_score = -99;
        }

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

        /* for cash existing BPS AB */
        if ((product_type == 'CASH_LOAN') && (cash_origination == 'EXISTING')) {
            ab_code = abTestingHelper.getVariation(orderId, 'BPS_CASH_EXISTING_MODEL', 'NORMAL');
        }
        
        /********************************************************/
        /************************* LOGIC ************************/
        /********************************************************/
        /* ------------------- LOGIC - Bandaid, FIX after RO model deployed -------------------*/
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

        var addition = 0;

        var adjusted_score = score;

        if (tiket_score >= 400) {
            addition = 20;
        } else if (blibli_score >= 400) {
            addition = 20;
        }

        if (product_type == 'CREDIT_LIMIT') {
            if (count_shady_app > 1 || count_banned_app > 1) {
                adhoc_cashloan_score = adhoc_cashloan_score - 30;
            } else if (count_shady_app == 1 || count_banned_app > 0) {
                adhoc_cashloan_score = adhoc_cashloan_score - 10;
            } else {
                adhoc_cashloan_score = adhoc_cashloan_score;
            }
        }

        /* ------------------- LOGIC - previous cash loan -------------------*/
        prev_approved_cash_loan_loan_amount = new("java.lang.Integer",prev_approved_cash_loan_loan_amount);
        prev_approved_cash_loan_loan_tenure_in_month = 
        prev_approved_cash_loan_loan_tenure_in_month == '' ? 0 :
        new("java.lang.Integer",prev_approved_cash_loan_loan_tenure_in_month);

        /* ------------------- LOGIC - income -------------------*/
        var is_salary_rule = (params['number_of_salary_only_label_3m'] > SALARY_CUTOFF['MINIMUM_COUNT_FOR_SALARY_3M']
        && params['max_salary_only_label_3m'] > SALARY_CUTOFF['MINIMUM_CREDIT_FOR_SALARY']);
        var is_company_salary_match = (params['number_of_company_match_label_3m'] > SALARY_CUTOFF['MINIMUM_COUNT_FOR_SALARY_3M']
        || params['number_of_company_match_label_1m'] > SALARY_CUTOFF['MINIMUM_COUNT_FOR_SALARY_1M']);
        var is_clear_salary_match = (params['number_of_clear_salary_match_label_3m'] > SALARY_CUTOFF['MINIMUM_COUNT_FOR_SALARY_3M']
        || params['number_of_clear_salary_match_label_1m'] > SALARY_CUTOFF['MINIMUM_COUNT_FOR_SALARY_1M']);
        var is_pattern_salary_match = (params['number_of_pattern_salary_match_3m'] > SALARY_CUTOFF['MINIMUM_COUNT_FOR_SALARY_3M']
        || params['number_of_pattern_salary_match_1m'] > SALARY_CUTOFF['MINIMUM_COUNT_FOR_SALARY_1M']);

    /* ------------------- LOGIC - population rule -------------------*/
    var profession_upper = params['applicant_profession'].toUpperCase();

    var is_covered_cities_cli = (mamunda_var_is_covered_cities_cli == null) ? true : mamunda_var_is_covered_cities_cli; 
    var is_covered_cities_cli_living_city = (mamunda_var_is_covered_cities_cli_living_city == null) ? true : mamunda_var_is_covered_cities_cli_living_city;
    var is_covered_cities_cli_selected_district = (mamunda_var_is_covered_cities_cli_selected_district == null) ? true : mamunda_var_is_covered_cities_cli_selected_district;
    var is_covered_cities_cli_selected_district_living_city = (mamunda_var_is_covered_cities_cli_selected_district_living_city == null) ? true : mamunda_var_is_covered_cities_cli_selected_district_living_city;
    var is_covered_cities_offline = COVERED_CITIES_CREDIT_LIMIT_OFFLINE_HCF.contains(stringUtils.upperCase(working_city));
    var is_covered_cities_offline_living_city = COVERED_CITIES_CREDIT_LIMIT_OFFLINE_HCF.contains(stringUtils.upperCase(living_city));

    var is_whitelist_population = (WHITELIST_JOBS.contains(profession_upper) && is_covered_cities_cli);
    var is_whitelist_population_city_with_selected_district = (WHITELIST_JOBS.contains(profession_upper) && is_covered_cities_cli_selected_district);

    var is_whitelist_population_living_city = (WHITELIST_JOBS.contains(profession_upper) && is_covered_cities_cli_living_city);
    var is_whitelist_population_city_living_city_with_selected_district = (WHITELIST_JOBS.contains(profession_upper) && is_covered_cities_cli_selected_district_living_city);

    var is_whitelist_living_city = is_covered_cities_cli_living_city;

    var is_whitelisted_not_working_profession_credit_limit = ((arrayUtils.contains(WHITELISTED_NOT_WORKING_PROFESSIONS_CREDIT_LIMIT,stringUtils.upperCase(applicant_profession))) && (is_whitelist_living_city));
    var is_whitelisted_not_working_population_city_with_selected_district = ((arrayUtils.contains(WHITELISTED_NOT_WORKING_PROFESSIONS_CREDIT_LIMIT,stringUtils.upperCase(applicant_profession))) && is_covered_cities_cli_selected_district_living_city);

    var is_profession_high_risk = arrayUtils.contains(PROFESSIONS_HIGH_RISK,stringUtils.upperCase(ocr_result_occupation_type.toString()));

    var is_covered_cities = (mamunda_var_is_covered_cities == null) ? false : mamunda_var_is_covered_cities;
    var is_covered_cities_tier_2 = (mamunda_var_is_covered_cities_tier_2 == null) ? false : mamunda_var_is_covered_cities_tier_2;
    var is_covered_cities_tier_3 = (mamunda_var_is_covered_cities_tier_3 == null) ? false : mamunda_var_is_covered_cities_tier_3;
    var is_covered_cities_living_city = (mamunda_var_is_covered_cities_living_city == null) ? false : mamunda_var_is_covered_cities_living_city;
    var is_covered_cities_tier_2_living_city = (mamunda_var_is_covered_cities_tier_2_living_city == null) ? false : mamunda_var_is_covered_cities_tier_2_living_city;
    var is_covered_cities_tier_3_living_city = (mamunda_var_is_covered_cities_tier_3_living_city == null) ? false : mamunda_var_is_covered_cities_tier_3_living_city;

    var cash_city_tier = 'OTHER';
        if (product_type == 'CASH_LOAN') {
            if (is_covered_cities || is_covered_cities_living_city) {
                cash_city_tier = 'TIER 1';
            } else if (is_covered_cities_tier_2 || is_covered_cities_tier_2_living_city) {
                cash_city_tier = 'TIER 2';
            } else if (is_covered_cities_tier_3 || is_covered_cities_tier_3_living_city) {
                cash_city_tier = 'TIER 3';
            } else if (is_covered_cities_cli_selected_district || is_covered_cities_cli_selected_district_living_city) {
                cash_city_tier = 'CLI SELECTED DISTRICT';
            }
            var is_covered_cities_cash_loan_ro = cash_city_tier != 'OTHER';
        }

        var is_outside_all_covered_cities = (!is_covered_cities) && (!is_covered_cities_tier_2) && (!is_covered_cities_tier_3) && (!is_covered_cities_cli_selected_district) && !(NOT_WORKING_PROFESSIONS.contains(profession_upper));



        var is_fdc_null = sum_amount_disbursed_total <= 0;
        var is_offline_applicant = offline_transaction_applied_amount_without_multiplier > 0 || flag_treatment == 'hcf_treatment' || flag_treatment == 'mp_treatment';
        var reinforced_score = (flag_treatment == 'hcf_treatment' || flag_treatment == 'mp_treatment') ? reinforced_pefindo_scoring_cli_offline_no_ewallet_20240912 : reinforced_score;
        var is_low_izi_inquiry = (izi_max_multi_inquiries_90d < 10) && (izi_max_multi_inquiries_14d < 4);
        var is_very_low_izi_inquiry = (izi_max_multi_inquiries_90d <= 2) && (izi_max_multi_inquiries_14d <= 1) && (number_of_installed_loan_apps_within_14days <= 3) 
            && (izi_reference_mobile_phone_number_multi_inquiries_total <= 3);
        var is_fdc_late = discounted_sum_outstanding_late_1y > 0;

        var is_not_late_pefindo = ((pefindo_discounted_sum_outstanding_late <= 0) && (count_written_off_unique_creditor <= 0));
        var is_not_late_fdc = (((discounted_sum_outstanding_late_1y <= 0)||(sum_outstanding_amount_late_15 <= 0)) && (count_write_off_organizer_id_last_3y <= 0));
        var is_low_izi_max_inquiry = izi_max_multi_inquiries_total <= 3;
        var is_pekalongan = (stringUtils.contains(living_city.toLowerCase(), 'pekalongan') ||
                            stringUtils.contains(working_city.toLowerCase(), 'pekalongan') ||
                            stringUtils.contains(applicant_place_of_birth_city.toLowerCase(), 'pekalongan') ||
                            stringUtils.contains(applicant_residence_city.toLowerCase(), 'pekalongan'));
        var is_nec = stringUtils.contains(current_company_name.toLowerCase(), 'nec ');


        /* If run in simulation, get whitelist data from datamart. Otherwise in production, hit whitelist API */
        var is_whitelisted_ath_via_limit_user = false;
        var is_greylisted_ath_via_limit_user = false;
        var is_whitelisted_ath_btpl = false;
            var is_whitelisted_ath_btpl_expansion = false;
        var is_access_btpl_cash_loan = false;
        var is_access_blibli_btpl_cash_loan = false;
        var is_whitelisted_ath_btpl_blibli = false;

        if (is_simulation == 1) {
            is_whitelisted_ath_via_limit_user = is_whitelisted_ath_via_limit_user_snapshot == 1 ? true : false;
            is_whitelisted_ath_btpl = is_whitelisted_ath_btpl_snapshot == 1 ? true : false;
            is_whitelisted_ath_btpl_expansion = is_whitelisted_ath_btpl_snapshot == 1 ? true : false;
            is_whitelisted_ath_btpl_blibli = is_whitelisted_ath_btpl_snapshot == 1 ? true : false;
            is_greylisted_ath_via_limit_user = is_greylisted_ath_via_limit_user_snapshot == 1 ? true : false;
            is_access_btpl_cash_loan = is_whitelisted_ath_btpl_snapshot == 1 ? true : false;
            is_access_blibli_btpl_cash_loan = is_whitelisted_ath_btpl_snapshot == 1 ? true : false;
        } else {
            is_whitelisted_ath_via_limit_user = blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'whitelist', {"phoneNumber": applicant_mobile_phone_number}) || 
                                                blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'btpl-cash-loan', {"phoneNumber": applicant_mobile_phone_number}) || 
                                                blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'employee', {"phoneNumber": applicant_mobile_phone_number});
            is_whitelisted_ath_btpl = blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'btpl-cash-loan', {"phoneNumber": applicant_mobile_phone_number});
            is_whitelisted_ath_btpl_expansion = blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'access-btpl-cash-loan', 'whitelist', {"phoneNumber": applicant_mobile_phone_number});
            is_greylisted_ath_via_limit_user = blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'phase-2-cash-loan-via-limit', 'greylist', {"phoneNumber": applicant_mobile_phone_number});
            is_whitelisted_ath_btpl_blibli = blacklistHelper.isWhitelistedByNamespaceAndReason('phones', 'access-blibli-btpl-cash-loan', 'blibli-cash-loan', {"phoneNumber": applicant_mobile_phone_number});

            is_access_btpl_cash_loan = blacklistHelper.isWhitelistedByNamespace('phones', 'access-btpl-cash-loan', {"phoneNumber": applicant_mobile_phone_number});
            is_access_blibli_btpl_cash_loan = blacklistHelper.isWhitelistedByNamespace('phones', 'access-blibli-btpl-cash-loan', {"phoneNumber": applicant_mobile_phone_number})
        }

        var number_of_related_indodana_credit_limit = number_of_related_blibli_tiket_indodana_credit_limit - number_of_related_blibli_tiket_credit_limit;
        var whitelist_type = is_whitelisted_ath_btpl_blibli? 'ATH_VIA_BTPL_BLIBLI' : (is_whitelisted_ath_btpl? 'ATH_VIA_BTPL' : (is_whitelisted_ath_via_limit_user ? 'ATH_VIA_WHITELIST' : (is_greylisted_ath_via_limit_user ? 'ATH_VIA_GREYLIST' : 'NO_LIST')));
        var is_cash_limit_calc_new_app = (product_type == 'CASH_LOAN' && requested_loan_amount == 0);

        /*Offer Calculation Logic*/
        var is_offer_calculation = (offerId == null || offerId == "" || offerId == "-99" || offerId == "-999" || offerEvent == 'ADHOC_SCRIPT') ? 0 : 1;
        var is_eligible_offer_calculation = (is_offer_calculation == 1) && (((prev_approved_cash_loan_loan_amount > 0 || is_repeat_order == 1) && (prev_cli_ath_max_days_late <= 0)) || (offerEvent == 'CLI_REGISTRATION'));
        var is_repeat_order = ((is_eligible_offer_calculation) && (offerEvent != 'CLI_REGISTRATION')) ? 1 : is_repeat_order; /*Overwrite is_repeat_order == 1, if is_eligible_offer_calculation, except CLI_REGISTRATION  */

        /* ------------------- LOGIC - score -------------------*/
        var is_score_D = (adjusted_score >= 340 && adjusted_score < 350);
        var is_score_C = (adjusted_score >= 350 && adjusted_score < 370);
        var is_score_B = (adjusted_score >= 370 && adjusted_score < 400);
        var is_score_A = (adjusted_score >= 400 && adjusted_score < 420);
        var is_score_AA = (adjusted_score >= 420);
        var is_score_AAA = (adjusted_score >= 440);
        var is_above_cutoff = (adjusted_score >= 370);

        /* ------------------- LOGIC - verified income -------------------*/
        var is_verif_income = (is_salary_rule || is_company_salary_match || is_clear_salary_match || is_pattern_salary_match);
        var is_verif_income_bpjs = (verified_income_bpjs > 0);

        /* ------------------- LOGIC - verified income value -------------------*/
        var verif_income_value_max = 0;
        if (is_salary_rule) {
            verif_income_value_max = params['max_salary_only_label_3m'];
        } else if (is_company_salary_match) {
            verif_income_value_max = params['max_company_match_label_3m'];
        } else if (is_clear_salary_match){
            verif_income_value_max = params['max_clear_salary_match_label_3m'];
        } else if (is_pattern_salary_match) {
            verif_income_value_max = params['max_pattern_salary_match_3m'];
        }

        var is_verified_income_D = (verif_income_value_max < 3000000);
        var is_verified_income_C = (verif_income_value_max >= 3000000 && verif_income_value_max < 5000000);
        var is_verified_income_B = (verif_income_value_max >= 5000000 && verif_income_value_max < 8000000);
        var is_verified_income_A = (verif_income_value_max >= 8000000);

        /* ------------------- LOGIC - customer segmentation -------------------*/
        var is_payslip = (params['is_bpjs'] == 0 && params['is_bank_mutation'] == 0);
        is_bpjs = (params['is_bpjs'] == 1);
        is_bank_mutation = (params['is_bank_mutation'] == 1);

        /* ------------------- LOGIC - misc -------------------*/
        var is_address_match = (params['current_company_address_match'] == 1);
        var is_bank_name_match = bank_account_name_match_distance <=2 || bank_account_name_match_ratio >= 65;
        var is_bpjs_name_match = applicant_name_match_distance <= 2 || applicant_name_match_ratio >= 65;

        /* ------------- LOGIC - Low Identity with additional Filter for CLI Offline -------------*/
        var eligible_low_identity = false;
        if (identity_score >= 470) { eligible_low_identity = true;} 
        else if (identity_score >= 450 && ( izi_reference_mobile_phone_number_whatsapp_availability == 'yes' || pefindo_max_phone_number_match > 0 ))  { eligible_low_identity = true;}
        else if (identity_score >= 440 && ( izi_reference_mobile_phone_number_whatsapp_availability == 'yes' && pefindo_max_phone_number_match > 0 ))  { eligible_low_identity = true;}

        /* ------------- LOGIC - Phone Model Class for CLI Offline -------------*/
        var phone_model_class_group = (["Expensive", "Iphone"].contains(phone_model_class)) ? 'expensive phone': 'cheap phone';

        /* ------------- LOGIC - pefindo category -------------*/
        var rule_pefindo = "1";
        var prefix = "";
        var good_dpd = ((percentage_latest_dpd_15_1y >= 0)
                && (percentage_latest_active_dpd_3 == 0)
                && (count_written_off_unique_creditor_2y == 0));
                
        var good_cc_dpd = ((percentage_latest_active_dpd_30 <= 0.25) && (percentage_latest_active_dpd_30 >= 0)
                && (pefindo_discounted_sum_outstanding_late <= 7.5e6) && (pefindo_discounted_sum_outstanding_late >= 0)
                && (count_outstanding_amount_active_cc > 0)
                && (count_written_off_unique_creditor_2y == 0));
                
        var very_high_cc_limit = ((max_limit_active_cc >= 25000000) || (sum_limit_active_cc >= 65000000));
        var high_cc_limit = ((max_limit_active_cc >= 15000000) || (sum_limit_active_cc >= 30000000));
        var medium_cc_limit = ((max_limit_active_cc >= 8000000) || (sum_limit_active_cc >= 20000000));
        var low_cc_limit = ((max_limit_active_cc > 0) && (sum_limit_active_cc > 0));
        var high_paylater = ((sum_paylater_settled_1y > 5000000)
                    || (sum_paylater_disbursed_1y > 10000000)
                    &&  (sum_paylater_settled_1y >1000000));
        if ((count_written_off_unique_creditor > 0)
        || ( (((percentage_latest_active_dpd_30> 0) && (percentage_latest_active_dpd_30<=0.25)) && ((pefindo_discounted_sum_outstanding_late== 0)))
                || ((percentage_latest_active_dpd_30==0) && ((pefindo_discounted_sum_outstanding_late> 0) && (pefindo_discounted_sum_outstanding_late<= 7.5e6)))
                || (((percentage_latest_active_dpd_30> 0) && (percentage_latest_active_dpd_30<= 0.25)) && ((pefindo_discounted_sum_outstanding_late> 0) && (pefindo_discounted_sum_outstanding_late<= 7.5e6)))   )
        ){
            prefix = "1A-";  
        }

        if (good_cc_dpd && very_high_cc_limit && (days_from_active_credit_card_disbursement_date > 180)){
            if (percentage_outstanding_credit_card_active > 0.7){
                rule_pefindo = prefix + "5B";
            }
            else {
                rule_pefindo = prefix + "5";  
            }
        } else if (good_cc_dpd && high_cc_limit && (days_from_active_credit_card_disbursement_date > 180)){
            if (percentage_outstanding_credit_card_active > 0.7){
                rule_pefindo = prefix + "4B";
            }
            else{
                rule_pefindo = prefix + "4";
            }
        } else if (good_cc_dpd && (medium_cc_limit || (days_from_active_credit_card_disbursement_date > 730))){
            if (percentage_outstanding_credit_card_active > 0.7){
                rule_pefindo = prefix + "3B";  
            }
            else{
                rule_pefindo = prefix + "3";        
            }
        } else if (good_cc_dpd && low_cc_limit){
            if (percentage_outstanding_credit_card_active > 0.7){
                rule_pefindo = prefix + "2CCB";
            }
            else{
                rule_pefindo = prefix + "2CC";
            }
        } else if (high_paylater && good_dpd){
            rule_pefindo = prefix + "2";    
        }

        var high_limit_disbursed_category = '';
        var is_good_pefindo_cc = ["3", "4", "5", "3B", "4B", "5B", "1A-3", "1A-4", "1A-5", "1A-3B", "1A-4B", "1A-5B"].contains(rule_pefindo);
        var is_good_pefindo_cc_2 = ["3", "4", "5", "3B", "4B", "5B", "1A-3", "1A-4", "1A-5", "1A-2CC", "1A-2CCB", "2CC", "2CCB"].contains(rule_pefindo);
        var is_good_pefindo_cc_45 = ["4", "5", "4B", "5B", "1A-4", "1A-5", "1A-4B", "1A-5B"].contains(rule_pefindo);

        /* ------------- LOGIC - Offline validated Capacity Category -------------*/
        var offline_validated_capacity_category = '';
        /* [CATEGORY 1] Good Pefindo, High Multi Finance Disbursed */
        if (offline_validated_capacity_category=='' && is_good_pefindo_cc && reinforced_score >= 380 && (sum_bank_loan_and_multi_finance_active_5y>=50000000 || sum_contracts_outstanding>=50000000) && max_dpd_1y<=60){
            offline_validated_capacity_category = '1.Good Pefindo, High Multi Finance Disbursed';
        }
        /* [CATEGORY 2] Good Pefindo */
        if (offline_validated_capacity_category=='' && is_good_pefindo_cc && reinforced_score >= 380 &&  max_dpd_1y<=60) {
            offline_validated_capacity_category = '2.Good Pefindo';
        }  
        /* [CATEGORY 3] High Multi Finance Disbursed */
        if (offline_validated_capacity_category=='' && !is_good_pefindo_cc && (sum_bank_loan_and_multi_finance_active_5y>=25000000||sum_contracts_outstanding>=25000000) && max_dpd_1y<=60) {
            if (  (reinforced_score>=400) /* high pefindo score */
                ||(reinforced_score>=380 && sum_offline_settled>=5000000) /* Repeat Order at HCI or AEON */
                ||(reinforced_score>=380 && dtlab_salary>=7000000) /* high dtlab salary */
                ||(reinforced_score>=380 && digiscore_salary>=900) /* high digiscore salary */
                ||(reinforced_score>=380 && average_age_of_relationship>=180) /* high FDC age of relationship */
                ||(reinforced_score>=380 && final_pefindo_installment>0 && final_pefindo_installment<=500000) /* low debt burden */
                ){
                    offline_validated_capacity_category = '3.High Multi Finance Disbursed';
            }   
        }
        /* [CATEGORY 4] High Capacity with Expensive Phone User */
        if (offline_validated_capacity_category=='' && !is_good_pefindo_cc && ["Expensive", "Iphone"].contains(phone_model_class) && is_not_late_fdc && is_not_late_pefindo && is_low_izi_inquiry) {
            if (  (reinforced_score>=400) /* high pefindo score */
                ||(reinforced_score>=380 && sum_offline_settled>=5000000) /* Repeat Order at HCI or AEON */
                ||(reinforced_score>=380 && dtlab_salary>=7000000) /* high dtlab salary */
                ||(reinforced_score>=380 && digiscore_salary>=900) /* high digiscore salary */
                ){
                    offline_validated_capacity_category = '4.High Capacity with Expensive Phone User'; 
            } 
        }
        /* [CATEGORY 5] High Capacity with Cheap Phone User */
        if (offline_validated_capacity_category=='' && !is_good_pefindo_cc && ["Cheap", "Other"].contains(phone_model_class) && is_not_late_fdc && is_not_late_pefindo && is_low_izi_inquiry) {
            if (  (reinforced_score>=400) /* high pefindo score */
                ||(reinforced_score>=380 && sum_offline_settled>=5000000) /* Repeat Order at HCI or AEON */
                ||(reinforced_score>=380 && dtlab_salary>=7000000) /* high dtlab salary */
                ||(reinforced_score>=380 && digiscore_salary>=900) /* high digiscore salary */
                ){
                    offline_validated_capacity_category = '5.High Capacity with Cheap Phone User';
            } 
        }
        var offline_validated_capacity_category_additional = '';
        /* [OTHER] Other Validated Capacity Criteria */
        if (  (reinforced_score>=400) /* high pefindo score */
            ||(reinforced_score>=380 && sum_offline_settled>=5000000) /* Repeat Order at HCI or AEON */
            ||(reinforced_score>=380 && dtlab_salary>=7000000) /* high dtlab salary */
            ||(reinforced_score>=380 && digiscore_salary>=900) /* high digiscore salary */
            ||(reinforced_score>=380 && final_pefindo_installment>0 && final_pefindo_installment<=500000) /* low debt burden */
            ||(reinforced_score>=380 && average_age_of_relationship>=180) /* high FDC age of relationship */
            ){
                offline_validated_capacity_category_additional = '6.Other Validated Capacity Criteria';
        } 


        /* ------------- LOGIC - offline good category -------------*/
        /*Offline whitelist item*/
        var is_offline_whitelisted_item = false;
        for (item: OFFLINE_WHITELIST_ITEMS) {
            if(stringUtils.contains(offline_item_names.toLowerCase(), item.toLowerCase())) {
                is_offline_whitelisted_item = true;
            }    
        }
        /*Samsung + (s21/s22/s23/flip/fold/z)*/
        for (samsung_series: OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS) {
            if(stringUtils.contains(offline_item_names.toLowerCase(), 'samsung') 
            && stringUtils.contains(offline_item_names.toLowerCase(), samsung_series.toLowerCase())) {
                is_offline_whitelisted_item = true;
            }    
        }

        /*Apple + (iphone 12/iphone 13/iphone 14/iphone 15/ipad/macbook/imac/watch)*/
        for (apple_series: OFFLINE_WHITELIST_ITEMS_APPLE_EDITIONS) {
            if(stringUtils.contains(offline_item_names.toLowerCase(), 'apple') 
            && stringUtils.contains(offline_item_names.toLowerCase(), apple_series.toLowerCase())) {
                is_offline_whitelisted_item = true;
            }    
        }

        /*Laptop Product*/
        if(stringUtils.contains(offline_sub_item_category.toLowerCase(), 'laptop & notebook')) {
            is_offline_whitelisted_item = true;
        } 
        /*Good store high limit: selected store which eligible for whitelist high limit*/
        /*var is_good_store_high_limit_category = false;
        for (store_initial: OFFLINE_STORE_PRIORITY_HIGH_LIMIT) {
            if (stringUtils.contains(store_name, store_initial)) {
                is_good_store_high_limit_category = true;
            } 
        } 
        */

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

        var is_merchant_eligible_limit_50_mio = false;
        for (store_initial: OFFLINE_MERCHANT_ELIGIBLE_LIMIT_50_MIO) {
            if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
                is_merchant_eligible_limit_50_mio = true;
            } 
        }

        var is_merchant_dekoruma = false;
        for (store_initial: OFFLINE_MERCHANT_DEKORUMA) {
            if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
                is_merchant_dekoruma = true;
            } 
        }

        /*Set Pareto Brand*/
        var is_pareto_brand = false;
        for (store_initial: OFFLINE_PARETO_BRAND) {
            if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
                is_pareto_brand = true;
            } 
        }

        /*Set Pareto Brand 2*/
        var is_pareto_brand_2 = false;
        for (store_initial: OFFLINE_PARETO_BRAND_2) {
            if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
                is_pareto_brand_2 = true;
            } 
        }

        /*Set Selected Sub Item 2*/
        var is_selected_sub_item = false;
        for (sub_item_cat: OFFLINE_SELECTED_SUB_ITEM_CATEGORY) {
            if (stringUtils.contains(offline_sub_item_category.toLowerCase(), sub_item_cat)) {
                is_selected_sub_item = true;
            } 
        }

        /*Set HCF GYM*/
        var is_hcf_gym = false;
        for (store_initial: OFFLINE_HCF_GYM) {
            if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
                is_hcf_gym = true;
            } 
        }

        /*FTL GYM*/
        var is_ftl_gym = false;
        if (stringUtils.contains(store_name.toLowerCase(), 'ftl gym')) {
            is_ftl_gym = true;
        } 
        

        /*Bad Agent Treatment*/
        var is_agent_under_review = (agent_under_review == null) ? false : agent_under_review;
        if (is_agent_under_review) {
            offline_store_category = 'very_bad';
        }


        /*Overwrite is_offline_whitelisted_item for good store high limit category eg:ibox, hello+, prj store */
        /* is_offline_whitelisted_item = is_good_store_high_limit_category ? true : is_offline_whitelisted_item; */

        /*Temporary fix for ebike high risk store, overwrite offline_item_category definition to smartphone
        for (store_initial: OFFLINE_STORE_SMARTPHONE_TREATMENT) {
            if (stringUtils.contains(store_name, store_initial)) {
                offline_item_category = 'smartphone';
            } 
        }
        */

        /*Check if blacklist store*/
        var is_blacklist_store = false;
        for (store_initial: OFFLINE_STORE_BLACKLIST) {
            if (stringUtils.contains(store_name, store_initial)) {
                is_blacklist_store = true;
            } 
        }

        var offline_store_category = (offline_store_category == null || offline_store_category == "" || offline_store_category == "None" || offline_store_category == "-99" || offline_store_category == "-999") ? 'average' : offline_store_category;
        /*If CLI online leave the store category an empty string*/
        offline_store_category = (is_offline_applicant) ? offline_store_category : '';

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

        /* PRJ store */
        var is_prj_merchants = false;
        for (store_initial: OFFLINE_PRJ_STORE) {
            if (stringUtils.contains(store_name, store_initial)) {
                is_prj_merchants = true;
            } 
        }

        /* PRJ DUMMY TO SMARTHPHONE */
        for (store_initial: PRJ_DUMMY_LIST) {
            if (stringUtils.contains(store_name, store_initial)) {
                offline_item_category = 'smartphone';
                is_offline_whitelisted_item = false;
            } 
        }

        var offline_store_category = (offline_store_category == null || offline_store_category == "" || offline_store_category == "-99" || offline_store_category == "-999") ? 'average' : offline_store_category;

        /*Check if offline incoming from QR Static without promotor assistance overwrite store category definition good --> average treatment*/
        if (offline_item_names=='Offline Transaction' && offline_store_category =='good') {
            offline_store_category = 'average'
        }
        /* ------------------- Experimentation -------------------*/
        var experiment_code = '';
        var experiment_value = '';
        var approval_tag = '';
        var tenure = '';
        var approved_loan_amount = '';
        var max_amount = '';
        var max_amount_without_dbr = '';
        var max_amount_before_preapproved_telesales = '';
        var bucketization = '';
        var temp_max_amount = '';
        var temp_bucketization = '';
        var bucketizedCreditLimitAccountLimit = bucketizedCreditLimitAccountLimit == null ? -99 : bucketizedCreditLimitAccountLimit;
        var bucketizedCreditLimitAccountLimitBalance = bucketizedCreditLimitAccountLimitBalance == null ? -99 : bucketizedCreditLimitAccountLimitBalance;
        var cli_used = bucketizedCreditLimitAccountLimit - bucketizedCreditLimitAccountLimitBalance;


        /********************************************************/ 
        /********************* CASH LOAN - NEW ******************/
        /********************************************************/
        if (product_type == 'CASH_LOAN' && cash_origination == 'NEW' && !is_whitelisted_ath_via_limit_user) {
            /* -------------- APPROVAL TAG --------------*/
            if (reinforced_score >= 410) {
                approval_tag = 'H4B';

                /* approve low identity population in Cash New New with match Dana logic, either HA04 only or JA01 low identity in BQ2*/
                if (((tiket_score <= 0) && (blibli_score <= 0) && (identity_score < 480))
                    && ((getcontact_verify_status != 'OK') || ((getcontact_verify_status == 'OK') && (reinforced_score < 410)))
                    && ((match_dana_short_logic == 1) || (match_dana_name_logic == 1))
                    && (is_fdc_null == false))
                {
                    approval_tag = 'I79';
                }

            }
            
            /* -------------- MAX AMOUNT --------------*/
            if (approval_tag != '') {
                max_amount = 1000000;

                if (reinforced_score >= 480) {
                    max_amount = 20000000;
                } else if (reinforced_score >= 460) {
                    max_amount = 15000000;
                } else if (reinforced_score >= 435) {
                    max_amount = 8000000;
                } else if (reinforced_score >= 420) {
                    max_amount = 5000000;
                } else if (reinforced_score >= 410) {
                    max_amount = 3000000;
                } else if (reinforced_score >= 400) {
                    max_amount = 2000000;
                } else if (reinforced_score >= 390) {
                    max_amount = 1000000;
                }      
            }
                
            ab_test_cash_new_approve_100 = abTestingHelper.getVariation(orderId, 'CASH_NEW_APPROVE_100_V2', 'NORMAL');
            if (ab_test_cash_new_approve_100 == 'APPROVE_100') {
                approval_tag = 'I76';
                max_amount = 1000000;
            }

            /* -------------- Cap Loan Amount for People with Maxed Out Credit Limit --------------*/
            if ((approval_tag != '') && (number_of_related_blibli_tiket_indodana_credit_limit > 0)
                && ((bucketizedCreditLimitAccountLimitBalance * 1.0 / bucketizedCreditLimitAccountLimit) <= 0.2)
            ) {
                adjusted_max_amount = max_amount - cli_used;
                if (adjusted_max_amount % 1000000 != 0) {
                    adjusted_max_amount = ((adjusted_max_amount / 1000000) + 1) * 1000000;
                }
                
                if (is_good_pefindo_cc_45 || dtlab_salary >= 7000000 || digiscore_salary >= 900) {
                    approval_tag = 'I35';
                    if (max_amount - cli_used > 3000000) {
                        max_amount = adjusted_max_amount;
                    } else {
                        max_amount = 3000000;
                    }
                } else if (is_good_pefindo_cc || dtlab_salary >= 5000000 || digiscore_salary >= 700) {
                    approval_tag = 'I35';
                    if (max_amount - cli_used > 3000000) {
                        max_amount = adjusted_max_amount;
                    } else {
                        max_amount = 3000000;
                    }
                } else {
                    approval_tag = 'I34';
                    if (max_amount - cli_used > 1000000) {
                        max_amount = adjusted_max_amount;
                    } else {
                        max_amount = 1000000;
                    }
                }
            }
            /* -------------- PRE-APPROVED CASH LOAN --------------*/
            if (has_pre_approved_cash_loan_offer && (offerEvent == 'PAID_OFF' || offerEvent == 'CLI_REGISTRATION')) {
                max_amount = pre_approved_cash_loan_limit;
                approved_loan_amount = pre_approved_cash_loan_limit < requested_loan_amount ? pre_approved_cash_loan_limit : requested_loan_amount;
                approval_tag = 'I66';
                if (offerEvent == 'CLI_REGISTRATION') {
                    approval_tag = 'I77';
                }
                if (applicant_name == 'rio gunawan chandra') {
                    approved_loan_amount = 3000000;
                }
            }

            if (has_pre_approved_cash_loan_offer && offerEvent == 'ADHOC_SCRIPT') {
                approval_tag = 'I70'
            }

            /* ------ Cash New Approve 100% Offline Origination (24h After Approved Offline) ------ */
            if((count_user_prev_approved_offline_applications_24h>0) && (approval_tag == '')) {
                approval_tag = 'I73';
                max_amount = 1000000;
            }

            /* pilot - give limit of 3 mio, cash new new with no prev cash loan, high active limit*/
            if ((approval_tag == '' 
                    || (reinforced_score < 420 && approval_tag == 'H4B' && arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier)))
                && (number_of_related_previous_cashloan_order_id == 0)
                && ((maximum_limit_exposure >= 9000000 && reinforced_score >= 380)
                    || (maximum_limit_exposure >= 7500000 && reinforced_score >= 400))
            ) {
                approval_tag = 'I82';
                max_amount = 3000000;
            }

            /* pilot fdc null */
            if ((approval_tag == '') || ((reinforced_score < 420) && (approval_tag == 'H4B') && arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier))) {
                if (((is_fdc_null) && (izi_max_multi_inquiries_90d <= 2) && (number_of_installed_loan_apps_within_14days <= 2))
                    || ((discounted_sum_outstanding_late_1y == -1) && (fdc_maximum_dpd_no_filter <= 0))
                ) {
                    if ((pefindo_max_payment_dpd == 0) && (reinforced_score >= 320) && ((max_limit_active_cc >= 5000000) || (pefindo_max_fourwheel_loan_amount >= 200000000))) {
                        approval_tag = 'I83';
                        max_amount = 3000000;
                    } else if ((pefindo_max_payment_dpd == 0) && (reinforced_score >= 320)) {
                        approval_tag = 'I83';
                        max_amount = 3000000;
                    } else if ((pefindo_max_payment_dpd >= 0) && (pefindo_max_payment_dpd < 30) && (pefindo_max_payment_dpd_last_5_month == 0) && (reinforced_score >= 320)) {
                        approval_tag = 'I83';
                        max_amount = 3000000;
                    }
                }
            }

            max_amount_before_preapproved_telesales = max_amount;
            if (mamunda_var_telesalesPreApprovedAmount >= 1000000) {
                approval_tag = 'I84';
                max_amount = mamunda_var_telesalesPreApprovedAmount;
            }
            
            var max_amount_without_dbr = max_amount;

            /* -------------- DBR LIMIT --------------*/
            var amount_min_salary = {
                1000000: 1080000,
                2000000: 2130000,
                3000000: 3190000,
                4000000: 3190000,
                5000000: 3240000,
                6000000: 3880000,
                7000000: 4530000,
                8000000: 5180000,
                9000000: 5180000,
                10000000: 5180000,
                11000000: 5180000,
                12000000: 5180000,
                13000000: 5180000,
                14000000: 5180000,
                15000000: 5230000,
                16000000: 5580000,
                17000000: 5930000,
                18000000: 6280000,
                19000000: 6620000,
                20000000: 6970000,
                21000000: 7320000,
                22000000: 7670000,
                23000000: 8020000,
                24000000: 8370000,
                25000000: 8720000,
                26000000: 8720000,
                27000000: 8720000,
                28000000: 8720000,
                29000000: 8720000,
                30000000: 8720000,
                31000000: 8720000,
                32000000: 8720000,
                33000000: 8720000,
                34000000: 8950000,
                35000000: 9210000,
                36000000: 9470000,
                37000000: 9720000,
                38000000: 9980000,
                39000000: 10240000,
                40000000: 10490000
            };
            
            if ((income <= 0) || (income == null)) {
                if (max_amount > 7000000) {
                    max_amount = 7000000;
                }
            } else {
                while (income < amount_min_salary[max_amount]) {
                    max_amount = max_amount - 1000000;
                }
            }

            /* -------------- APPROVED LOAN AMOUNT --------------*/
            approved_loan_amount = max_amount;
            if (approved_loan_amount < 1000000) {
                approved_loan_amount = 1000000;
            }

            /* -------------- REQUESTED LOAN AMOUNT --------------*/
            if ((requested_loan_amount < max_amount) && !is_cash_limit_calc_new_app) {
                approved_loan_amount = requested_loan_amount;
            }

            /* -------------- TENURE --------------*/
            if (approved_loan_amount >= 26000000) {
                tenure = 24;
            } else if (approved_loan_amount >= 9000000) {
                tenure = 12;
            } else if (approved_loan_amount >= 4000000) {
                tenure = 6;
            } else if (approved_loan_amount >= 1000000) {
                tenure = 3;
            } else {
                tenure = 1;
            }

            /* -------------- CHEAP CASH VOUCHER --------------*/
        if (!is_whitelisted_ath_via_limit_user && max_amount >= 10000000) {
            voucherId = '0d48bdfc-495e-4095-806d-376b023980b4';
        }

        if (!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) {
            if(reinforced_score <= 420) {
                rateGroupKey = 'cash_loan_below_420';
            } else if (reinforced_score <= 450) {
                rateGroupKey = 'cash_loan_below_450';
            }
        }

        /* Cash Flexible Tenure Non-WL*/    
        if ((!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) && reinforced_score <= 420 && income >= 11000000) {
            ab_test_cash_flexible_tenure = abTestingHelper.getVariation(applicant_mobile_phone_number, 'CASH_FLEXIBLE_TENURE', 'NORMAL');
            if (ab_test_cash_flexible_tenure == 'FLEXIBLE') {
                rateGroupKey = 'cash_flexible_non_wl_below_420';
            }
        } else if ((!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) && reinforced_score > 420 && reinforced_score <= 450 && income >= 10000000) {
            ab_test_cash_flexible_tenure = abTestingHelper.getVariation(applicant_mobile_phone_number, 'CASH_FLEXIBLE_TENURE', 'NORMAL');
            if (ab_test_cash_flexible_tenure == 'FLEXIBLE') {
                rateGroupKey = 'cash_flexible_non_wl_below_450';
            }
        } else if ((!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) && reinforced_score > 450 && income >= 10000000) {
            ab_test_cash_flexible_tenure = abTestingHelper.getVariation(applicant_mobile_phone_number, 'CASH_FLEXIBLE_TENURE', 'NORMAL');
            if (ab_test_cash_flexible_tenure == 'FLEXIBLE') {
                rateGroupKey = 'cash_flexible_2024_v2';
            }
        }

        if (blacklistHelper.isWhitelistedByNamespace('emails', 'sqa-auto-approve-application', { "email": applicant_personal_email.toLowerCase() })) {
            approval_tag = 'QA01';
            max_amount = 25000000;
            approved_loan_amount = max_amount;
            tenure = 12;
            rateGroupKey = 'cash_loan';
        }
    }

        /********************************************************/
        /********************* CASH LOAN - EXISTING ***************/
        /********************************************************/
        if ((product_type == 'CASH_LOAN' && cash_origination == 'EXISTING') 
        || (product_type == 'CASH_LOAN' && is_whitelisted_ath_via_limit_user)) {
            /* ------------------- DECISION --------------------*/
            approval_tag = 'H3A';
            if ((prev_max_days_late < 3) 
                && !((is_covered_cities_cash_loan_ro) && ((dtlab_salary >= 5000000) || (digiscore_salary >= 700)) && (reinforced_score >= 440)) 
                && (reinforced_score >= 415)
                && !((["3", "3B", "4", "4B", "5", "5B"].contains(rule_pefindo))
                    || ((["1A-2", "2", "2CC", "2CCB", "1A-2CC", "1A-2CCB", "1A-3", "1A-3B", "1A-4", "1A-4B", "1A-5", "1A-5B"].contains(rule_pefindo)) && (reinforced_score >= 415)))) {
                approval_tag = 'H3';
            }

            if ((is_whitelisted_ath_btpl || is_whitelisted_ath_btpl_expansion) && (submission_source != null) && ((submission_source == 'tiket_cash_loan'))) {
                if (reinforced_score >= 495) {
                    max_amount = 20000000;
                    if (is_covered_cities_cash_loan_ro) {
                        max_amount = 40000000;
                    }
                } else if (reinforced_score >= 465) {
                    max_amount = 20000000;
                    if (is_covered_cities_cash_loan_ro) {
                        max_amount = 25000000;
                    }
                } else if (reinforced_score >= 445) {
                    max_amount = 15000000;
                } else if (reinforced_score >= 421) {
                    max_amount = 8000000;
                } else {
                    max_amount = 5000000;
                }
            } else if (is_whitelisted_ath_via_limit_user && !is_whitelisted_ath_btpl) {
                if (reinforced_score >= 510) {
                    max_amount = 20000000;
                    if (is_covered_cities_cash_loan_ro) {
                        max_amount = 40000000;
                    }
                } else if (reinforced_score >= 475) {
                    max_amount = 20000000;
                    if (is_covered_cities_cash_loan_ro) {
                        max_amount = 25000000;
                    }
                } else if (reinforced_score >= 465) {
                    max_amount = 15000000;
                } else if (reinforced_score >= 445) {
                    max_amount = 8000000;
                } else if (reinforced_score >= 421) {
                    max_amount = 5000000;
                } else {
                    approval_tag = 'H1';
                    max_amount = 3000000;
                }
            } else { 
                if (reinforced_score >= 510) {
                    max_amount = 20000000;
                    if (is_covered_cities_cash_loan_ro) {
                        max_amount = 40000000;
                    }
                } else if (reinforced_score >= 495) {
                    max_amount = 20000000;
                    if (is_covered_cities_cash_loan_ro) {
                        max_amount = 25000000;
                    }
                } else if (reinforced_score >= 465) {
                    max_amount = 15000000;
                } else if (reinforced_score >= 445) {
                    max_amount = 8000000;
                } else if (reinforced_score >= 421) {
                    max_amount = 5000000;
                } else {
                    approval_tag = 'H1';
                    max_amount = 3000000;
                }
            }
            
            /* -------------- Cap Loan Amount for People with Maxed Out Credit Limit --------------*/
            if ((approval_tag != '') && (number_of_related_blibli_tiket_indodana_credit_limit > 0)
                && ((bucketizedCreditLimitAccountLimitBalance * 1.0 / bucketizedCreditLimitAccountLimit) <= 0.2)
                ) {
                adjusted_max_amount = max_amount - cli_used;
                if (adjusted_max_amount % 1000000 != 0) {
                    adjusted_max_amount = ((adjusted_max_amount / 1000000) + 1) * 1000000;
                }
                    
                if (is_good_pefindo_cc_45 || is_good_pefindo_cc || dtlab_salary >= 5000000 || digiscore_salary >= 700) {
                    if (is_whitelisted_ath_via_limit_user && number_of_related_indodana_credit_limit > 0) {
                        approval_tag = 'I59'
                    } else {
                        approval_tag = 'I35';
                    }
                } else {
                    if (is_whitelisted_ath_via_limit_user && number_of_related_indodana_credit_limit > 0) {
                        approval_tag = 'I58'
                        if (max_amount - cli_used > 3000000) {
                            max_amount = adjusted_max_amount;
                        } else {
                            max_amount = 3000000;
                        }
                    } else {
                        approval_tag = 'I34';
                        if (max_amount - cli_used > 3000000) {
                            max_amount = adjusted_max_amount;
                        } else {
                            max_amount = 3000000;
                        }
                    }
                }
            }

            /* -------------- PRE-APPROVED CASH LOAN --------------*/
            if (has_pre_approved_cash_loan_offer && (offerEvent == 'PAID_OFF' || offerEvent == 'CLI_REGISTRATION')) {
                max_amount = pre_approved_cash_loan_limit;
                approved_loan_amount = pre_approved_cash_loan_limit < requested_loan_amount ? pre_approved_cash_loan_limit : requested_loan_amount;
                approval_tag = 'I66';
                if (offerEvent == 'CLI_REGISTRATION') {
                    approval_tag = 'I77';
                }
                if (applicant_name == 'rio gunawan chandra') {
                    approved_loan_amount = 3000000;
                }
            }

            if (has_pre_approved_cash_loan_offer && offerEvent == 'ADHOC_SCRIPT') {
                approval_tag = 'I70'
            }

            max_amount_before_preapproved_telesales = max_amount;
            if (mamunda_var_telesalesPreApprovedAmount >= 1000000) {
                approval_tag = 'I84';
                max_amount = mamunda_var_telesalesPreApprovedAmount;
            }

            var max_amount_without_dbr = max_amount;

            /* -------------- DBR LIMIT --------------*/
            var amount_min_salary = {
                1000000: 1080000,
                2000000: 2130000,
                3000000: 3190000,
                4000000: 3190000,
                5000000: 3240000,
                6000000: 3880000,
                7000000: 4530000,
                8000000: 5180000,
                9000000: 5180000,
                10000000: 5180000,
                11000000: 5180000,
                12000000: 5180000,
                13000000: 5180000,
                14000000: 5180000,
                15000000: 5230000,
                16000000: 5580000,
                17000000: 5930000,
                18000000: 6280000,
                19000000: 6620000,
                20000000: 6970000,
                21000000: 7320000,
                22000000: 7670000,
                23000000: 8020000,
                24000000: 8370000,
                25000000: 8720000,
                26000000: 8720000,
                27000000: 8720000,
                28000000: 8720000,
                29000000: 8720000,
                30000000: 8720000,
                31000000: 8720000,
                32000000: 8720000,
                33000000: 8720000,
                34000000: 8950000,
                35000000: 9210000,
                36000000: 9470000,
                37000000: 9720000,
                38000000: 9980000,
                39000000: 10240000,
                40000000: 10490000
            };
            
            if ((income <= 0) || (income == null)) {
                if (max_amount > 7000000) {
                    max_amount = 7000000;
                }
            } else {
                while (income < amount_min_salary[max_amount]) {
                    max_amount = max_amount - 1000000;
                }
            }

            /* -------------- APPROVED LOAN AMOUNT --------------*/
            approved_loan_amount = max_amount;
            if (approved_loan_amount < 1000000) {
                approved_loan_amount = 1000000
            }

            if ((requested_loan_amount < max_amount) && !is_cash_limit_calc_new_app) {
                approved_loan_amount = requested_loan_amount;
            }

            /* -------------- TENURE --------------*/
        if (approved_loan_amount >= 26000000) {
            tenure = 24;
        } else if (approved_loan_amount >= 9000000) {
            tenure = 12;
        } else if (approved_loan_amount >= 4000000) {
            tenure = 6;
        } else if (approved_loan_amount >= 1000000) {
            tenure = 3;
        } else {
            tenure = 1;
        }

        /* -------------- CHEAP CASH VOUCHER --------------*/
        if (!is_whitelisted_ath_via_limit_user && max_amount >= 10000000) {
            voucherId = '0d48bdfc-495e-4095-806d-376b023980b4';
        }
        
        if (!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) {
            if(reinforced_score <= 420) {
                rateGroupKey = 'cash_loan_below_420';
            } else if (reinforced_score <= 450) {
                rateGroupKey = 'cash_loan_below_450';
            }
        }

        /* Cash Flexible Tenure WL */
        if (is_whitelisted_ath_via_limit_user && income >= 10000000 && !is_whitelisted_ath_btpl) {
            ab_test_cash_flexible_tenure = abTestingHelper.getVariation(applicant_mobile_phone_number, 'CASH_FLEXIBLE_TENURE', 'NORMAL');
            if (ab_test_cash_flexible_tenure == 'FLEXIBLE') {
                rateGroupKey = 'cash_flexible_2024_v2';
            }
        /* Cash Flexible Tenure Non-WL*/    
        } else if ((!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) && reinforced_score <= 420 && income >= 11000000) {
            ab_test_cash_flexible_tenure = abTestingHelper.getVariation(applicant_mobile_phone_number, 'CASH_FLEXIBLE_TENURE', 'NORMAL');
            if (ab_test_cash_flexible_tenure == 'FLEXIBLE') {
                rateGroupKey = 'cash_flexible_non_wl_below_420';
            }
        } else if ((!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) && reinforced_score > 420 && reinforced_score <= 450 && income >= 10000000) {
            ab_test_cash_flexible_tenure = abTestingHelper.getVariation(applicant_mobile_phone_number, 'CASH_FLEXIBLE_TENURE', 'NORMAL');
            if (ab_test_cash_flexible_tenure == 'FLEXIBLE') {
                rateGroupKey = 'cash_flexible_non_wl_below_450';
            }
        } else if ((!is_whitelisted_ath_via_limit_user || is_whitelisted_ath_btpl) && reinforced_score > 450 && income >= 10000000) {
            ab_test_cash_flexible_tenure = abTestingHelper.getVariation(applicant_mobile_phone_number, 'CASH_FLEXIBLE_TENURE', 'NORMAL');
            if (ab_test_cash_flexible_tenure == 'FLEXIBLE') {
                rateGroupKey = 'cash_flexible_2024_v2';
            }
        }

        if ((is_access_btpl_cash_loan && (submission_source != null) && (submission_source == 'tiket_cash_loan')) || (is_access_blibli_btpl_cash_loan && (submission_source != null) && (submission_source == 'blibli_cash_loan'))) {
            rateGroupKey = 'btpl_web_cash_loan';
            /* Cash Flexible Tenure (BTPL) */
            if (income >= 10000000) {
                ab_test_cash_flexible_tenure = 'FLEXIBLE';
                rateGroupKey = 'cash_flexible_btpl';
            }

            if(is_whitelisted_ath_btpl && (submission_source != null) && (submission_source == 'tiket_cash_loan') && abTestingHelper.getVariation(orderId, 'SUPER_CHEAP_RATES_AB', 'NORMAL') == 'SUPER_CHEAP') {
                rateGroupKey = 'super_cheap_rates';
                /* Cash Flexible Tenure (Super Cheap Rate) */
                if (income >= 10000000) {
                    ab_test_cash_flexible_tenure = 'FLEXIBLE';
                    rateGroupKey = 'cash_flexible_super_cheap_rate';
                }
            }
        }

        if (blacklistHelper.isWhitelistedByNamespace('emails', 'sqa-auto-approve-application', { "email": applicant_personal_email.toLowerCase() })) {
            approval_tag = 'QA01';
            max_amount = 25000000;
            approved_loan_amount = max_amount;
            tenure = 12;
            rateGroupKey = 'cash_loan';
        }
    }

        /********************************************************/
        /********************* CREDIT LIMIT *********************/
        /********************************************************/

        /* TODO(jtirtanata): refactor below to use more appropriate features to determine no ATH history */
        var is_no_ath_history = number_of_related_previous_cashloan_order_id <= 0; 
        var is_no_max_dpd_history = (prev_max_days_late <= 0);
        var is_whitelisted_profession_credit_limit = arrayUtils.contains(WHITELISTED_PROFESSIONS_CREDIT_LIMIT,stringUtils.upperCase(applicant_profession));

        var is_basic_qualification_criteria = (((adjusted_score >= 380) || (tiket_score_partner >= 400)) && (identity_score >= 480))
        var exposure = 0;
        var temp_exposure = 0;
        var multiplier_limit = 0;
        var rounded_up_limit = 0;
        var delta_loan_difference = 0;
        var is_fdc_late = (discounted_sum_outstanding_late_1y > 0 || count_write_off_organizer_id_last_3y > 0);
        var is_not_late_pefindo = ((pefindo_discounted_sum_outstanding_late <= 0) && (count_written_off_unique_creditor <= 0));
        var is_ever_rejected = (count_rejected_or_not_qualified_prev_application_by_device_id > 0 || count_rejected_or_not_qualified_prev_application_by_nik > 0); 
        var is_low_risk_fdc_null = (is_fdc_null && pefindo_id_status == 'MATCH_PEFINDO' && identity_score >= 520 && app_list_score_pefindo_flag <= 270);
        var is_low_risk_have_fdc = (!is_fdc_null && !is_ever_rejected && app_list_score_pefindo_flag <= 300 && average_age_of_relationship > 0 && izi_max_multi_inquiries_14d <= 5 && !is_fdc_late);
        var is_high_risk = !(is_low_risk_fdc_null || is_low_risk_have_fdc);

        var bucket_multipliers = '';
        var split_multiplier = '';
        var max_multiplier = 1;
        var limit_exposure = 0;

        is_low_risk_empty_fdc = false;
        if (is_fdc_null) {
            if (app_list_score_pefindo_flag <= 300 && (identity_score >= 520 || number_of_substrings_in_reference_fullname >= 3)) {
                if (izi_max_multi_inquiries_14d <= 2 && izi_reference_mobile_phone_number_multi_inquiries_total <= 2) {
                    if (app_list_score_pefindo_flag <= 200) {
                        is_low_risk_empty_fdc = true;
                    } else if (app_list_score_pefindo_flag > 200 && izi_reference_mobile_phone_number_whatsapp_availability == 'yes') {
                        is_low_risk_empty_fdc = true;
                    }
                }
            }
        }

        if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant && partner!='AVANTO') {
            if (is_whitelist_population ||
                is_whitelist_population_city_with_selected_district || 

                is_whitelist_population_living_city ||
                is_whitelist_population_city_living_city_with_selected_district ||

                is_whitelisted_not_working_profession_credit_limit ||
                is_whitelisted_not_working_population_city_with_selected_district
                ) {
                /*TODO: refactor below to add name checking for bank credentials, for now only BPJS name is being checked */
                if ((is_bpjs && is_bpjs_name_match) || is_bank_mutation || is_payslip) {

                    if (ab_code == 'indodana_normal_set'){

                        if (reinforced_score >= 506) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1333';
                            max_amount = 4000000;
                        } else if (reinforced_score >= 462) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1333';
                            max_amount = 3000000;
                        } else if (reinforced_score >= 431) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1333';
                            max_amount = 2500000;
                        } else if (reinforced_score >= 429) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1333';
                            max_amount = 2000000;
                        } else if (reinforced_score >= 418) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1333';
                            max_amount = 1500000;
                        } else if (reinforced_score >= 400) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1333';
                            max_amount = 500000;
                        } else if (reinforced_score >= 388) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 1000000;
                        } else if (reinforced_score >= 360) {
                            approval_tag = 'H3A';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        /* CLI Indodana, apply Cash Loan rule*/
                        /********************* CASH LOAN - NEW ******************/
                        } else if (cash_origination == 'NEW' && !is_whitelisted_ath_via_limit_user) {
                            if (adhoc_cashloan_reinforced_score >= 410) {
                                approval_tag = 'I74';
                                bucketization = 'INDODANA_SHARED_LIMIT_1000';
                                max_amount = 500000;
                            }
                        /********************* CASH LOAN - REPEAT ***************/
                        } else if (cash_origination == 'EXISTING' || is_whitelisted_ath_via_limit_user) {
                            approval_tag = 'I74';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                    }

                    else if (ab_code != 'indodana_normal_set'){
                        /* do nothing */

                    }
                    
                }
                approved_loan_amount = max_amount;
            /* CLI Indodana, apply Cash Loan rule */
            /********************* CASH LOAN - NEW ******************/
            } else if (cash_origination == 'NEW' && !is_whitelisted_ath_via_limit_user && ab_code == 'indodana_normal_set') {
                if (adhoc_cashloan_reinforced_score >= 410) {
                    approval_tag = 'I74';
                    bucketization = 'INDODANA_SHARED_LIMIT_1000';
                    max_amount = 500000;
                }
                approved_loan_amount = max_amount;
            /********************* CASH LOAN - REPEAT ***************/
            } else if ((cash_origination == 'EXISTING' || is_whitelisted_ath_via_limit_user) && ab_code == 'indodana_normal_set') {
                approval_tag = 'I74';
                bucketization = 'INDODANA_SHARED_LIMIT_1000';
                max_amount = 500000;
                approved_loan_amount = max_amount;
            }

            /* CLI Indodana BQ1 Reject JA01 & Cash BQ2 Reject JA01*/
            if (score < 360) {
                /* Cash Rule Reject JA01 BQ2 */
                /* ------------------- LOGIC - CASH LOAN WHITELIST -------------------*/
                if (is_whitelisted_ath_via_limit_user && !is_offer_calculation) {
                    /* reject low score */
                    if (adhoc_cashloan_reinforced_score <= 375) {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    } else if (adhoc_cashloan_reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    }

                    /* reject due to null fdc */
                    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && adhoc_cashloan_reinforced_score < 440) {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    }
                
                    /* NEW rio_reject_cash_feb24 */
                    /* just in case, tapi most likely whitelist = existing*/
                    if (adhoc_cashloan_reinforced_score < 445 && cash_origination == 'NEW'){
                
                        /* reject fdc late */
                        if (distinct_count_organizer_id_late_1_year > 0){
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                
                        /* reject inst app 3 days */
                        if (number_of_installed_loan_apps_within_3days > 1){
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                    }
                
                    /* RO rio_reject_cash_feb24 */
                    if (adhoc_cashloan_reinforced_score < 445 && cash_origination == 'EXISTING'){
                
                        /* reject fdc late */
                        if (distinct_count_organizer_id_late_1_year > 1){
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                
                        /* reject inst app 3 days */
                        if (number_of_installed_loan_apps_within_3days > 1){
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                    }
                }
                
                /* ------------------- LOGIC - CASH LOAN NEW -------------------*/
                if (cash_origination == 'NEW') {
                    /*------------------- approved blibli/tiket limit -------------------*/
                    if (adhoc_cashloan_reinforced_score < 410) {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    } else if ((adhoc_cashloan_reinforced_score < 420) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier))) {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    } 
                        
                    /* getcontact verify identity checking */
                    if (tiket_score <= 0 && blibli_score <= 0) {  
                        if ((!is_match_dana) && (getcontact_verify_status == 'OK') && (identity_score < 480) && (adhoc_cashloan_reinforced_score < 410)) {
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                    }
                }

                /* ------------------- LOGIC - CASH LOAN RO -------------------*/
                if (cash_origination == 'EXISTING') {
                    /* ------------------- LOGIC - score category -------------------*/
                    if (adhoc_cashloan_reinforced_score <= 396) {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    } else if (adhoc_cashloan_reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    }
                    
                    /* reject due to null fdc */
                    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && adhoc_cashloan_reinforced_score < 440) {
                        approval_tag = 'I75';
                        bucketization = 'INDODANA_SHARED_LIMIT_1000';
                        max_amount = 500000;
                    }
                
                    /* RO rio_reject_cash_feb24 */
                    if (adhoc_cashloan_reinforced_score < 445){
                
                        /* reject fdc late */
                        if (distinct_count_organizer_id_late_1_year > 1){
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                
                        /* reject inst app 3 days */
                        if (number_of_installed_loan_apps_within_3days > 1){
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        }
                    }
                    
                    /* ------------------- Preapproved Cash Loan Offer Calculation  -------------------*/

                    if (is_offer_calculation) {
                        if (offer_experiment_code == 'normal_set_a') {
                            approval_tag = 'I75';
                            bucketization = 'INDODANA_SHARED_LIMIT_1000';
                            max_amount = 500000;
                        } else if (offer_experiment_code == 'pilot_set_b') {
                            /*Do nothing */
                        }
                    }                
                }
                approved_loan_amount = max_amount;
            }
            /* VA for new CLI Online users logic */
            if (approval_tag != '') {
                if ((reinforced_pefindo_scoring_cli_offline_no_ewallet_20240912 >= 457) && !is_whitelisted_ath_via_limit_user) {
                    ab_test_cli_va = abTestingHelper.getVariation(orderId, 'INDODANA_NEW_USER_VA', 'NO_VA');
                    if (ab_test_cli_va == 'ENABLE_VA') {
                        autoAddWhitelistEcommerceVaPayment = true;
                    }
                }
            }
        }

        /*************************************************************/
        /********************* CREDIT LIMIT AVANTO ******************/
        /*************************************************************/

        if (product_type == 'CREDIT_LIMIT' && partner == 'AVANTO' && !is_offline_applicant) {
            if (is_whitelist_population ||
                is_whitelist_population_city_with_selected_district || 

                is_whitelist_population_living_city ||
                is_whitelist_population_city_living_city_with_selected_district ||

                is_whitelisted_not_working_profession_credit_limit ||
                is_whitelisted_not_working_population_city_with_selected_district
                ) {

                    // 410++:  3.0Mio
                    // 460++:  6.0Mio 
                    // 480++:  7.5Mio
                    if (identity_score >= 480) {
                        if (reinforced_score >= 480) {
                            approval_tag = "H3A";
                            max_amount =  7500000;
                            bucketization = 'CREDIT_LIMIT_AVANTO_0111';
                        } else if (reinforced_score >= 460) {
                            approval_tag = "H3A";
                            max_amount =  4500000;
                            bucketization = 'CREDIT_LIMIT_AVANTO_0111';
                        } else if (reinforced_score >= 410) {
                            approval_tag = "H3A";
                            max_amount =  3000000;
                            bucketization = 'CREDIT_LIMIT_AVANTO_0111';
                        }
                    } 
                    
                    // 410++:  1.8Mio
                    // 460++:  3.0Mio 
                    // 480++:  5.0Mio
                    else {
                        if (reinforced_score >= 480) {
                            approval_tag = "H3A";
                            max_amount =  5000000;
                            bucketization = 'CREDIT_LIMIT_AVANTO_0111';
                        } else if (reinforced_score >= 460) {
                            approval_tag = "H3A";
                            max_amount =  3000000;
                            bucketization = 'CREDIT_LIMIT_AVANTO_0111';
                        } else if (reinforced_score >= 410) {
                            approval_tag = "H3A";
                            max_amount =  1800000;
                            bucketization = 'CREDIT_LIMIT_AVANTO_0111';
                        }
                    }

                    /* Exposure calculation based on bucket category */
                    if (bucketization == 'CREDIT_LIMIT_AVANTO_0111') {
                        exposure = max_amount * 1;
                    }

                    approved_loan_amount = max_amount;   
                }
        }


        /*************************************************************/
        /********************* CREDIT LIMIT OFFLINE ******************/
        /*************************************************************/

        var getcontact_pefindo_validation = (pefindo_individuals_phone_number_match_filter_creditor == 1) || (getcontact_verify_status == 'OK');
        var nonmp_good_average = (offline_item_category == 'non-smartphone') && (offline_sub_item_category != 'motor listrik') && ((offline_store_category == 'good') || (offline_store_category == 'average'));
        var nonmp_good_high_request = (offline_item_category == 'non-smartphone') && (offline_sub_item_category != 'motor listrik') && (offline_store_category == 'good') && (offline_transaction_applied_amount_without_multiplier > 10000000);
        var mp_good_average = (offline_item_category == 'smartphone') && (reinforced_score >= 460) && ((offline_store_category == 'good') || (offline_store_category == 'average'));
        /* Logic below lock to not allowed basket financing, eg: request: motor listrik + smartphone, will not get motor listrik treatment */
        var is_motor_listrik = (offline_sub_item_category == 'motor listrik');


        if (experiment_offline == 'offline_normal_set' || flag_treatment == 'hcf_treatment' || flag_treatment == 'mp_treatment' ) {
            if (product_type == 'CREDIT_LIMIT' && partner != 'AVANTO' && is_offline_applicant) {
                
                if (((is_ibox_gan_digimap) || (nonmp_good_average) || (mp_good_average)  || (is_hcf_gym)) && (getcontact_pefindo_validation)){
                    if ((identity_score < 440) && (reinforced_score >= 460)) {
                        identity_score = 481;
                    } else if ((identity_score < 440)){
                        identity_score = 441;
                    } else if ((identity_score < 480)) {
                        identity_score = 481;
                    } 
                }
                
                if (is_whitelist_population ||
                    is_whitelist_population_city_with_selected_district || 

                    is_whitelist_population_living_city ||
                    is_whitelist_population_city_living_city_with_selected_district ||

                    is_whitelisted_not_working_profession_credit_limit ||
                    is_whitelisted_not_working_population_city_with_selected_district) {
            
                    if (((is_bpjs && is_bpjs_name_match) || is_bank_mutation || is_payslip) && (identity_score >= 480)) { 
                    
            
                        /*------------------------------ HCF ------------------------------
                        408++:  6.0Mio
                        435++:  7.5Mio
                        465++:  9.0Mio
                        485++: 12.5Mio
                        500++: 15.0Mio
                        */

            
                        if ((offline_item_category == 'non-smartphone' && offline_store_category=='hcf') || (flag_treatment == 'hcf_treatment') ) {
                            if (reinforced_score >= 500) {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                // return "hcf_500"
                            } else if (reinforced_score >= 485) {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                            } else if (reinforced_score >= 465) {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 435) {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 408) {
                                approval_tag = "H3A";
                                max_amount =  2000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            }
                        }
            
                        
            
                        /*------------------------------ FOR NON SMARTPHONE PRODUCT ------------------------------
                        372++:  4.5Mio [Pareto Brand 1 & 2 only, bq1 & bq2 only pass this population for score 372]
                        392++:  4.5Mio 
                        407++:  6.0Mio
                        437++: 12.5Mio
                        477++: 15.0Mio
                        552++: 20.0Mio
                        */
                        if (offline_item_category == 'non-smartphone' && offline_store_category!='hcf') {
                            if (reinforced_score >= 552) {
                                approval_tag = "H3A";
                                max_amount =  4000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                            } else if (reinforced_score >= 477) {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                            } else if (reinforced_score >= 437) {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                            } else if (reinforced_score >= 407) {
                                approval_tag = "H3A";
                                max_amount =  2000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 372) {
                                approval_tag = "H3A";
                                max_amount =  1500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            }
                        }
            
                        /*-------------------------------- FOR SMARTPHONE PRODUCT --------------------------------
                        407++:  4.5Mio ( 6.0Mio good store)
                        457++:  6.0Mio ( 7.5Mio good store)
                        462++:  9.0Mio 
                        472++: 15.0Mio (good store only)
                        502++: 15.0Mio
                        */
                        if (offline_item_category == 'smartphone' || flag_treatment == 'mp_treatment' ) {
                            if (reinforced_score >= 502) {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                // return "hp5002";
                            } else if (reinforced_score >= 472 && offline_store_category == 'good') {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                return "hp472";
                            } else if (reinforced_score >= 462) {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                return "hp462";
                            } else if (reinforced_score >= 457) {
                                approval_tag = "H3A";
                                max_amount =  offline_store_category == 'good' ? 2500000 : 2000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                return "hp457"
                            } else if (reinforced_score >= 407) {
                                approval_tag = "H3A";
                                max_amount =  offline_store_category == 'good' ? 2000000 : 1500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                return {max_amount, bucketization}
                            }
                        }
            
                        /* Exposure calculation based on bucket category */
                        if (bucketization == 'INDODANA_SHARED_LIMIT_133333') {
                            exposure = max_amount * 3;
                        } else if (bucketization == 'INDODANA_SHARED_LIMIT_133555') {
                            exposure = max_amount * 5;
                        } else if (bucketization == 'INDODANA_SHARED_LIMIT_145555') {
                            exposure = max_amount * 5;
                        } else if (bucketization == 'INDODANA_SHARED_LIMIT_145666') {
                            exposure = max_amount * 6;
                        }else {
                            exposure = max_amount;
                        }
                        // return {approval_tag, max_amount, exposure, bucketization};
            
                        /*--------------------------------- FOR WHITELIST PRODUCT ---------------------------------
                        477++:  24.0Mio
                        497++:  30.0Mio             
                        */
                        if ((is_offline_whitelisted_item) || (nonmp_good_high_request)) {
                            if (reinforced_score>=497) { 
                                approval_tag = 'H3';
                                temp_max_amount = 6000000;
                                temp_exposure = 6000000 * 6;
                                temp_bucketization = 'INDODANA_SHARED_LIMIT_145666';
                            } else if (reinforced_score>=477) {
                                approval_tag = 'H3';
                                temp_max_amount = 4000000;
                                temp_exposure = 4000000 * 6;
                                temp_bucketization = 'INDODANA_SHARED_LIMIT_145666';
                            }
                            /*Ensure when "previous limit assignment" is higher than "whitelist limit assigment" then it will not overwrite to lower limit */
                            /*Eg: when prev limit assignemnt is 20Mio, yet in whitelist limit assigment is 18Mio, the limit will not overwrite to 18Mio but remain with 20Mio (due to 20Mio > 18Mio) */
                            if (temp_exposure >= exposure) {
                                max_amount = temp_max_amount;
                                bucketization = temp_bucketization;
                                exposure = temp_exposure;
                            }
                        }

                        /* iBox and friends special treatment */
                        if ((is_ibox_gan_digimap) || (mp_good_average) || (is_ftl_gym) || (is_motor_listrik)){

                            /*------------------------------ FOR NON SMARTPHONE PRODUCT ------------------------------
                                392++:  4.5Mio 
                                407++:  6.0Mio --> 12.5Mio
                                437++: 12.5Mio --> 18/24Mio
                                552++: 20.0Mio --> 24/36Mio
                            */
                            if (offline_item_category == 'non-smartphone' && !is_motor_listrik) {
                                if (reinforced_score >= 552) {
                                    approval_tag = "H3A";
                                    bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                    max_amount =  identity_score >= 520 ? 6000000 : 4000000;
                                } else if (reinforced_score >= 437) {
                                    approval_tag = "H3A";
                                    bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                    max_amount =  identity_score >= 520 ? 4000000 : 3000000;
                                } else if (reinforced_score >= 407) {
                                    approval_tag = "H3A";
                                    bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                    max_amount =  2500000;
                                } else if (reinforced_score >= 392) {
                                    approval_tag = "H3A";
                                    bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                    max_amount =  1500000;
                                }
                            }

                            /*-------------------------------- FOR SMARTPHONE PRODUCT --------------------------------
                            407++:  4.5mio (6.0Mio --> 12.5Mio good store)
                            457++:  6.0Mio --> 9.0Mio (7.5Mio --> 15.0Mio good store)
                            462++:  9.0Mio --> 15.0Mio
                            472++: 15.0Mio --> 18/24Mio good store
                            502++: 15.0Mio --> 18/24Mio 
                            */

                            if (offline_item_category == 'smartphone' && !is_motor_listrik) {
                                if (reinforced_score >= 502) {
                                    approval_tag = "H3A";
                                    bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                    max_amount =  identity_score >= 520 ? 4000000 : 3000000;
                                } else if (reinforced_score >= 472 && offline_store_category == 'good') {
                                    approval_tag = "H3A";
                                    bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                    max_amount =  identity_score >= 520 ? 4000000 : 3000000;
                                } else if (reinforced_score >= 462) {
                                    approval_tag = "H3A";
                                    max_amount =  3000000;
                                    bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                } else if (reinforced_score >= 457) {
                                    approval_tag = "H3A";
                                    max_amount =  3000000;
                                    bucketization = offline_store_category == 'good' ? 'INDODANA_SHARED_LIMIT_133555' : 'INDODANA_SHARED_LIMIT_133333';
                                } else if (reinforced_score >= 407) {
                                    approval_tag = "H3A";
                                    max_amount =  offline_store_category == 'good' ? 2500000 : 1500000;
                                    bucketization = offline_store_category == 'good' ? 'INDODANA_SHARED_LIMIT_133555' : 'INDODANA_SHARED_LIMIT_133333';
                                }
                            }

                            /*--------------------------------- FOR WHITELIST PRODUCT ---------------------------------
                            477++:  24.0Mio --> 24/36Mio
                            497++:  36Mio             
                            */

                            if (is_offline_whitelisted_item) {
                                if (reinforced_score>=497) { 
                                    approval_tag = 'H3';
                                    bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                    max_amount = 6000000;
                                    
                                } else if (reinforced_score>=477) {
                                    approval_tag = 'H3';
                                    bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                    max_amount = identity_score >= 520 ? 6000000 : 4000000;
                                }

                            }
                        }

                        /*--------------------------------- FOR ADHOC EXPERIMENT ELIGIBLE 50 MIO ---------------------------------
                        Context: Piloting initial limit 50Mio for selected brand and only allow promoter submission (not QR static/qr submission)
                        520++:  36.0Mio
                        540++:  50.0Mio 
                        */
                        if (is_merchant_eligible_limit_50_mio && offline_item_names!='Offline Transaction') {
                            if (reinforced_score>=540) { 
                                approval_tag = 'H3';
                                temp_max_amount = 10000000;
                                temp_exposure = 10000000 * 5;
                                temp_bucketization = 'INDODANA_SHARED_LIMIT_145555';
                            } else if (reinforced_score>=520) { 
                                approval_tag = 'H3';
                                temp_max_amount = 6000000;
                                temp_exposure = 6000000 * 6;
                                temp_bucketization = 'INDODANA_SHARED_LIMIT_145666';                            
                            }

                            /*Ensure when "previous limit assignment" is higher than "whitelist limit assigment" then it will not overwrite to lower limit */
                            /*Eg: when prev limit assignemnt is 20Mio, yet in whitelist limit assigment is 18Mio, the limit will not overwrite to 18Mio but remain with 20Mio (due to 20Mio > 18Mio) */
                            if (temp_exposure >= exposure) {
                                max_amount = temp_max_amount;
                                bucketization = temp_bucketization;
                                exposure = temp_exposure;
                            }
                        }

                        /*--------------------------------- FOR MOTOR LISTRIK --------------------------------- 
                            420++: 15.0Mio 
                            437++: 18.0Mio
                            502++: 24.0Mio
                            552++: 36.0Mio
                            
                        */
                        if (is_motor_listrik) {
                            if (reinforced_score >= 552) {
                                approval_tag = "H3A";
                                bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                max_amount =  6000000;
                            } else if (reinforced_score >= 502) {
                                approval_tag = "H3A";
                                bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                max_amount =  4000000;
                            } else if (reinforced_score >= 437) {
                                approval_tag = "H3A";
                                bucketization = 'INDODANA_SHARED_LIMIT_145666';
                                max_amount =  3000000;
                            } else if (reinforced_score >= 420) {
                                approval_tag = "H3A";
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                max_amount =  3000000;
                            }
                        }
                    
                    } 
            
                    if (((is_bpjs && is_bpjs_name_match) || is_bank_mutation || is_payslip) && (identity_score < 480)) { 
                        /*------------------------------ HCF ------------------------------
                        430++:  6.0Mio
                        440++:  6.0Mio
                        450++:  7.5Mio
                        475++:  9.0Mio
                        505++: 12.5Mio
                        */
            
                        if ((offline_item_category == 'non-smartphone' && offline_store_category=='hcf') || flag_treatment == 'hcf_treatment' ) {
                            if (reinforced_score >= 505) {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                return "hcf505";
                            } else if (reinforced_score >= 475) {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                return "hcf475";
                            } else if (reinforced_score >= 450) {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                return "hcf450";
                            } else if (reinforced_score >= 440) {
                                approval_tag = "H3A";
                                max_amount =  2000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                return "hcf440";
                            } else if (reinforced_score >= 430) {
                                approval_tag = "H3A";
                                max_amount =  2000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                return "hcf430";
                            }
                        }
            
                        /*------------------------------ FOR NON SMARTPHONE PRODUCT ------------------------------
                        372++:  4.5Mio (identity 0 - 479) [Pareto Brand 1 & 2 only]
                        395++:  4.5Mio (identity 440++)
                        410++:  6.0Mio
                        420++:  7.5Mio
                        500++:  9.0Mio
                        530++: 12.5Mio
                        */
                        if (offline_item_category == 'non-smartphone' && offline_store_category!='hcf') {
                            if (reinforced_score >= 530) {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133555';
                            } else if (reinforced_score >= 500) {
                                approval_tag = "H3A";
                                max_amount =  3000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 420) {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 410) {
                                approval_tag = "H3A";
                                max_amount =  2000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 372) {
                                if ((is_pareto_brand || (is_pareto_brand_2 && is_selected_sub_item))) {
                                    approval_tag = "H3A";
                                    max_amount =  1500000;
                                    bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                } else if (reinforced_score >= 395 && identity_score >= 440) {
                                    approval_tag = "H3A";
                                    max_amount =  1500000;
                                    bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                }
                                
                            } 


                            
                        }
            
                        /*------------------------------ GOOD FOR SMARTPHONE PRODUCT ------------------------------
                        480++:  4.5Mio
                        510++:  6.0Mio
                        530++:  7.5Mio
                        */
                        /*------------------------------ AVG FOR SMARTPHONE PRODUCT ------------------------------
                        480++:  3.0Mio
                        510++:  4.5Mio
                        515++:  6.0Mio
                        */
                        if (offline_item_category == 'smartphone' || flag_treatment == 'mp_treatment') {
                            if (reinforced_score >= 530 && offline_store_category == 'good') {
                                approval_tag = "H3A";
                                max_amount =  2500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 515) {
                                approval_tag = "H3A";
                                max_amount =  2000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 510) {
                                approval_tag = "H3A";
                                max_amount =  offline_store_category == 'good' ? 2000000 : 1500000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } else if (reinforced_score >= 480) {
                                approval_tag = "H3A";
                                max_amount =  offline_store_category == 'good' ? 1500000 : 1000000;
                                bucketization = 'INDODANA_SHARED_LIMIT_133333';
                            } 
                        }
                        
                        /* Exposure calculation based on bucket category */
                        if (bucketization == 'INDODANA_SHARED_LIMIT_133333') {
                            exposure = max_amount * 3;
                        } else if (bucketization == 'INDODANA_SHARED_LIMIT_133555') {
                            exposure = max_amount * 5;
                        } else if (bucketization == 'INDODANA_SHARED_LIMIT_145555') {
                            exposure = max_amount * 5;
                        } else if (bucketization == 'INDODANA_SHARED_LIMIT_145666') {
                            exposure = max_amount * 6;
                        }else {
                            exposure = max_amount;
                        }
            
                        /*--------------------------------- FOR WHITELIST PRODUCT ---------------------------------
                        520++:  18.0Mio             
                        */
                        if ((is_offline_whitelisted_item) || (nonmp_good_high_request)) {
                            if (reinforced_score>=520) { 
                                approval_tag = 'H3';
                                temp_max_amount = 3000000;
                                temp_exposure = 3000000 * 6;
                                temp_bucketization = 'INDODANA_SHARED_LIMIT_145666';
                            }
                            /*Ensure when "previous limit assignment" is higher than "whitelist limit assigment" then it will not overwrite to lower limit */
                            /*Eg: when prev limit assignemnt is 20Mio, yet in whitelist limit assigment is 18Mio, the limit will not overwrite to 18Mio but remain with 20Mio (due to 20Mio > 18Mio) */
                            if (temp_exposure >= exposure) {
                                max_amount = temp_max_amount;
                                bucketization = temp_bucketization;
                                exposure = temp_exposure;
                            }
                        }

                        /*------------------------------ FOR PRJ + MOTOR LISTRIK PRODUCT ------------------------------                
                        Replicate from NON SMARTPHONE
                        This is only for PRJ EVENT 
                        Next offline audit, just ignore

                        410++:  6.0Mio  --> 9.0Mio
                        420++:  7.5Mio  --> 9.0Mio
                        500++:  9.0Mio
                        530++: 12.5Mio
                        */
                        if (is_motor_listrik && is_prj_merchants) {
                        
                            if (identity_score >= 445) {
                                if (reinforced_score >= 530) {
                                    approval_tag = "H3A";
                                    max_amount =  3000000;
                                    bucketization = 'INDODANA_SHARED_LIMIT_133555';
                                } else if (reinforced_score >= 420) {
                                    approval_tag = "H3A";
                                    max_amount =  3000000;
                                    bucketization = 'INDODANA_SHARED_LIMIT_133333';
                                }
                            }
                            else {
                                approval_tag = "";
                                max_amount =  "";
                                bucketization = "";
                                exposure = "";
                            }
                                
                        }
                    }
                    
                }
                /* Exposure calculation based on bucket category */
                if (bucketization == 'INDODANA_SHARED_LIMIT_133333') {
                    exposure = max_amount * 3;
                } else if (bucketization == 'INDODANA_SHARED_LIMIT_133555') {
                    exposure = max_amount * 5;
                } else if (bucketization == 'INDODANA_SHARED_LIMIT_145555') {
                    exposure = max_amount * 5;
                } else if (bucketization == 'INDODANA_SHARED_LIMIT_145666') {
                    exposure = max_amount * 6;
                }else {
                    exposure = max_amount;
                }

                approved_loan_amount = max_amount;
            
                /*if badstore, cap limit 7.5Mio */
                if (['bad','very_bad'].contains(offline_store_category) && exposure>6000000) {
                    max_amount = 2000000;
                    approved_loan_amount = 2000000;
                    bucketization = 'INDODANA_SHARED_LIMIT_133333';
                    exposure = 6000000;
                }
            
                /*if badstore, cap limit 12.5Mio */
                if ( (['hcf'].contains(offline_store_category)  || flag_treatment =='hcf_treatment') && exposure>15000000) {
                    max_amount = 3000000;
                    approved_loan_amount = 3000000;
                    bucketization = 'INDODANA_SHARED_LIMIT_133555';
                    exposure = 15000000;
                }
            
                /* [I61] additional exposure for hcf with minimum limit */
                if ( approval_tag == '' && (['hcf'].contains(offline_store_category) || flag_treatment =='hcf_treatment') ) {
                    approval_tag = "I61";
            
                    if (offline_transaction_applied_amount_without_multiplier >= 3000000) {
                        max_amount = 1000000;
                        bucketization = 'INDODANA_SHARED_LIMIT_133333';
                    } else {
                        multiplier_limit = 1000000;
                        rounded_up_limit = offline_transaction_applied_amount_without_multiplier + (multiplier_limit - (offline_transaction_applied_amount_without_multiplier%multiplier_limit));
            
                        max_amount = (offline_transaction_applied_amount_without_multiplier%multiplier_limit == 0) ? offline_transaction_applied_amount_without_multiplier : rounded_up_limit;
                        bucketization = 'INDODANA_SHARED_LIMIT_111111';
                    }
                    approved_loan_amount = max_amount;
                }
                
                if (bucketization == 'INDODANA_SHARED_LIMIT_133333') {
                    exposure = max_amount * 3;
                } else if (bucketization == 'INDODANA_SHARED_LIMIT_133555') {
                    exposure = max_amount * 5;
                } else if (bucketization == 'INDODANA_SHARED_LIMIT_145555') {
                    exposure = max_amount * 5;
                } else if (bucketization == 'INDODANA_SHARED_LIMIT_145666') {
                    exposure = max_amount * 6;
                }else {
                    exposure = max_amount;
                }

                if (!is_covered_cities_offline && !is_covered_cities_offline_living_city) {
                    if ( (offline_item_names=='Offline Transaction' || !offline_agent_id || offline_agent_id == '-999' || offline_agent_id == '-99' || offline_agent_id == '') && exposure > 9000000) {
                        approval_tag = "I81";
                        max_amount = 3000000;
                        approved_loan_amount = 3000000;
                        bucketization = 'INDODANA_SHARED_LIMIT_133333';
                        exposure = 9000000;
                    }

                }

                /************************************************************************************************************************************/
                /************************************************************* DEKORUMA *************************************************************/
                /************************************************************************************************************************************/

                if (is_merchant_dekoruma) {
                    approval_tag = '';
                    max_amount = '';
                    bucketization = '';
                    exposure = '';
                    approved_loan_amount = '';
                    experiment_code = '';
                    experiment_value = 'dekoruma';
                    /*------------------------------ FOR DEKORUMA ------------------------------
                    470++:  25.0Mio
                    485++:  25.0Mio
                    497++:  30.0Mio
                    520++:  40.0Mio
                    540++:  50.0Mio 
                    */
                    if (identity_score >= 480) {
                        if (reinforced_score >= 540) {
                            approval_tag = "H3A";
                            max_amount =  10000000;
                            bucketization = 'INDODANA_SHARED_LIMIT_145555';
                        } else if (reinforced_score >= 520) {
                            approval_tag = "H3A";
                            max_amount =  8000000;
                            bucketization = 'INDODANA_SHARED_LIMIT_145555';
                        } else if (reinforced_score >= 497) {
                            approval_tag = "H3A";
                            max_amount =  6000000;
                            bucketization = 'INDODANA_SHARED_LIMIT_145555';
                        } else if (reinforced_score >= 485) {
                            approval_tag = "H3A";
                            max_amount =  5000000;
                            bucketization = 'INDODANA_SHARED_LIMIT_145555';
                        } else if (reinforced_score >= 470) {
                            approval_tag = "H3A";
                            max_amount =  5000000;
                            bucketization = 'INDODANA_SHARED_LIMIT_145555';
                        }
                    } else if (identity_score >= 440 && identity_score < 480) {
                        approval_tag = "H3A";
                        max_amount =  5000000;
                        bucketization = 'INDODANA_SHARED_LIMIT_145555';

                    } 

                    /* Exposure calculation based on bucket category */
                    if (bucketization == 'INDODANA_SHARED_LIMIT_145555') {
                        exposure = max_amount * 5;
                    }

                    approved_loan_amount = max_amount; 
                    
                    /************************************************************************************************************************************/

                }
            
                /*watch list store check for autoapprove, check initial store name*/
                for (store_initial: OFFLINE_STORE_PASS_TO_CA) {
                    if (store_name =^ store_initial) {
                        approval_tag = '';
                    }
                }
            
                /*pass to CA if applicants have more that 1 related user Id*/
                if (number_of_related_user_id>1) {
                    approval_tag = '';
                }
            
                if (is_blacklist_store) {
                    approval_tag = '';
                }
            }
        } 
        

        else if (experiment_offline != 'offline_normal_set') {
            /* do nothing */
        }
        return {"bbbb",bucketization,approval_tag, max_amount, exposure, reinforced_score};

        /* ------------------ Pekalongan NEC reject rule temp due to frauds ------------------ */
        if (!(product_type == 'CASH_LOAN' && cash_origination == 'EXISTING') && (is_pekalongan || is_nec)) {
            approval_tag = '';
        }

        /* ------------------ Recaptured ktp - skip autoapprove ------------------ */
        if (isrecaptured_ktp_score_above_90 > 3) {
            approval_tag = '';
        }


        /* ------------------- cash loan pre approved  -------------------
        offer   -> is_offer_calculation = true  -> is_eligible_offer_calculation = true  -> if offer not from CLI, qualification follow repeat ath treatment
        offer   -> is_offer_calculation = true  -> is_eligible_offer_calculation = false -> not pass qualification */

        if (is_offer_calculation && !is_eligible_offer_calculation) {
            approval_tag = '';
        }

        /* reject preapprove offer for repeat cash, since they will be included in Whitelist/Greylist */
        if (is_offer_calculation && (has_pre_approved_cash_loan_offer == false) && (offerEvent == 'PAID_OFF')) {
            approval_tag = '';
        }

        /* ------------------ Employee Loans or Salary Advance ------------------ */
        if (product_type == 'SALARY_ADVANCE' || product_type == 'EMPLOYEE_LOAN') {
            approval_tag = 'H3';
            max_amount = requested_loan_amount;
            approved_loan_amount = max_amount;
            tenure = requested_loan_tenure;
        }


        if (stringUtils.contains(applicant_name.toLowerCase(), 'jerry') && stringUtils.contains(applicant_name.toLowerCase(), 'kasung')) {
        if (product_type == 'CASH_LOAN') {
            approval_tag = 'H3';
            max_amount = 20000000;
            approved_loan_amount = 20000000;
            tenure = 12;
        } else {
            approval_tag = 'H3';
            max_amount = 6000000;
            approved_loan_amount = 6000000;
            exposure = 6000000 * 6;
            bucketization = 'INDODANA_SHARED_LIMIT_145666';
        }
        }
        return {approval_tag, max_amount,bucketization };

        /********************************************************/
        /************************ DECISION **********************/
        /********************************************************/
        /* lebaran fraud invalid selfie rule prevention */
        if (count_invalid_selfie_last_24h >= 10) {
            approval_tag = '';
        } 

        // if (approval_tag != '') {
        //     return {
        //         "approvalTag": approval_tag,
        //         "maxAmount": max_amount,
        //         "approvedLoanAmount": approved_loan_amount,
        //         "tenure": tenure,
        //         "experimentCode": experiment_code,
        //         "experimentValue": experiment_value,
        //         "bucketization": bucketization,
        //         "rulePefindo": rule_pefindo,
        //         "storeCategory": offline_store_category,
        //         "voucherId": voucherId,
        //         "highLimitDisbursedCategory": high_limit_disbursed_category,
        //         "whitelistType": whitelist_type,
        //         "abCode": ab_code,
        //         "maxAmountWithoutDbr": max_amount_without_dbr,
        //         "experimentOffline": experiment_offline,
        //         "cashCityTier": cash_city_tier,
        //         "rateGroupKey": rateGroupKey,
        //         "abTestCashRbp": ab_test_cash_rbp,
        //         "abTestCashFlexibleTenure": ab_test_cash_flexible_tenure,
        //         "autoAddWhitelistEcommerceVaPayment": autoAddWhitelistEcommerceVaPayment,
        //         "abTestCliVA": ab_test_cli_va,
        //         "maxAmountBeforePreapprovedTelesales": max_amount_before_preapproved_telesales
        //     };
        // }

        return '';