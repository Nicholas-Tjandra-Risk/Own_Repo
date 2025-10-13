/* var experiment_code = abTestingHelper.getVariation(orderId, 'indodana_simplification_ab_test', 'default_value'); */
/* var experiment_offline = abTestingHelper.getVariation(orderId, 'offline_simplification_ab_test', 'default_value');  */
var experiment_offline = 'offline_normal_set'; 
var experiment_code = 'indodana_normal_set';
var experiment_tiket = 'tiket_normal_set';
var experiment_blibli = 'blibli_normal_set';

var offer_experiment_code = abTestingHelper.getVariation(orderId, 'preapproved_cash_loan_ab_test', 'default_value');
var ab_test_cash_new_approve_100 = '';
var ab_test_cash_existing_approve_low_tails = '';

var result_string = '';

/********************************************************/
/********************* CASH LOAN - NEW ******************/
/********************************************************/

/* ------------------- Reject Reason -------------------*/
var score_cut_off_reject_reason = '';
var identity_score_cut_off_reject_reason = '';
var working_city_reject_reason = '';


var OFFLINE_STORE_PRIORITY_HIGH_LIMIT= [
    'hello', /*Hello+ iphone 14 launch with limit up to 30Mio and 24 tenure */
    'ibox',
	'advance 177 exhibition jakarta fair kemayoran 2023',
	'osim 07 exhibition jakarta fair kemayoran 2023',
	'perfect health 15 - exhibition jakarta fair kemayoran 2023',
	'pixel 09 - esmart aqua exhibition jakarta fair kemayoran 2023',
	'pixel 10 - esmart coocaa exhibition jakarta fair kemayoran 2023',
	'pixel 11 - esmart toshiba tvmi exhibition jakarta fair kemayoran 2023',
	'pixel 12 - esmart hisense exhibition jakarta fair kemayoran 2023',
	'rpa 02 - exhibition jakarta fair kemayoran 2023',
	'selis 52 - selis exhibition jakarta fair kemayoran 2023',
	'tokuyo 16 exhibition jakarta fair kemayoran 2023',
	'viar motor 03 - exhibition jakarta fair kemayoran 2023'
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

var OFFLINE_STORE_BLACKLIST = [
	'mr ponsel',
    'point2000 - 07 kcp karawa',
	'optimum',
	'ponticell',
    'penguasa nusantara indonesia'

];

var OFFLINE_STORE_BAD_MEDAN = [
    'buccheri 110 - medan fair',
    'buccheri 27 - medan gatot subroto',
    'buccheri 28 - medan mall',
    'buccheri 29 - medan thamrin plaza',
    'buccheri 57 - medan binjai',
    'gabino 26 - gabino medan fair',
    'gabino 27 - gabino medan mall',
    'gabino 28 - gabino medan marelan',
    'gabino 29 - gabino medan ringroad citywalks',
    'matahari 645 - medan mall',
    'zoya 44 medan mall'
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

var PRJ_DUMMY_LIST = [
    'dummy exhibition jakarta fair kemayoran 2024 admin 1%',
    'dummy exhibition jakarta fair kemayoran 2024 admin 190k',
    'DUMMY MERCHANT BLIBLI EVENT GRAND INDONESIA',
    'dummy sharp official store',
	'DUMMY SHARP OFFICIAL STORE',
	'DUMMY SHARP OFFICIAL STORE - SHARP EXHIBITION PET EXPO ICE BSD',
	'dummy sharp official store - sharp exhibition pet expo ice bsd'
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

var BLIBLI_INSTORE_REFERRAL_CODE = [
    'BLIHELTPA001', 'BLIHELTPA002', 'BLIHELTPA003', 'BLIHELTPA004', 'BLIHELTPA005', 'BLIHELTPA006', 'BLIHELTPA007', 'BLIHELTPA008', 'BLIHELTPA009', 'BLIHELTPA010', 
    'BLIHELLCI001', 'BLIHELLCI002', 'BLIHELLCI003', 'BLIHELLCI004', 'BLIHELLCI005', 'BLIHELLCI006', 'BLIHELLCI007', 'BLIHELLCI008', 'BLIHELLCI009', 'BLIHELLCI010', 
    'BLIHELKCI001', 'BLIHELKCI002', 'BLIHELKCI003', 'BLIHELKCI004', 'BLIHELKCI005', 'BLIHELKCI006', 'BLIHELKCI007', 'BLIHELKCI008', 'BLIHELKCI009', 'BLIHELKCI010', 
    'BLIBLICPA001', 'BLIBLICPA002', 'BLIBLICPA003', 'BLIBLICPA004', 'BLIBLICPA005', 'BLIBLICPA006', 'BLIBLICPA007', 'BLIBLICPA008', 'BLIBLICPA009', 'BLIBLICPA010', 
    'BLIBLITCI001', 'BLIBLITCI002', 'BLIBLITCI003', 'BLIBLITCI004', 'BLIBLITCI005', 'BLIBLITCI006', 'BLIBLITCI007', 'BLIBLITCI008', 'BLIBLITCI009', 'BLIBLITCI010', 
    'BLIBLILMA001', 'BLIBLILMA002', 'BLIBLILMA003', 'BLIBLILMA004', 'BLIBLILMA005', 'BLIBLILMA006', 'BLIBLILMA007', 'BLIBLILMA008', 'BLIBLILMA009', 'BLIBLILMA010', 
    'BLIBLIGCI001', 'BLIBLIGCI002', 'BLIBLIGCI003', 'BLIBLIGCI004', 'BLIBLIGCI005', 'BLIBLIGCI006', 'BLIBLIGCI007', 'BLIBLIGCI008', 'BLIBLIGCI009', 'BLIBLIGCI010', 
    'BLIBLIP23001', 'BLIBLIP23002', 'BLIBLIP23003', 'BLIBLIP23004', 'BLIBLIP23005', 'BLIBLIP23006', 'BLIBLIP23007', 'BLIBLIP23008', 'BLIBLIP23009', 'BLIBLIP23010', 
    'BLIBLIBSQ001', 'BLIBLIBSQ002', 'BLIBLIBSQ003', 'BLIBLIBSQ004', 'BLIBLIBSQ005', 'BLIBLIBSQ006', 'BLIBLIBSQ007', 'BLIBLIBSQ008', 'BLIBLIBSQ009', 'BLIBLIBSQ010', 
    'BLIBLIMCI001', 'BLIBLIMCI002', 'BLIBLIMCI003', 'BLIBLIMCI004', 'BLIBLIMCI005', 'BLIBLIMCI006', 'BLIBLIMCI007', 'BLIBLIMCI008', 'BLIBLIMCI009', 'BLIBLIMCI010', 
    'BLITUKCCI001', 'BLITUKCCI002', 'BLITUKCCI003', 'BLITUKCCI004', 'BLITUKCCI005', 'BLITUKCCI006', 'BLITUKCCI007', 'BLITUKCCI008', 'BLITUKCCI009', 'BLITUKCCI010', 
    'BLITUKMAR001', 'BLITUKMAR002', 'BLITUKMAR003', 'BLITUKMAR004', 'BLITUKMAR005', 'BLITUKMAR006', 'BLITUKMAR007', 'BLITUKMAR008', 'BLITUKMAR009', 'BLITUKMAR010', 
    'BLITUKPSE001', 'BLITUKPSE002', 'BLITUKPSE003', 'BLITUKPSE004', 'BLITUKPSE005', 'BLITUKPSE006', 'BLITUKPSE007', 'BLITUKPSE008', 'BLITUKPSE009', 'BLITUKPSE010', 
    'BLITUKSKA001', 'BLITUKSKA002', 'BLITUKSKA003', 'BLITUKSKA004', 'BLITUKSKA005', 'BLITUKSKA006', 'BLITUKSKA007', 'BLITUKSKA008', 'BLITUKSKA009', 'BLITUKSKA010', 
    'BLITUKDMO001', 'BLITUKDMO002', 'BLITUKDMO003', 'BLITUKDMO004', 'BLITUKDMO005', 'BLITUKDMO006', 'BLITUKDMO007', 'BLITUKDMO008', 'BLITUKDMO009', 'BLITUKDMO010', 
    'BLITUKPGE001', 'BLITUKPGE002', 'BLITUKPGE003', 'BLITUKPGE004', 'BLITUKPGE005', 'BLITUKPGE006', 'BLITUKPGE007', 'BLITUKPGE008', 'BLITUKPGE009', 'BLITUKPGE010', 
    'BLITUKBPL001', 'BLITUKBPL002', 'BLITUKBPL003', 'BLITUKBPL004', 'BLITUKBPL005', 'BLITUKBPL006', 'BLITUKBPL007', 'BLITUKBPL008', 'BLITUKBPL009', 'BLITUKBPL010', 
    'BLITUKPSQ001', 'BLITUKPSQ002', 'BLITUKPSQ003', 'BLITUKPSQ004', 'BLITUKPSQ005', 'BLITUKPSQ006', 'BLITUKPSQ007', 'BLITUKPSQ008', 'BLITUKPSQ009', 'BLITUKPSQ010', 
    'BLITUKLMA001', 'BLITUKLMA002', 'BLITUKLMA003', 'BLITUKLMA004', 'BLITUKLMA005', 'BLITUKLMA006', 'BLITUKLMA007', 'BLITUKLMA008', 'BLITUKLMA009', 'BLITUKLMA010', 
    'BLITUKPCI001', 'BLITUKPCI002', 'BLITUKPCI003', 'BLITUKPCI004', 'BLITUKPCI005', 'BLITUKPCI006', 'BLITUKPCI007', 'BLITUKPCI008', 'BLITUKPCI009', 'BLITUKPCI010', 
    'BLITUKDAG001', 'BLITUKDAG002', 'BLITUKDAG003', 'BLITUKDAG004', 'BLITUKDAG005', 'BLITUKDAG006', 'BLITUKDAG007', 'BLITUKDAG008', 'BLITUKDAG009', 'BLITUKDAG010', 
    'BLITUKTCI001', 'BLITUKTCI002', 'BLITUKTCI003', 'BLITUKTCI004', 'BLITUKTCI005', 'BLITUKTCI006', 'BLITUKTCI007', 'BLITUKTCI008', 'BLITUKTCI009', 'BLITUKTCI010', 
    'BLIITGBSQ001', 'BLIITGBSQ002', 'BLIITGBSQ003', 'BLIITGBSQ004', 'BLIITGBSQ005', 'BLIITGBSQ006', 'BLIITGBSQ007', 'BLIITGBSQ008', 'BLIITGBSQ009', 'BLIITGBSQ010', 
    'BLIITGEST001', 'BLIITGEST002', 'BLIITGEST003', 'BLIITGEST004', 'BLIITGEST005', 'BLIITGEST006', 'BLIITGEST007', 'BLIITGEST008', 'BLIITGEST009', 'BLIITGEST010', 
    'BLIITGBCY001', 'BLIITGBCY002', 'BLIITGBCY003', 'BLIITGBCY004', 'BLIITGBCY005', 'BLIITGBCY006', 'BLIITGBCY007', 'BLIITGBCY008', 'BLIITGBCY009', 'BLIITGBCY010', 
    'BLIITGSKA001', 'BLIITGSKA002', 'BLIITGSKA003', 'BLIITGSKA004', 'BLIITGSKA005', 'BLIITGSKA006', 'BLIITGSKA007', 'BLIITGSKA008', 'BLIITGSKA009', 'BLIITGSKA010', 
    'BLIITGMCI001', 'BLIITGMCI002', 'BLIITGMCI003', 'BLIITGMCI004', 'BLIITGMCI005', 'BLIITGMCI006', 'BLIITGMCI007', 'BLIITGMCI008', 'BLIITGMCI009', 'BLIITGMCI010', 
    'BLIDUNIBS001', 'BLIDUNIBS002', 'BLIDUNIBS003', 'BLIDUNIBS004', 'BLIDUNIBS005', 'BLIDUNIBS006', 'BLIDUNIBS007', 'BLIDUNIBS008', 'BLIDUNIBS009', 'BLIDUNIBS010', 
    'BLIBURMAM001', 'BLIBURMAM002', 'BLIBURMAM003', 'BLIBURMAM004', 'BLIBURMAM005', 'BLIBURMAM006', 'BLIBURMAM007', 'BLIBURMAM008', 'BLIBURMAM009', 'BLIBURMAM010', 
    'BLISAEKOT001', 'BLISAEKOT002', 'BLISAEKOT003', 'BLISAEKOT004', 'BLISAEKOT005', 'BLISAEKOT006', 'BLISAEKOT007', 'BLISAEKOT008', 'BLISAEKOT009', 'BLISAEKOT010', 
    'BLITECPMA001', 'BLITECPMA002', 'BLITECPMA003', 'BLITECPMA004', 'BLITECPMA005', 'BLITECPMA006', 'BLITECPMA007', 'BLITECPMA008', 'BLITECPMA009', 'BLITECPMA010'
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

var OFFLINE_MERCHANT_DEKORUMA = [ 
    'dummy dekoruma'
];

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

/* Cash webform linkaja fraud rule Feb 2025, override KTP level definition need to clean later */
var cash_category_user = '';

if (count_disbursed_cash_user > 0) {
	cash_category_user = '4. repeat cash';
} else if (count_disbursed_cash_user <= 0 && diff_day_from_first_cli_user >= 7) {
	cash_category_user = '2. cash new cli >=7d';
} else if (count_disbursed_cash_user <= 0 && diff_day_from_first_cli_user < 7 && diff_day_from_first_cli_user >= 0) {
	cash_category_user = '1b. cash new cli <7d';
} else {
	cash_category_user = '1a. totally first cash';
}

var cash_origination_user = (cash_category_user == '4. repeat cash' || cash_category_user == '2. cash new cli >=7d') ? 'EXISTING' : 'NEW';

cash_origination = cash_origination_user;

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

/* null handling */
if(adhoc_cashloan_reinforced_score == null) {
	adhoc_cashloan_reinforced_score = -99;
}

/* ------------------- LOGIC - score adjustments -------------------*/
var addition = 0;
var adjusted_score = score;
var is_offline_applicant = offline_transaction_applied_amount > 0;
var is_online_applicant_nearby_offline_merchant = product_type == 'CREDIT_LIMIT' && partner != 'BLIBLI' && partner != 'TIKET' && !is_offline_applicant && (gps_nearby_offline_flag_treatment == 'hcf_treatment' || gps_nearby_offline_flag_treatment == 'mp_treatment');
var reinforced_score = is_online_applicant_nearby_offline_merchant ? reinforced_pefindo_scoring_cli_offline_no_ewallet_20240912 : reinforced_score;

if (tiket_score >= 400) {
	addition = 20;
} else if (blibli_score >= 400) {
	addition = 20;
}

if (count_shady_app > 1 || count_banned_app > 1) {
	adjusted_score = adjusted_score - 30 + addition;
} else if (count_shady_app == 1 || count_banned_app > 0) {
	adjusted_score = adjusted_score - 10 + addition;
} else if (product_type == 'CASH_LOAN') {
	adjusted_score = adjusted_score + addition;
}
if (product_type == 'CASH_LOAN'){
	adjusted_score = score;
}

if (product_type == 'CREDIT_LIMIT' && !is_offline_applicant) {
    if (experiment_code == 'indodana_normal_set'){
        adjusted_score = score;
    }
}

/* ------------------- LOGIC - customer segmentation -------------------*/
var is_covered_cities_cli_selected_district = (mamunda_var_is_covered_cities_cli_selected_district == null) ? true : mamunda_var_is_covered_cities_cli_selected_district;
var is_covered_cities_cli_selected_district_living_city = (mamunda_var_is_covered_cities_cli_selected_district_living_city == null) ? true : mamunda_var_is_covered_cities_cli_selected_district_living_city;

var is_profession_high_risk = arrayUtils.contains(PROFESSIONS_HIGH_RISK,stringUtils.upperCase(ocr_result_occupation_type.toString()));

/* additional to align cash & cli, get from BQ1 */
var is_covered_cities_cli = (mamunda_var_is_covered_cities_cli == null) ? true : mamunda_var_is_covered_cities_cli; 
var is_covered_cities_cli_living_city = (mamunda_var_is_covered_cities_cli_living_city == null) ? true : mamunda_var_is_covered_cities_cli_living_city;

var is_covered_cities = (mamunda_var_is_covered_cities == null) ? false : mamunda_var_is_covered_cities;
var is_covered_cities_tier_2 = (mamunda_var_is_covered_cities_tier_2 == null) ? false : mamunda_var_is_covered_cities_tier_2;
var is_covered_cities_tier_3 = (mamunda_var_is_covered_cities_tier_3 == null) ? false : mamunda_var_is_covered_cities_tier_3;
var is_covered_cities_living_city = (mamunda_var_is_covered_cities_living_city == null) ? false : mamunda_var_is_covered_cities_living_city;
var is_covered_cities_tier_2_living_city = (mamunda_var_is_covered_cities_tier_2_living_city == null) ? false : mamunda_var_is_covered_cities_tier_2_living_city;
var is_covered_cities_tier_3_living_city = (mamunda_var_is_covered_cities_tier_3_living_city == null) ? false : mamunda_var_is_covered_cities_tier_3_living_city;
var mamunda_process_name_str = (mamunda_process_name == null) ? '' : mamunda_process_name;

var cash_city_tier = 'OTHER';
if (is_covered_cities || is_covered_cities_living_city) {
    cash_city_tier = 'TIER 1';
} else if (is_covered_cities_tier_2 || is_covered_cities_tier_2_living_city) {
    cash_city_tier = 'TIER 2';
} else if (is_covered_cities_tier_3 || is_covered_cities_tier_3_living_city) {
    cash_city_tier = 'TIER 3';
} else if (is_covered_cities_cli_selected_district || is_covered_cities_cli_selected_district_living_city) {
    cash_city_tier = 'CLI SELECTED DISTRICT';
}

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

var is_good_pefindo_cc = ["3", "4", "5", "3B", "4B", "5B", "1A-3", "1A-4", "1A-5", "1A-3B", "1A-4B", "1A-5B"].contains(rule_pefindo)
var is_good_pefindo_cc_2 = ["3", "4", "5", "3B", "4B", "5B", "1A-3", "1A-4", "1A-5", "1A-2CC","1A-2CCB", "2CC", "2CCB"].contains(rule_pefindo)
var is_blibli_offline_applicant = arrayUtils.contains(BLIBLI_INSTORE_REFERRAL_CODE,stringUtils.upperCase(marketing_placement));
var is_fdc_null = sum_amount_disbursed_total < 0;
var is_fdc_late = discounted_sum_outstanding_late_1y > 0;
var is_fdc_wo = count_late_writeoff_within_3_years > 0;
var is_not_late_pefindo = (pefindo_discounted_sum_outstanding_late <= 0 && count_month_late_dpd_30 <= 0 && percentage_latest_active_dpd_15 <= 0 
    && count_written_off_unique_creditor <= 0 && pastduedays_payment_gradient <= 0);
var is_high_izi_14d = izi_id_multi_inquiries_14d > 6;
var is_very_low_izi_inquiry = (izi_max_multi_inquiries_90d <= 2) && (izi_max_multi_inquiries_14d <= 1) && (number_of_installed_loan_apps_within_14days <= 3) 
	&& (izi_reference_mobile_phone_number_multi_inquiries_total <= 3);
    var is_tiket_user_with_active_cli_indodana = blacklistHelper.isWhitelistedByNamespace('emails', 'expedite-tiket-cli-indodana', { "email": applicant_personal_email });
    var is_tiket_user_with_active_cli_blibli = blacklistHelper.isWhitelistedByNamespace('emails', 'expedite-tiket-cli-blibli', { "email": applicant_personal_email });
    var is_expedited_cli_indodana_user = blacklistHelper.isWhitelistedByNamespace('emails', 'expedite-blibli', { "email": applicant_personal_email });

/* If run in simulation, get whitelist data from datamart. Otherwise in production, hit whitelist API */
var is_whitelisted_ath_via_limit_user = false;
var is_access_btpl_cash_loan = false;

if ((master_user_id == null || master_user_id == '') && (userId != null || userId != '')) {
    master_user_id = userId
}

if (is_simulation == 1) {
    is_whitelisted_ath_via_limit_user = is_whitelisted_ath_via_limit_user_snapshot == 1 ? true : false;
	is_access_btpl_cash_loan = is_whitelisted_ath_btpl_snapshot == 1 ? true : false;
} else {
    is_whitelisted_ath_via_limit_user = blacklistHelper.isWhitelistedByNamespaceAndReason('users', 'phase-2-cash-loan-via-limit', 'whitelist', { "userId": master_user_id }) ||
											blacklistHelper.isWhitelistedByNamespaceAndReason('users', 'phase-2-cash-loan-via-limit', 'btpl-cash-loan', { "userId": master_user_id }) || 
											blacklistHelper.isWhitelistedByNamespaceAndReason('users', 'phase-2-cash-loan-via-limit', 'employee', { "userId": master_user_id }) ;

    is_access_btpl_cash_loan = blacklistHelper.isWhitelistedByNamespaceAndReason('users', 'access-btpl-cash-loan', 'whitelist', {"userId": master_user_id}) ||
                                blacklistHelper.isWhitelistedByNamespaceAndReason('users', 'access-btpl-cash-loan', 'btpl-cash-loan', {"userId": master_user_id}) ||
                                blacklistHelper.isWhitelistedByNamespaceAndReason('users', 'access-btpl-cash-loan', 'employee', {"userId": master_user_id});
}

var number_of_related_indodana_credit_limit = number_of_related_blibli_tiket_indodana_credit_limit - number_of_related_blibli_tiket_credit_limit;
var is_payslip = (is_bpjs == 0 && is_bank_mutation == 0);

var is_match_dana = ((match_dana_short_logic == 1) || (match_dana_name_logic == 1));

/*Offer Calculation Logic*/
var is_offer_calculation = (offerId == null || offerId == "" || offerId == "-99" || offerId == "-999" || offerEvent == 'ADHOC_SCRIPT') ? 0 : 1;
var is_eligible_offer_calculation = (is_offer_calculation == 1) && (((prev_approved_cash_loan_loan_amount > 0 || is_repeat_order == 1) && (prev_cli_ath_max_days_late <= 0)) || (offerEvent == 'CLI_REGISTRATION'));
var is_repeat_order = ((is_eligible_offer_calculation) && (offerEvent != 'CLI_REGISTRATION')) ? 1 : is_repeat_order; /*Overwrite is_repeat_order == 1, if is_eligible_offer_calculation, except CLI_REGISTRATION  */

/* ------------- LOGIC - offline rule -------------*/

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

/*Laptop product*/
if(stringUtils.contains(offline_sub_item_category.toLowerCase(), 'laptop & notebook')) {
	is_offline_whitelisted_item = true;
} 
/*Good store high limit: selected store which eligible for high limit*/
var is_good_store_high_limit_category = false;
for (store_initial: OFFLINE_STORE_PRIORITY_HIGH_LIMIT) {
    if (stringUtils.contains(store_name, store_initial)) {
        is_good_store_high_limit_category = true;
    } 
} 
/*Overwrite is_offline_whitelisted_item for good store high limit category eg:ibox, hello+, prj store */
/* is_offline_whitelisted_item = is_good_store_high_limit_category ? true : is_offline_whitelisted_item; */

var offline_store_category = (offline_store_category == null || offline_store_category == "" || offline_store_category == "None" || offline_store_category == "-99" || offline_store_category == "-999") ? 'average' : offline_store_category;

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
        is_offline_whitelisted_item = false;
	} 
}

/*Check if blacklist store*/
var is_blacklist_store = false;
for (store_initial: OFFLINE_STORE_BLACKLIST) {
	if (stringUtils.contains(store_name, store_initial)) {
		is_blacklist_store = true;
	} 
}

/*Define Bad Medan Store*/
var is_bad_medan_store = false;
for (store_initial: OFFLINE_STORE_BAD_MEDAN) {
	if (stringUtils.contains(store_name, store_initial)) {
		is_bad_medan_store = true;
	} 
}

/*Bad Agent Treatment*/
var is_agent_under_review = (agent_under_review == null) ? false : agent_under_review;
if (is_agent_under_review) {
    offline_store_category = 'very_bad';
}

var is_merchant_dekoruma = false;
    for (store_initial: OFFLINE_MERCHANT_DEKORUMA) {
        if (stringUtils.contains(store_name.toLowerCase(), store_initial)) {
            is_merchant_dekoruma = true;
	}
}

is_bpjs = (is_bpjs == 1);
is_bank_mutation = (is_bank_mutation == 1);

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

if (stringUtils.contains(applicant_name.toLowerCase(), 'jerry') && stringUtils.contains(applicant_name.toLowerCase(), 'kasung')) {
    result_string = ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

if (blacklistHelper.isWhitelistedByNamespace('emails', 'sqa-auto-approve-application', { "email": applicant_personal_email.toLowerCase() })) {
    result_string = ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

if (blacklistHelper.isWhitelistedByNamespace('emails', 'demoOjk', { "email": applicant_personal_email.toLowerCase() })) {
    result_string = ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}


if (blacklistHelper.isWhitelistedByNamespace('phones', 'ojk-audit', { "phoneNumber": applicant_mobile_phone_number })){
    result_string = ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

if (product_type == 'SALARY_ADVANCE' || product_type == 'EMPLOYEE_LOAN') {
    result_string = ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

/* ------------------- Preapproved Cash Loan Offer Calculation  -------------------*/
/*
offer   -> is_offer_calculation = true  -> is_eligible_offer_calculation = true  -> if offer not from CLI, qualification follow repeat ath treatment
offer   -> is_offer_calculation = true  -> is_eligible_offer_calculation = false -> not pass qualification
*/

if (is_offer_calculation && !is_eligible_offer_calculation) {
	score_cut_off_reject_reason = 'JA01';
    result_string = score_cut_off_reject_reason + ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}
    
/* reject all preapprove offer for repeat cash, since they will be included in Whitelist/Greylist */
if (is_offer_calculation && (has_pre_approved_cash_loan_offer == false) && (offerEvent == 'PAID_OFF')) {
	pass_bq = false;
	score_cut_off_reject_reason = 'JA01';
}

/* ------------------- LOGIC - CASH LOAN WHITELIST -------------------*/
if (product_type == 'CASH_LOAN' && is_whitelisted_ath_via_limit_user && cash_origination == 'EXISTING' && !is_offer_calculation) {
    /* pilot assignment for approve lower tais */
    if ((reinforced_score > 380) && (reinforced_score <= 400)) {
        ab_test_cash_existing_approve_low_tails = abTestingHelper.getVariation(orderId, 'PILOT_APPROVE_TAILS_CASH_EXISTING', 'NORMAL');
    }

    /* reject low score */
    if ((ab_test_cash_existing_approve_low_tails == 'EXPANDED') && (count_of_active_platforms < 3)) {
        if (reinforced_score <= 375) {
            score_cut_off_reject_reason = 'JA01';
        } else if (reinforced_score <= 380 && cash_category == '2. cash new cli >=7d') {
            score_cut_off_reject_reason = 'JA01';
        }
    } else {
        if (reinforced_score <= 375) {
            score_cut_off_reject_reason = 'JA01';
        } else if (reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
            score_cut_off_reject_reason = 'JA01';
        }    
    }

    /* reject due to null fdc */
    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && reinforced_score < 440) {
        score_cut_off_reject_reason = 'JA01';
    }

    /* NEW rio_reject_cash_feb24 */
    /* just in case, tapi most likely whitelist = existing*/
    if (reinforced_score < 445 && cash_origination == 'NEW'){

        /* reject fdc late */
        if (distinct_count_organizer_id_late_1_year > 0){
            score_cut_off_reject_reason = 'JA01';
        }

        /* reject inst app 3 days */
        if (number_of_installed_loan_apps_within_3days > 1){
            score_cut_off_reject_reason = 'JA01';
        }
    }
        
    /* RO rio_reject_cash_feb24 */
    if (reinforced_score < 445 && cash_origination == 'EXISTING'){
            
        /* reject fdc late */
        if (distinct_count_organizer_id_late_1_year > 1){
            score_cut_off_reject_reason = 'JA01';
        }

        /* reject inst app 3 days */
        if (number_of_installed_loan_apps_within_3days > 1){
            score_cut_off_reject_reason = 'JA01';
        }
    }

    /* bypass user from btpl cash loan --> no bypass for blibli */
    if ((ab_test_cash_existing_approve_low_tails == 'EXPANDED') && (count_of_active_platforms < 3)) {
        if (is_access_btpl_cash_loan && (submission_source != null) && ((submission_source == 'tiket_cash_loan')) && (reinforced_score > 380)) {
            score_cut_off_reject_reason = '';
        }
    } else {
        if (is_access_btpl_cash_loan && (submission_source != null) && ((submission_source == 'tiket_cash_loan')) && (reinforced_score > 395)) {
            score_cut_off_reject_reason = '';
        }
    }
    
    result_string = score_cut_off_reject_reason + ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}


/* ------------------- LOGIC - CASH LOAN NEW -------------------*/
if (product_type == 'CASH_LOAN' && cash_origination == 'NEW') {
    /* ------------------- LOGIC - score category -------------------*/
    /* ------------------- WARNING -------------------*/
    /* Please also implement your changes here to Auto Approve CASH LOAN NEW, under the header: */

    /*------------------- approved blibli/tiket limit -------------------*/
    if (reinforced_score < 410) {
        score_cut_off_reject_reason = 'JA01';
    /* remove temporarily, might need these rules if risk is increasing later
    } else if ((reinforced_score < 400) && (distinct_count_organizer_id_late_1_year > 0)) {
        score_cut_off_reject_reason = 'JA01';
    } else if ((reinforced_score < 400) && (number_of_installed_loan_apps_within_3days > 1)) {
        score_cut_off_reject_reason = 'JA01'; 
    */
    } else if ((reinforced_score < 420) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier))) {
        score_cut_off_reject_reason = 'JA01';
    } 
    /* else if (
        (reinforced_score < 440) && 
        (discounted_sum_outstanding_late_1y < 0) &&
        (percentage_month_not_late_in_last_1_year_payment <= 0.9 || sum_not_late_settled <= 100000000)
    ) {
        score_cut_off_reject_reason = 'JA01';
    } */
        
    /* getcontact verify identity checking */
    if (tiket_score <= 0 && blibli_score <= 0) {
        if ((!is_match_dana) && (getcontact_verify_status != 'OK') && (identity_score < 480)) {
            identity_score_cut_off_reject_reason = 'HA04';
        }
            
        if ((!is_match_dana) && (getcontact_verify_status == 'OK') && (identity_score < 480) && (reinforced_score < 410)) {
            score_cut_off_reject_reason = 'JA01';
        }
    }
        
    ab_test_cash_new_approve_100 = abTestingHelper.getVariation(orderId, 'CASH_NEW_APPROVE_100_V2', 'NORMAL')
    /* approve 100 users per month */
    if (ab_test_cash_new_approve_100 == 'APPROVE_100') {
        score_cut_off_reject_reason = '';
        identity_score_cut_off_reject_reason = '';
    }
        
    /* ------ Cash New Approve 100% Offline Origination (24h After Approved Offline) ------ */
    if(count_user_prev_approved_offline_applications_24h>0) {
        score_cut_off_reject_reason = '';
        identity_score_cut_off_reject_reason = '';
        working_city_reject_reason = '';
    }

    /* pilot - bypass JA01 - cash new new with no prev cash loan, reject JA01 only, high active limit */
    if ((score_cut_off_reject_reason == 'JA01') && (identity_score_cut_off_reject_reason == '') && (working_city_reject_reason == '')
        && (number_of_related_previous_cashloan_order_id == 0) 
        && ((maximum_limit_exposure >= 9000000 && reinforced_score >= 380)
            || (maximum_limit_exposure >= 7500000 && reinforced_score >= 400))
    ) {
        score_cut_off_reject_reason = '';
    }

    /* fdc null pilot - bypass JA01 */
    if ((score_cut_off_reject_reason == 'JA01') && (identity_score_cut_off_reject_reason == '') && (working_city_reject_reason == '')) {
        if (((is_fdc_null) && (izi_max_multi_inquiries_90d <= 2) && (number_of_installed_loan_apps_within_14days <= 2))
            || ((discounted_sum_outstanding_late_1y == -1) && (fdc_maximum_dpd_no_filter <= 0))
        ) {
            if ((pefindo_max_payment_dpd == 0) && (reinforced_score >= 320) && ((max_limit_active_cc >= 5000000) || (pefindo_max_fourwheel_loan_amount >= 200000000))) {
                score_cut_off_reject_reason = '';
            } else if ((pefindo_max_payment_dpd == 0) && (reinforced_score >= 320)) {
                score_cut_off_reject_reason = '';
            } else if ((pefindo_max_payment_dpd >= 0) && (pefindo_max_payment_dpd < 30) && (pefindo_max_payment_dpd_last_5_month <= 0) && (reinforced_score >= 320)) {
                score_cut_off_reject_reason = '';
            }
        }
    }

    /* fdc null pilot - bypass HA04 */
    if ((score_cut_off_reject_reason == 'JA01') || (identity_score_cut_off_reject_reason == 'HA04') && (working_city_reject_reason == '')) {
        if (((is_fdc_null) && (izi_max_multi_inquiries_90d <= 2) && (number_of_installed_loan_apps_within_14days <= 2))
            || ((discounted_sum_outstanding_late_1y == -1) && (fdc_maximum_dpd_no_filter <= 0))
        ) {
            if ((pefindo_max_payment_dpd == 0) && (reinforced_score >= 340) && ((max_limit_active_cc >= 5000000) || (pefindo_max_fourwheel_loan_amount >= 200000000))) {
                score_cut_off_reject_reason = '';
                identity_score_cut_off_reject_reason = '';
            } else if ((pefindo_max_payment_dpd == 0) && (reinforced_score >= 340)) {
                score_cut_off_reject_reason = '';
                identity_score_cut_off_reject_reason = '';
            } else if ((pefindo_max_payment_dpd >= 0) && (pefindo_max_payment_dpd < 30) && (pefindo_max_payment_dpd_last_5_month <= 0) && (reinforced_score >= 340)) {
                score_cut_off_reject_reason = '';
                identity_score_cut_off_reject_reason = '';
            }
        }
    }

    /* pilot - bypass JA01 - cash new new with spinjam feature etc */
    if ((score_cut_off_reject_reason == 'JA01') && (identity_score_cut_off_reject_reason == '') && (working_city_reject_reason == '')
        && (count_previous_rejected_cashloan_by_userid == 0) 
        && (fdc_spinjam_gopinjam_kredifazz_months == 'spinjam_gopinjam_kredifazz_RO_2_months' 
                || fdc_spinjam_gopinjam_kredifazz_months == 'spinjam_gopinjam_kredifazz_RO_3_months')
        && (!(sum_amount_disbursed_total < 0 || discounted_sum_outstanding_late_1y == -1))
        && (!(count_write_off_organizer_id_last_3y > 0 || distinct_count_organizer_id_late_1_year > 0 || discounted_sum_outstanding_late_1y > 0 || sum_outstanding_amount_late_15 > 0))
        && (number_of_statistic_inquiry_id_030d <= 5)
        && ((reinforced_score >= 410) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier))
                || (reinforced_score >= 400) && (arrayUtils.contains(['TIER 1', 'TIER 2'], cash_city_tier)))
    ) {
        score_cut_off_reject_reason = '';
    }

    result_string = score_cut_off_reject_reason + ';' + identity_score_cut_off_reject_reason + ';;;;;' + working_city_reject_reason + ';;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

/* ------------------- LOGIC - CASH LOAN RO -------------------*/
if (product_type == 'CASH_LOAN' && cash_origination == 'EXISTING') {
    /* pilot assignment for approve lower tais */
    if ((reinforced_score > 380) && (reinforced_score <= 400)) {
        ab_test_cash_existing_approve_low_tails = abTestingHelper.getVariation(orderId, 'PILOT_APPROVE_TAILS_CASH_EXISTING', 'NORMAL');
    }

    /* ------------------- LOGIC - score category -------------------*/
    if ((ab_test_cash_existing_approve_low_tails == 'EXPANDED') && (count_of_active_platforms < 3)) {
        if (reinforced_score <= 380) {
            score_cut_off_reject_reason = 'JA01';
        }
    } else {
        if (reinforced_score <= 396) {
            score_cut_off_reject_reason = 'JA01';
        } else if (reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
            score_cut_off_reject_reason = 'JA01';
        }
    }

    /* reject due to null fdc */
    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && reinforced_score < 440) {
        score_cut_off_reject_reason = 'JA01';
    }

    /* RO rio_reject_cash_feb24 */
    if (reinforced_score < 445){
        
        /* reject fdc late */
        if (distinct_count_organizer_id_late_1_year > 1){
            score_cut_off_reject_reason = 'JA01';
        }

        /* reject inst app 3 days */
        if (number_of_installed_loan_apps_within_3days > 1){
            score_cut_off_reject_reason = 'JA01';
        }
    }

    /* ------------------- Cash Loan Preapproved  -------------------*/
    if (has_pre_approved_cash_loan_offer && (offerEvent == 'PAID_OFF' || offerEvent == 'CLI_REGISTRATION')) {
        score_cut_off_reject_reason = '';
        working_city_reject_reason = '';
    }

    /* ------------------- Preapproved Cash Loan Offer Calculation  -------------------*/

    if (is_offer_calculation) {
        
        /*For offer logging purpose*/
        if  (score_cut_off_reject_reason == '' && working_city_reject_reason == '') {
            var message = ('offer_calculation_info:'+'eligible_for_offer')
            log.info(message);
        }

        if (offer_experiment_code == 'normal_set_a') {
            score_cut_off_reject_reason = 'JA01';
        } else if (offer_experiment_code == 'pilot_set_b') {
            /*Do nothing */
        }

    }

    result_string = score_cut_off_reject_reason + ';;;;;;' + working_city_reject_reason + ';;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };    
}

/* ------------------- LOGIC - CREDIT LIMIT AVANTO -------------------*/
if (product_type == 'CREDIT_LIMIT' && partner == 'AVANTO' && !is_offline_applicant) {
    score_cut_off_reject_reason = '';
    identity_score_cut_off_reject_reason = '';
    if (reinforced_score < 435){
        score_cut_off_reject_reason = 'JA01';
    } 
    if (identity_score < 440){
        identity_score_cut_off_reject_reason = 'HA04';
    }

    result_string = score_cut_off_reject_reason + ';' + identity_score_cut_off_reject_reason + ';;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

/* ------------------- LOGIC - CREDIT LIMIT DEKORUMA -------------------*/
if (product_type == 'CREDIT_LIMIT' && is_merchant_dekoruma && is_offline_applicant) {
    score_cut_off_reject_reason = '';
    identity_score_cut_off_reject_reason = '';
    if (reinforced_score < 475){
        score_cut_off_reject_reason = 'JA01';
    } 
    if (identity_score < 440){
        identity_score_cut_off_reject_reason = 'HA04';
    }
    /* hard reject move from auto approve to bq2, so dekoruma origination will have 0% pass to CA approval */
    if (number_of_related_user_id>=2){
        score_cut_off_reject_reason = 'JA01';
    }

    result_string = score_cut_off_reject_reason + ';' + identity_score_cut_off_reject_reason + ';;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

/* ------------------- LOGIC - CREDIT LIMIT -------------------*/

if ((product_type == 'CREDIT_LIMIT') && !is_offline_applicant && !is_blibli_offline_applicant) {

/* ------------------- User Flag Logic -------------------*/

var tiket_new_user = ((tiket_score <= 0) &&
                    (blibli_score <= 0) &&
                    (tiket_account_age == '' || tiket_account_age == '-99') && 
                    (tiket_account_age_max == '' || tiket_account_age_max == '-99'))

var tiket_additional_existing = ((tiket_sum_order_amount_paid_max > 0) ||
                            (tiket_days_before_1st_trx > 0) || 
                            (((tiket_account_age_days >= 1280) || (tiket_account_age_days_max >= 1280))))

var blibli_new_user = ((tiket_score <= 0) && (blibli_score <= 0))

var blibli_additional_existing = ((tiket_sum_order_amount_paid_max > 0) ||
                              (tiket_days_before_1st_trx > 0) || 
                              (blibli_order_amount_alltime > 0))

/* ------------------- score cut off -------------------*/
    if (partner == 'BLIBLI' || partner == 'TIKET') {
        if (partner == 'TIKET') {
            if (experiment_tiket == 'tiket_normal_set'){
                if (reinforced_score < 350) {
                    score_cut_off_reject_reason = 'JA01';
                }

                if (tiket_new_user){
                    if (reinforced_score < 360){
                        score_cut_off_reject_reason = 'JA01';
                    }      
                    if (tiket_additional_existing){
                        if (reinforced_score >= 340){
                            score_cut_off_reject_reason = '';
                        }
                    }
                }
            }

            else if (experiment_tiket != 'tiket_normal_set'){
                /* do nothing */
            }
        }
        
        if (partner == 'BLIBLI') {
			if (experiment_blibli == 'blibli_normal_set'){
                if (reinforced_score < 360) {
						score_cut_off_reject_reason = 'JA01';
				}
			
				if ((blibli_new_user) && !(blibli_additional_existing)) {
					if (reinforced_score < 380) {
						score_cut_off_reject_reason = 'JA01';
					} 
				}
        	}

            else if (experiment_blibli != 'blibli_normal_set'){
                /* do nothing */
        	}
        }
    } else {
        /* CLI INDODANA */
        if (experiment_code == 'indodana_normal_set'){
            if (is_zalora_merchant_name_in_last_30_days =='ZALORA') {
                if(reinforced_pefindo_scoring_cli_offline_no_ewallet_20240912 < 380){
                    score_cut_off_reject_reason = 'JA01';
                }
            }
            else if (reinforced_score < 360) {
                /* CLI Indodana, apply Cash Loan rule to rejected population */
                /* ------------------- LOGIC - CASH LOAN WHITELIST -------------------*/
                if (is_whitelisted_ath_via_limit_user && !is_offer_calculation) {
                    /* reject low score */
                    if (adhoc_cashloan_reinforced_score <= 375) {
                        score_cut_off_reject_reason = 'JA01';
                    } else if (adhoc_cashloan_reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
                        score_cut_off_reject_reason = 'JA01';
                    }

                    /* reject due to null fdc */
                    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && adhoc_cashloan_reinforced_score < 440) {
                        score_cut_off_reject_reason = 'JA01';
                    }
                
                    /* NEW rio_reject_cash_feb24 */
                    /* just in case, tapi most likely whitelist = existing*/
                    if (adhoc_cashloan_reinforced_score < 445 && cash_origination == 'NEW'){
                
                        /* reject fdc late */
                        if (distinct_count_organizer_id_late_1_year > 0){
                            score_cut_off_reject_reason = 'JA01';
                        }
                
                        /* reject inst app 3 days */
                        if (number_of_installed_loan_apps_within_3days > 1){
                            score_cut_off_reject_reason = 'JA01';
                        }
                    }
                
                    /* RO rio_reject_cash_feb24 */
                    if (adhoc_cashloan_reinforced_score < 445 && cash_origination == 'EXISTING'){
                
                        /* reject fdc late */
                        if (distinct_count_organizer_id_late_1_year > 1){
                            score_cut_off_reject_reason = 'JA01';
                        }
                
                        /* reject inst app 3 days */
                        if (number_of_installed_loan_apps_within_3days > 1){
                            score_cut_off_reject_reason = 'JA01';
                        }
                    }
                }
                
                /* ------------------- LOGIC - CASH LOAN NEW -------------------*/
                if (cash_origination == 'NEW') {
                    /*------------------- approved blibli/tiket limit -------------------*/
                    if (adhoc_cashloan_reinforced_score < 410) {
                            score_cut_off_reject_reason = 'JA01';
                    /* remove temporarily, might need these rules if risk is increasing later
                    } else if ((reinforced_score < 400) && (distinct_count_organizer_id_late_1_year > 0)) {
                        score_cut_off_reject_reason = 'JA01';
                    } else if ((reinforced_score < 400) && (number_of_installed_loan_apps_within_3days > 1)) {
                            score_cut_off_reject_reason = 'JA01';
                    */
                    } else if ((adhoc_cashloan_reinforced_score < 420) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier))) {
                        score_cut_off_reject_reason = 'JA01';
                    } 
                    /* else if (
                        (reinforced_score < 440) && 
                        (discounted_sum_outstanding_late_1y < 0) &&
                        (percentage_month_not_late_in_last_1_year_payment <= 0.9 || sum_not_late_settled <= 100000000)
                    ) {
                        score_cut_off_reject_reason = 'JA01';
                    } */
                        
                    /* getcontact verify identity checking */
                    if (tiket_score <= 0 && blibli_score <= 0) {  
                        if ((!is_match_dana) && (getcontact_verify_status == 'OK') && (identity_score < 480) && (adhoc_cashloan_reinforced_score < 410)) {
                                score_cut_off_reject_reason = 'JA01';
                            }
                    }
                }

                /* ------------------- LOGIC - CASH LOAN RO -------------------*/
                if (cash_origination == 'EXISTING') {
                    /* ------------------- LOGIC - score category -------------------*/
                    if (adhoc_cashloan_reinforced_score <= 396) {
                        score_cut_off_reject_reason = 'JA01';
                    } else if (adhoc_cashloan_reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
                                score_cut_off_reject_reason = 'JA01';
                            }
                    
                    /* reject due to null fdc */
                    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && adhoc_cashloan_reinforced_score < 440) {
                        score_cut_off_reject_reason = 'JA01';
                    }
                
                        /* RO rio_reject_cash_feb24 */
                    if (adhoc_cashloan_reinforced_score < 445){
                
                            /* reject fdc late */
                            if (distinct_count_organizer_id_late_1_year > 1){
                                score_cut_off_reject_reason = 'JA01';
                            }
                    
                            /* reject inst app 3 days */
                            if (number_of_installed_loan_apps_within_3days > 1){
                                score_cut_off_reject_reason = 'JA01';
                            }
                    }
                    
                    /* ------------------- Preapproved Cash Loan Offer Calculation  -------------------*/

                    if (is_offer_calculation) {

                        if (offer_experiment_code == 'normal_set_a') {
                                score_cut_off_reject_reason = 'JA01';
                        } else if (offer_experiment_code == 'pilot_set_b') {
                            /*Do nothing */
                            }
                        }                
                }
            } else if (
                !((is_covered_cities_cli) 
                    || (is_covered_cities_cli_selected_district)
                    || (is_covered_cities_cli_living_city)
                    || (is_covered_cities_cli_selected_district_living_city))) {

                    /* CLI Indodana, apply Cash Loan rule to rejected population */
                /* ------------------- LOGIC - CASH LOAN WHITELIST -------------------*/
                if (is_whitelisted_ath_via_limit_user && !is_offer_calculation) {
                    /* reject low score */
                    if (adhoc_cashloan_reinforced_score <= 375) {
                        score_cut_off_reject_reason = 'JA01';
                    } else if (adhoc_cashloan_reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
                        score_cut_off_reject_reason = 'JA01';
                    }

                    /* reject due to null fdc */
                    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && adhoc_cashloan_reinforced_score < 440) {
                        score_cut_off_reject_reason = 'JA01';
                    }
                
                    /* NEW rio_reject_cash_feb24 */
                    /* just in case, tapi most likely whitelist = existing*/
                    if (adhoc_cashloan_reinforced_score < 445 && cash_origination == 'NEW'){
                
                        /* reject fdc late */
                        if (distinct_count_organizer_id_late_1_year > 0){
                            score_cut_off_reject_reason = 'JA01';
                        }
                
                        /* reject inst app 3 days */
                        if (number_of_installed_loan_apps_within_3days > 1){
                            score_cut_off_reject_reason = 'JA01';
                        }
                    }
                
                    /* RO rio_reject_cash_feb24 */
                    if (adhoc_cashloan_reinforced_score < 445 && cash_origination == 'EXISTING'){
                
                        /* reject fdc late */
                        if (distinct_count_organizer_id_late_1_year > 1){
                            score_cut_off_reject_reason = 'JA01';
                        }
                
                        /* reject inst app 3 days */
                        if (number_of_installed_loan_apps_within_3days > 1){
                            score_cut_off_reject_reason = 'JA01';
                        }
                    }
                }
                
                /* ------------------- LOGIC - CASH LOAN NEW -------------------*/
                if (cash_origination == 'NEW') {
                    /*------------------- approved blibli/tiket limit -------------------*/
                    if (adhoc_cashloan_reinforced_score < 410) {
                            score_cut_off_reject_reason = 'JA01';
                    /* remove temporarily, might need these rules if risk is increasing later
                    } else if ((reinforced_score < 400) && (distinct_count_organizer_id_late_1_year > 0)) {
                        score_cut_off_reject_reason = 'JA01';
                    } else if ((reinforced_score < 400) && (number_of_installed_loan_apps_within_3days > 1)) {
                            score_cut_off_reject_reason = 'JA01';
                    */
                    } else if ((adhoc_cashloan_reinforced_score < 420) && (arrayUtils.contains(['TIER 3', 'CLI SELECTED DISTRICT', 'OTHER'], cash_city_tier))) {
                        score_cut_off_reject_reason = 'JA01';
                    } 
                    /* else if (
                        (reinforced_score < 440) && 
                        (discounted_sum_outstanding_late_1y < 0) &&
                        (percentage_month_not_late_in_last_1_year_payment <= 0.9 || sum_not_late_settled <= 100000000)
                    ) {
                        score_cut_off_reject_reason = 'JA01';
                    } */
                        
                    /* getcontact verify identity checking */
                    if (tiket_score <= 0 && blibli_score <= 0) {
                        if ((!is_match_dana) && (getcontact_verify_status == 'OK') && (identity_score < 480) && (adhoc_cashloan_reinforced_score < 410)) {
                                score_cut_off_reject_reason = 'JA01';
                            }
                    }
                }

                /* ------------------- LOGIC - CASH LOAN RO -------------------*/
                if (cash_origination == 'EXISTING') {
                    /* ------------------- LOGIC - score category -------------------*/
                    if (adhoc_cashloan_reinforced_score <= 396) {
                        score_cut_off_reject_reason = 'JA01';
                    } else if (adhoc_cashloan_reinforced_score <= 400 && cash_category == '2. cash new cli >=7d') {
                                score_cut_off_reject_reason = 'JA01';
                            }
                    
                    /* reject due to null fdc */
                    if (is_fdc_null && (has_cli_trx_category == 'NO CLI' || has_cli_trx_category == 'HAS CLI & HAS NO CLI TRX') && adhoc_cashloan_reinforced_score < 440) {
                        score_cut_off_reject_reason = 'JA01';
                    }
                
                        /* RO rio_reject_cash_feb24 */
                    if (adhoc_cashloan_reinforced_score < 445){
                
                            /* reject fdc late */
                            if (distinct_count_organizer_id_late_1_year > 1){
                                score_cut_off_reject_reason = 'JA01';
                            }
                    
                            /* reject inst app 3 days */
                            if (number_of_installed_loan_apps_within_3days > 1){
                                score_cut_off_reject_reason = 'JA01';
                            }
                    }
                    
                    /* ------------------- Preapproved Cash Loan Offer Calculation  -------------------*/

                    if (is_offer_calculation) {
                        
                        if (offer_experiment_code == 'normal_set_a') {
                                score_cut_off_reject_reason = 'JA01';
                        } else if (offer_experiment_code == 'pilot_set_b') {
                            /*Do nothing */
                            }
                        }                
                }
            }
        }
        else if (experiment_code != 'indodana_normal_set'){
            /* do nothing */
        }
    }             

/* ------------------- identity score cut off -------------------*/
    if (partner == 'BLIBLI' || partner == 'TIKET') {
		if (partner == 'BLIBLI'){
			if (experiment_blibli == 'blibli_normal_set'){
                if ((blibli_new_user) && !(blibli_additional_existing)) {
                    if (identity_score < 460) {
                        identity_score_cut_off_reject_reason = 'HA04';
                        }
                    }

                if ((blibli_new_user) && (blibli_additional_existing)) {
                    if ((identity_score < 400) && (match_dana_name_logic <= 0)) {
                        identity_score_cut_off_reject_reason = 'HA04';
                        }
                    }

                if ((getcontact_verify_status == 'OK')) {
                    identity_score_cut_off_reject_reason = '';
                    } 
			}

		}
		
		if (partner == 'TIKET'){
			if (experiment_tiket == 'tiket_normal_set'){
                
                if (tiket_new_user){
                        if ((identity_score < 480) && !(tiket_additional_existing)){
                            identity_score_cut_off_reject_reason = 'HA04';
                        }
                }

                if ((getcontact_verify_status == 'OK') && (identity_score < 480)) {
                    identity_score_cut_off_reject_reason = '';
                } 
            }

            else if (experiment_tiket != 'tiket_normal_set'){
                /* do nothing */
			}
		}

    } else {
        /* CLI INDODANA */
        if (experiment_code == 'indodana_normal_set'){
            /* do nothing */
        }   
        else if (experiment_code != 'indodana_normal_set'){
            /* do nothing */
        }   
    }

    /*------------------- pass whitelisted tiket users with active CLI Indodana/Blibli -------------------*/
	if (partner == 'TIKET' && (is_tiket_user_with_active_cli_indodana || is_tiket_user_with_active_cli_blibli)) {
		/*score_cut_off_reject_reason = '';*/
		identity_score_cut_off_reject_reason = '';    
	}

    /* ------------------ Loyalty based rules ------------------ */
    

    var diamond_blibli_tiket = (blibli_loyalty_status.toLowerCase() == 'diamond') 
                              || (tiket_loyalty_status.toLowerCase() == 'diamond')
                              || (tiket_loyalty_status_max.toLowerCase() == 'diamond')
                                || (tiket_order_amount_combined >= 33000000)
                                || (tiket_count_order_paid_max >= 40);

    var platinum_blibli_tiket = (blibli_loyalty_status.toLowerCase() == 'platinum') 
                              || (tiket_loyalty_status.toLowerCase() == 'platinum')
                              || (tiket_loyalty_status_max.toLowerCase() == 'platinum')
                                || (tiket_order_amount_combined >= 10000000)
                                || (tiket_count_order_paid_max >= 15);                          
     
    if ((partner == 'TIKET') && (((score_cut_off_reject_reason != '') || (identity_score_cut_off_reject_reason != '')))) {
        var exception_message = 'tiket_loyalty_status_exception:';

        if (diamond_blibli_tiket) {
            if (reinforced_score >= 260) {
                score_cut_off_reject_reason = '';
                identity_score_cut_off_reject_reason = '';
                exception_message = exception_message + ' diamond bq2 exception';
            }
        } else if (platinum_blibli_tiket) {
            if (reinforced_score >= 270) {
                score_cut_off_reject_reason = '';
                identity_score_cut_off_reject_reason = '';
                exception_message = exception_message + ' platinum bq2 exception';
            }
        }
        log.info(exception_message);
    }
    
    if ((partner == 'BLIBLI') && (((score_cut_off_reject_reason != '') || (identity_score_cut_off_reject_reason != '')))) {
        var exception_message = 'blibli_loyalty_status_exception:';
        
        if (diamond_blibli_tiket) {
            if (reinforced_score >= 340) {
                score_cut_off_reject_reason = '';
                identity_score_cut_off_reject_reason = '';
                exception_message = exception_message + ' diamond bq2 exception';
            }
        } 
        log.info(exception_message);
    }

    result_string = score_cut_off_reject_reason + ';' + identity_score_cut_off_reject_reason + ';;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };

}

if ((product_type == 'CREDIT_LIMIT') && (is_offline_applicant || is_online_applicant_nearby_offline_merchant)) {
    score_cut_off_reject_reason = '';  

    if (experiment_offline == 'offline_normal_set' ||  is_online_applicant_nearby_offline_merchant) { 
        /*
        Tier 0: hcf                                 : new pefindo 380++
        Tier 1: pareto brand                        : new pefindo 372++ 
        Tier 1: non-smartphone & good-average store : new pefindo 392++
        Tier 2: smartphone     & good store         : new pefindo 407++
        Tier 3: smartphone     & average store      : new pefindo 407++
        Tier 4: all product    & bad store          : new pefindo 412++
        Tier 5: all product    & very bad store     : new pefindo 415++
        Tier 6: motor & sepeda listrik              : new pefindo 420++
        */

        /*Hard Reject for Offline Blacklist Store*/
        if (is_blacklist_store){
            score_cut_off_reject_reason = 'JA01';
        }

        if (['hcf'].contains(offline_store_category) || ( gps_nearby_offline_flag_treatment == 'hcf_treatment' && is_online_applicant_nearby_offline_merchant) ) {
            if(reinforced_score < 380){
                score_cut_off_reject_reason = 'JA01';
            }
        }
        /*TIER 1 */
        else if (is_pareto_brand || (is_pareto_brand_2 && is_selected_sub_item)) {
            if(reinforced_score < 372){
                score_cut_off_reject_reason = 'JA01';
            }
        } 
        /*TIER 1 */
        else if (offline_item_category=='non-smartphone' && ['good','average'].contains(offline_store_category)) {
            if(reinforced_score < 392){
                score_cut_off_reject_reason = 'JA01';
            }
        } 
        /*TIER 2 */
        else if (offline_item_category=='smartphone' && ['good'].contains(offline_store_category)) {
            if(reinforced_score < 407){
                score_cut_off_reject_reason = 'JA01';
            }
        } 
        /*TIER 3 */
        else if ((offline_item_category=='smartphone' && ['average'].contains(offline_store_category)) ||( gps_nearby_offline_flag_treatment == 'mp_treatment' && is_online_applicant_nearby_offline_merchant) ) {
            if(reinforced_score < 407){
                score_cut_off_reject_reason = 'JA01';
            }
        } 
        /*TIER 4 */
        else if (['bad'].contains(offline_store_category)) {
            if(reinforced_score < 412){
                score_cut_off_reject_reason = 'JA01';
            }
        } 
        /*TIER 5 */
        else if (['very_bad'].contains(offline_store_category)) {
            if(reinforced_score < 415){
                score_cut_off_reject_reason = 'JA01';
            }
        }
        /*TIER 6 */
        /*Out of if-chain above, overwrite rule again if motor listrik or sepeda listrik with considering store category*/
		if (stringUtils.contains(offline_sub_item_category.toLowerCase(), 'motor listrik') || stringUtils.contains(offline_sub_item_category.toLowerCase(), 'sepeda listrik')) {
			if(reinforced_score < 420){
                score_cut_off_reject_reason = 'JA01';
            }
		}  

        /*High Cutoff Bitung*/
        if (stringUtils.contains(working_city.toLowerCase(), 'bitung') ||
            stringUtils.contains(living_city.toLowerCase(), 'bitung')){
                if(reinforced_score < 460){
                    score_cut_off_reject_reason = 'JA01';
            }
        }
    }

    else if (experiment_offline != 'offline_normal_set') {
        /* do nothing */
    }
        
    result_string = score_cut_off_reject_reason + ';' + identity_score_cut_off_reject_reason + ';;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

if ((product_type == 'CREDIT_LIMIT') && is_blibli_offline_applicant) {
    score_cut_off_reject_reason = 'JA01';
    /*
    Tier 1: all product    & blibli instore          : pefindo 340++
     */

    if (reinforced_score >= 340) {
        score_cut_off_reject_reason = '';
    }

    result_string = score_cut_off_reject_reason + ';' + identity_score_cut_off_reject_reason + ';;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

/* ------------------- LOGIC - COLLATERAL LOAN -------------------*/
if (product_type == 'COLLATERAL_LOAN') {
    /* ------------------- LOGIC - score category -------------------*/

    if (reinforced_score < 440) {
        score_cut_off_reject_reason = 'JA01';
    }

    result_string = score_cut_off_reject_reason + ';;;;;;;;';
    return {
        "rejectCode": result_string,
        "experimentCode": experiment_code,
        "offerExperimentCode": offer_experiment_code,
        "experimentTiket": experiment_tiket,
        "experimentBlibli": experiment_blibli,
        "experimentOffline": experiment_offline,
        "cashCityTier": cash_city_tier,
        "abTestCashNewApprove100": ab_test_cash_new_approve_100,
        "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
    };
}

result_string = ';;;;;;;;';
return {
    "rejectCode": result_string,
    "experimentCode": experiment_code,
	"offerExperimentCode": offer_experiment_code,
    "experimentTiket": experiment_tiket,
    "experimentBlibli": experiment_blibli,
    "experimentOffline": experiment_offline,
    "cashCityTier": cash_city_tier,
	"abTestCashNewApprove100": ab_test_cash_new_approve_100,
    "mamundaProcessName": mamunda_process_name_str,
        "abTestCashExistingApproveLowTails": ab_test_cash_existing_approve_low_tails
};