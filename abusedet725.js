/**
 * ==== Merchant Integration Negative Case Testing ====
 https://chat.google.com/room/AAAAdgZzmjo/hfpq6V5Jw4M/hfpq6V5Jw4M?cls=10
 **/
if (userPhoneNumber == '+6281546009893') {
  return "REJECT;Merchant Integration Negative Case;BlacklistedUser";
}

var super_good_merchants = [
    'kfc',
    '- mcd'
]

for (merchants: super_good_merchants) {
    if (stringUtils.contains(merchantName.toLowerCase(), merchants)) {
        return "NORMAL;Safe Transaction";
    }
}

/**
 * ==== SUSPICIOUS PACKAGE NAME CHECK ====
 **/
var monitoredOfficialPackageNameSet = {
    // Identitas Kependudukan Digital
    "gov.dukcapil.mobile_id",
  
    // M-Pajak
    "id.go.pajak.mpajak",
    "id.go.pajak.djp"
};

var containsSuspiciousPackageName = 
    function() {
        if (suspiciousPackageAppMap == null) {
        return false;
    }

    var packageNameSet = suspiciousPackageAppMap.keySet();
    return !monitoredOfficialPackageNameSet.containsAll(packageNameSet)
  };

var isContainsSuspiciousPackageName = containsSuspiciousPackageName();

/**
 * ==== SUSPICIOUS PACKAGE NAME CHECK ====
 **/
 
/* Flag to globally allow SUSPICIOUS transaction. Would be helpful when AF is off so that we can just set this flag to false since no one will review Real Time Queue */
var ALLOW_SUSPICIOUS_TRANSACTION = abTestingHelper.getVariation(entityId, 'ABUSE_DETECTION_ALLOW_SUSPICIOUS_TRANSACTION', '1') == '1';  
var day = dateHelper.getDay("+07");
var hour = dateHelper.getHour("+07");

var whitelistedResults = blacklistHelper.getWhitelists([
    {"type": 'emails', "namespace": 'demoOjk', "searchField": {"email": userEmail.toLowerCase()}},
    {"type": 'emails', "namespace": 'sqa-testing-transaction', "searchField": {"email": userEmail.toLowerCase()}},
    {"type": 'phones', "namespace": 'employee', "searchField": {"phoneNumber": userPhoneNumber}},
    {"type": 'phones', "namespace": 'special-person', "searchField": {"phoneNumber": userPhoneNumber}},
    {"type": 'users', "namespace": 'cross-contract-cash-to-bnpl', "searchField": {"userId": masterUserId}},
    {"type": 'users', "namespace": 'cross-contract-cash-to-bnpl-auto', "searchField": {"userId": masterUserId}},
    {"type": 'phones', "namespace": 'production-tester-user', "searchField": {"phoneNumber": userPhoneNumber}},
    {"type": 'users', "namespace": 'offline-mp-higher-rate-cde', "searchField": {"userId": masterUserId}},
    {"type": 'users', "namespace": 'mandatory-dp-offline-mp-higher-rate-cde', "searchField": {"userId": masterUserId}},
    {"type": 'users', "namespace": 'traditional-mp-eligible-promo', "searchField": {"userId": masterUserId}},
    {"type": 'users', "namespace": 'traditional-mandatory-dp-offline-mp', "searchField": {"userId": masterUserId}},
    {"type": 'users', "namespace": 'ecommerce-va-payment', "searchField": {"userId": masterUserId}}
]);

var blacklistedResults = blacklistHelper.getBlacklists([
    {"type": 'users', "namespace": 'account-takeover', "searchField": {"userId": userId}},
    {"type": 'phones', "namespace": 'external-blacklists', "searchField": {"phoneNumber": userPhoneNumber}},
    {"type": 'phones', "namespace": 'external-blacklists', "searchField": {"phoneNumber": buyerPhoneNumber}},
    {"type": 'phones', "namespace": 'phones', "searchField": {"phoneNumber": shippingPhoneNumber}},
    {"type": 'phones', "namespace": 'phones', "searchField": {"phoneNumber": billingPhoneNumber}},
    {"type": 'phones', "namespace": 'promo-abuse', "searchField": {"phoneNumber": userPhoneNumber}}
]);

var is_silverlist = (blacklistHelper.isWhitelistedBulkCheck('users', 'cross-contract-cash-to-bnpl', {'userId': masterUserId}, whitelistedResults) || blacklistHelper.isWhitelistedBulkCheck('users', 'cross-contract-cash-to-bnpl-auto', {"userId": masterUserId}, whitelistedResults))
var is_whitelist_va = blacklistHelper.isWhitelistedBulkCheck('users', 'ecommerce-va-payment', {'userId': masterUserId}, whitelistedResults);

if (blacklistHelper.isWhitelistedBulkCheck('emails', 'demoOjk', { "email": userEmail.toLowerCase() }, whitelistedResults)) {
    return "NORMAL;User Email is Whitelisted on Namespace demoOjk;DemoOjk;Testing";
}

if (blacklistHelper.isWhitelistedBulkCheck('emails', 'sqa-testing-transaction', { "email": userEmail.toLowerCase() }, whitelistedResults)) {
    return "NORMAL;SQA TESTING;TESTING;TESTING";
}

var qrisLimitValidationMappingByMcc = {
    '5309': { 'trxLimit': '500000' },
    '4784': { 'trxLimit': '500000' },
    '4131': { 'trxLimit': '1000000' },
    '4112': { 'trxLimit': '2000000' },
    '4111': { 'trxLimit': '100000' },
    '5111': { 'trxLimit': '500000' },
    '5137': { 'trxLimit': '2500000' },
    '5139': { 'trxLimit': '2500000' },
    '5192': { 'trxLimit': '5000000' },
    '5200': { 'trxLimit': '5000000' },
    '5251': { 'trxLimit': '5000000' },
    '5311': { 'trxLimit': '2500000' },
    '5331': { 'trxLimit': '1000000' },
    '5333': { 'trxLimit': '1000000' },
    '5399': { 'trxLimit': '500000' },
    '5411': { 'trxLimit': '1000000' },
    '5422': { 'trxLimit': '1000000' },
    '5441': { 'trxLimit': '1000000' },
    '5451': { 'trxLimit': '1000000' },
    '5462': { 'trxLimit': '1000000' },
    '5499': { 'trxLimit': '500000' },
    '5531': { 'trxLimit': '5000000' },
    '5532': { 'trxLimit': '5000000' },
    '5533': { 'trxLimit': '5000000' },
    '5541': { 'trxLimit': '5000000' },
    '5611': { 'trxLimit': '2500000' },
    '5621': { 'trxLimit': '2500000' },
    '5631': { 'trxLimit': '2500000' },
    '5641': { 'trxLimit': '2500000' },
    '5651': { 'trxLimit': '2500000' },
    '5655': { 'trxLimit': '2500000' },
    '5661': { 'trxLimit': '2500000' },
    '5691': { 'trxLimit': '2500000' },
    '5699': { 'trxLimit': '500000' },
    '5712': { 'trxLimit': '10000000' },
    '5719': { 'trxLimit': '2500000' },
    '5722': { 'trxLimit': '5000000' },
    '5732': { 'trxLimit': '10000000' },
    '5812': { 'trxLimit': '1000000' },
    '5814': { 'trxLimit': '500000' },
    '5941': { 'trxLimit': '2500000' },
    '5942': { 'trxLimit': '500000' },
    '5943': { 'trxLimit': '5000000' },
    '5945': { 'trxLimit': '5000000' },
    '5946': { 'trxLimit': '5000000' },
    '5977': { 'trxLimit': '5000000' },
    '5995': { 'trxLimit': '1000000' },
    '7032': { 'trxLimit': '5000000' },
    '7832': { 'trxLimit': '500000' },
    '7833': { 'trxLimit': '500000' },
    '7933': { 'trxLimit': '1000000' },
    '7992': { 'trxLimit': '5000000' },
    '7997': { 'trxLimit': '5000000' },
    '8043': { 'trxLimit': '5000000' },
    '8044': { 'trxLimit': '5000000' },
    '8062': { 'trxLimit': '2500000' },
    '8071': { 'trxLimit': '2500000' },
    '8099': { 'trxLimit': '1000000' },
    '1234': { 'trxLimit': '1000000' }
  };
    
var qrisMerchantCategoryCode = qrisInformation['qrisMerchant']['mcc'];

if (qrisMerchantCategoryCode != null) {
    if (!blacklistHelper.isWhitelistedByNamespaceV2('merchant-category-codes', 'qris-bayarind', 'merchantCategoryCode', qrisMerchantCategoryCode)) {
        return "REJECT;Qris mcc is not whitelisted;QrisNotAllowed";
    }

    var dailyMerchantLimit = qrisInformation['qrisMerchant']['dailyMerchantLimit'];
    var cumulativeDailyTransactionAmount = qrisInformation['qrisMerchant']['cumulativeDailyTransactionAmount'];
    if (dailyMerchantLimit != null && cumulativeDailyTransactionAmount != null) {
        if ((cumulativeDailyTransactionAmount + transactionAmount) > dailyMerchantLimit) {
        return "REJECT;Cumulative daily transaction amount > daily merchant limit;QrisDailyMerchantLimit";
        }
    }

    var mccTransactionLimit = qrisLimitValidationMappingByMcc[qrisMerchantCategoryCode]["trxLimit"];
    if(mccTransactionLimit != null && transactionAmount > mccTransactionLimit) {
        return "REJECT;Transaction amount > mcc transaction limit;QrisMccTransactionLimit";
    }
}

if (stringUtils.contains(merchantName, 'EV7 SEVEN')) {
    return "BLOCK;EV 7 Merchant Blacklisted;BlacklistedSeller"
}

if ((masterUserId == null || masterUserId == '') && (userId != null || userId != '')) {
    masterUserId = userId;
}

if (blacklistHelper.isBlacklistedBulkCheck('users', 'account-takeover', { "userId": userId }, blacklistedResults)) {
    return 'BLOCK;Account Takeover Case';
}

if ((blacklistHelper.isWhitelistedBulkCheck('phones', 'employee', { "phoneNumber": userPhoneNumber }, whitelistedResults))||(userEmail.toLowerCase() == 'akoesnan@gmail.com')
||(userEmail.toLowerCase() == 'akirana17@yahoo.com')) {
return "NORMAL;Whitelisted Internal Employee;WhitelistedUser";
}

if (
    ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") || (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME"))
    && blacklistHelper.isWhitelistedBulkCheck('phones', 'special-person', { "phoneNumber": userPhoneNumber }, whitelistedResults)
    ) {
    return "NORMAL;Whitelisted Special Person;WhitelistedUser";
}

if (maxCurrentDpdFromAllCla > 3) {
    return 'BLOCK;User have current late outstanding in other CLA;BlacklistedUser';
}

if (
    blacklistHelper.isBlacklistedBulkCheck('phones', 'external-blacklists', { "phoneNumber": userPhoneNumber }, blacklistedResults) ||
    blacklistHelper.isBlacklistedBulkCheck('phones', 'external-blacklists', { "phoneNumber": buyerPhoneNumber }, blacklistedResults)
) {
    return "BLOCK;Phone Number Blacklisted on Namespace external-blacklists;BlacklistedUser";
}

if (
    blacklistHelper.isBlacklistedBulkCheck('phones', 'phones', { "phoneNumber": shippingPhoneNumber }, blacklistedResults) ||
    blacklistHelper.isBlacklistedBulkCheck('phones', 'phones', { "phoneNumber": billingPhoneNumber }, blacklistedResults)
) {
    return "BLOCK;Billing or Shipping Phone Number Blacklisted;BlacklistedUser";
}
  
  
/* BLACKLIST TRANSACTION LOCATION*/

var transaction_location = featureScoresByFeatureName['transaction_location'] == null ? '-999' : featureScoresByFeatureName['transaction_location']; 


var is_blacklisted_location = false;
var blacklist_result = '';
var blacklistReason = '';
var is_offline_transaction = false;
var is_offline_edc_transaction = false;
var is_offline_qr_transaction = false;
for (item_cat: itemCategories){
    if(item_cat.toLowerCase() == 'offline-store' || item_cat.toLowerCase() == 'offline-transaction' ||  item_cat.toLowerCase() == 'offline') {
        is_offline_transaction = true;
    }
    if(item_cat.toLowerCase() == 'offline-transaction') {
        is_offline_qr_transaction = true;
    }
    if(item_cat.toLowerCase() == 'offline') {
        is_offline_edc_transaction = true;
    }
}

if ((transaction_location != '') && (transaction_location != '-999') && (is_offline_transaction == false)){
	blacklist_result = blacklistedLocationHelper.validateLocation(transaction_location);
	is_blacklisted_location = (blacklist_result['isBlacklisted'] == null) ? false:blacklist_result['isBlacklisted'];
	blacklistReason = (blacklist_result['blacklistReason'] == null) ? '':blacklist_result['blacklistReason'];
	blacklistReasonDetail = (blacklist_result['blacklistReasonDetail'] == null) ? '':blacklist_result['blacklistReasonDetail'];

	if (is_blacklisted_location){
		 return "BLOCK;Blackisted Location:"+blacklistReasonDetail+";FraudLocation"; 
        
	}
}
  
var BLIBLI_JEWEL_WHITELIST = [
    "BUT-70113",	 /*Bunga Tanjung Official Store*/
    "J5O-70000",	 /*UMKM J5ISMOYO */
    "AYD-70035",	 /*Ayugold Official Store*/
    "BEJ-70108",	 /*Belva  Jewellery Official Store*/
    "ADJ-60024",	 /*Adelle Jewellery Official Store*/
    "JOP-70103",	 /*Jofeanshop*/
    "PRJ-70063",	 /*Princess Jewellery Store Official Store*/
    "LIO-18086",	 /*Lino & Sons Official Store*/
    "JUJ-70037",	 /*Juene Jewelry Official Store*/
    "THP-60025",	 /*The Palace Official Store*/
    "TOM-70074",	 /*Toko mas Bintang Mas Semarang*/
    "DIC-70184",	 /*Diamond & Co Official Store  */
    "MOM-70130",	 /*Model Manis*/
    "SUG-70052",	 /*Sunnies Gallery*/
    "DIP-70200",	 /*Diamond Pavilion*/
    "ISO-70036",	 /*Isago Official Store*/
    "PED-70092",	 /*PEONIA DIAMOND BY SWAN JEWEL*/
    "PAJ-70075",	 /*PASSION JEWELRY Official Store*/
    "POJ-60023",	 /*POSH JEWELLERY Official Store*/
    "BED-70148",	 /*Beliberlian.id*/
    "WAG-70052",   /*Wahyu Redjo Online Flagship Store*/
    "GAK-70125",   /*Gallery Kohinoor*/
    "SEA-70260",   /*Semar Nusantara Store*/
    "PTC-60041",   /*Frank & Co. Official Store*/
    "UBL-70002",   /*UBS LIFESTYLE Official Store*/
    "WHZ-46102"    /*Aurum Lab Official Store*/
];

var BLIBLI_INSTORE_WHITELIST = [
    'BLS-70244', 'OPS-70007', 'BLM-70056', 'TUT-70043', 
    'PTB-60157', 'FOS-48348', 'HEO-70120', 'WAI-60040', 
    'ITG-17865', 'APG-60025', 'OGA-60001', 'OKP-70027', 
    'DIJ-70054', 'INM-60022', 'INB-44886', 'BUO-60021', 
    'SIS-60086', 'RUO-60022', 'UFE-27255', 'KLS-60025', 
    'THP-60041', 'EFG-60021', 'WIS-70367', 'THC-60033', 
    'PEE-60023', 'CEY-60021', 'GRM-26882', 'BUN-60026', 
    'TOL-54940', 'FOS-48029', 'KIK-60029', 'SAT-70178', 
    'EFB-60021', 'RIF-60035', 'AVT-60023', 'EFP-60022', 
    'EFP-60021', 'DIJ-70054', 'GIF-70006', 'MAS-71597', 
    'TOS-60030', 'RET-52382', 'PTM-27399', 'EFT-60022', 
    'PTS-19405', 'CRJ-60025', 'DGS-50225', 'MAJ-60094', 
    'FES-70178', 'BEW-60023', 'DIP-60078', 'AKR-25610', 
    'SEO-60045', 'EFK-70004', 'HAS-60061', 'MEN-60027', 
    'TOO-60072', 'ATC-52167', 'EFB-60022', 'EFB-60023', 
    'SLC-60022', 'DIE-70178', 'SAG-70133', 'UFE-70014', 
    'SEP-50242', 'EFT-60021', 'MAH-60042', 'DAS-60076', 
    'DEP-70160', 'LII-60039', 'APG-60025', 'IPS-60023', 
    'FAB-60043', 'EFP-60023', 'GRS-60063', 'PTB-60157', 
    'AGJ-60028', 'SPM-60032', 'EFC-60021', 'PIR-70008', 
    'SMM-70006', 'EFS-60023', 'SLC-60021', 'HUS-70092', 
    'ABK-70034', 'FEM-70025', 'EFP-60028', 'DRE-60025', 
    'EFS-60022', 'THP-70139', 'THP-60042', 'BOP-70149', 
    'WEP-60024', 'WOE-70043', 'ENF-70007', 'DOO-17607', 
    'LIJ-70012', 'BOP-70116', 'SAJ-60042', 'SWJ-60022', 
    'EDP-60022', 'SAG-60030', 'ESP-70024', 'ENF-70006', 
    'DIJ-70054', 'HUE-70011', 'KIL-00097', 'BEP-60025', 
    'IDB-70003', 'EFE-70005', 'MAH-60054', 'SOC-48541', 
    'ODO-70013', 'BEJ-60039', 'INM-60041', 'OSG-70011', 
    'ZAP-60036', 'ITE-60024', 'SAC-70236', 'ESS-70030', 
    'EFS-70027', 'DIO-70110', 'EUS-70013', 'BBC-70015', 
    'BOC-70052', 'BBC-70025', 'EUG-70004', 'SWJ-60021', 
    'ITM-57386', 'PIR-70039', 'EFG-70011', 'ABK-70039', 
    'EFK-60021', 'BOM-70095', 'BOG-70073', 'EFS-60024', 
    'BIB-60037', 'HUE-70039', 'EFC-70006', 'ENF-70001', 
    'ENF-70031', 'BOT-70078', 'EFC-70007', 'ENF-70038', 
    'OSG-70023', 'ENF-70028', 'PIR-70021', 'ENF-70008', 
    'ABT-70056', 'TOO-70600', 'ENF-70003', 'EDN-60023', 
    'SWJ-60023', 'BOP-70148', 'ESG-70001', 'EUS-70014', 
    'BBC-70024', 'EUO-70003', 'SOC-60047', 'PIR-70041', 
    'SUG-70145', 'EUP-70003', 'EUM-70002', 'ENF-70002', 
    'ENF-70004', 'PIR-70026', 'ODO-70014', 'ROF-70041', 
    'EDB-60022', 'EDB-60021', 'EFS-70021', 'BUP-56471', 
    'ODO-70031', 'ESM-70008', 'SWJ-70006', 'ESS-70029', 
    'OSG-70026', 'SAD-70117', 'ODO-70010', 'SKE-70057', 
    'EFP-70001', 'BBC-70006', 'SKL-70023', 'BOL-70087', 
    'WI2-70023', 'EDE-60021', 'SKE-70064', 'HUE-70028', 
    'EFE-70003', 'EFE-70004', 'BEM-70363', 'EFE-70015', 
    'ENF-70005', 'LAU-53124', 'BOM-70098', 'EFB-60028', 
    'KAP-70259', 'BBC-70038', 'BOP-70151', 'BOS-60034', 
    'ODO-70023', 'BBC-70039', 'EUA-70014', 'PIR-70031', 
    'ABC-70090', 'OSG-70021', 'BBC-70013', 'SSS-70044', 
    'BBC-70022', 'MEE-70280', 'ENF-70036', 'DIS-70328', 
    'SKM-70015', 'OSG-70020', 'OSC-70010', 'BOP-70150', 
    'SKM-70016', 'OSG-70014', 'OSG-70025', 'ENF-70035', 
    'OSG-70000', 'OSG-70034', 'ODO-70012', 'ENF-70029', 
    'OSG-70035', 'EFS-60025', 'BOJ-70045', 'BBC-70035', 
    'EFB-60029', 'ORB-60025', 'WOP-70037', 'ORP-60025', 
    'ODO-70025', 'SKC-70019', 'OSG-70003', 'PIR-70036', 
    'SKG-70019', 'BOI-70015', 'PIR-70042', 'BBC-70056', 
    'SKP-70023', 'SKC-70017', 'BBC-70036', 'SKG-70012', 
    'ALA-49689', 'OSG-70013', 'ODO-70016', 'ODO-70022', 
    'EFS-70007', 'ODO-70027', 'OSG-70005', 'EFM-60021', 
    'EFS-70006', 'ODO-70024', 'OSG-70010', 'SKS-70045', 
    'NES-60031', 'BBC-70059', 'ODO-70019', 'ENF-70034', 
    'EFM-70005', 'EFK-70001', 'ORP-60030', 'BBC-70014', 
    'APL-60021', 'SKA-70040', 'BBC-70021', 'SKP-70040', 
    'BBC-70053', 'OSG-70004', 'OSG-70012', 'SKC-70039', 
    'ODO-70029', 'FLD-70052', 'SKC-70020', 'PIR-70023', 
    'EUP-70004', 'EFG-70009', 'BOP-70078', 'BBC-70066', 
    'BBC-70017', 'EFG-70012', 'SKL-70036', 'SKB-70020', 
    'SKL-70033', 'OSG-70016', 'SKL-70025', 'OSG-70027', 
    'ENF-70040', 'BBC-70011', 'SKB-70026', 'PIR-70046', 
    'SKB-70042', 'SKL-70029', 'PIR-70045', 'FIS-70329', 
    'ESP-70023', 'ODO-70026', 'EUS-70012', 'OSG-70006', 
    'BBC-70063', 'FOS-70057', 'MOO-70188', 'BBC-70051', 
    'SKA-70039', 'OSG-70031', 'SKG-70016', 'ODO-70015', 
    'ODO-70028', 'OSG-70015', 'OSG-70001', 'STA-70123', 
    'BBC-70064', 'UWK-70000', 'FON-60022', 'BOC-70120', 
    'MEB-60064', 'BBC-70065', 'OGA-60001', 'OSG-70032', 
    'SKK-70020', 'ODO-70017', 'ZAC-70148', 'OSG-70024', 
    'SKW-70003', 'BBC-70009', 'SKK-70009', 'OSG-70007', 
    'ODO-70033', 'EFB-70006', 'BBC-70061', 'BBC-70020', 
    'PIR-70043', 'BBC-70054', 'OKP-70027', 'EFE-70016', 
    'ORG-70024', 'ORA-70049', 'BBC-70010', 'ZEO-70067', 
    'BOS-70168', 'SKK-70021', 'EUA-70013', 'EUA-70019', 
    'ORE-70042', 'ODO-70008', 'HEO-70120', 'EUA-70015', 
    'EUA-70020', 'EVD-70033', 'ORK-70015', 'SKA-70031', 
    'ODO-70032', 'SKM-70031', 'BBC-70070', 'SKA-70045', 
    'OSG-70029', 'BBC-70062', 'ZAJ-70017', 'ENF-70037', 
    'BOB-70103', 'ORK-60025', 'WAI-70107', 'ODO-70009', 
    'ORK-60030', 'ORA-70051', 'SKC-70034', 'ZAJ-70020', 
    'ODO-70020', 'ORM-60026', 'ORM-60027', 'ORP-60026', 
    'SKC-70049', 'EUB-70002', 'BBC-70072', 'BOD-70084', 
    'BOT-70080', 'TOW-70150', 'BBC-70055', 'BBC-70067', 
    'BLS-70244', 'GDS-70008', 'ODO-70021', 'SOO-60042', 
    'AFC-70071', 'APH-70195', 'BOC-70122', 'DRO-70055', 
    'EUL-70001', 'INO-70176', 'ORL-70028', 'OSG-70033', 
    'INB-44886', 'SKC-70058', 'ENB-70036', 'ENB-70037', 
    'ORK-70017', 'SKT-70031', 'BBC-70085', 'BBC-70086', 
    'BBC-70089', 'EFC-70008', 'EN1-70004', 'EN1-70005', 
    'EN1-70006', 'EN1-70007', 'EN1-70008', 'EN1-70011', 
    'EN1-70014', 'EN1-70016', 'EN1-70018', 'OGA-60001', 
    'ENF-70043', 'EUC-70005', 'EUM-70005', 'HAC-70330', 
    'NAS-70985', 'ORP-70074', 'ORT-70035', 'SLM-70003', 
    'TAD-70085', 'UWM-70013', 'WAS-70513', 'BBC-70095', 
    'BBC-70096', 'BBC-70098', 'EFE-60026', 'EUA-70021', 
    'ORP-70072', 'MOO-70159', 'DJK-52657', 'TOA-60077'
];

var BLIBLI_GOOD_INSTORE_LIST = [
    'blibli store official store',
    'blibli elektronik flagship store',
    'tukar tambah official store',
    'pt bijaksana komunikasi jakarta',
    'blibli monobrand official store',
    'oppostore',
    'tukar tambah akun lama',
    'hello official store',
    'blibli store instore',
    'ocean cellular',
    'aha store o2o',
    'it galeri #1 official store',
    'okeshop instore',
    'sinar abadi elektronik kotabumi'
];

var FRAUD_ITEM_NAMES = [
    ' ovo ',
    'apa saja',
    'chip domino',
    'chip domino',
    'chip hig',
    'chip kuning',
    'chip md',
    'chip zaza',
    'domino higgs',
    'domino island',
    'domino md',
    'e voucher',
    'go pay',
    'gopay',
    'higgs domino',
    'higgs',
    'higs',
    'indodax',
    'isi saldo',
    'isi-saldo',
    'island md',
    'jasa kirim',
    'koin c',
    'logam mulia',
    'mahar unik',
    'md 1b',
    'top ap',
    'topap',
    'topup saldo',
    'usdt',
    'bisa top instan',
    'bisa-top instan'
];

var FRAUD_ITEM_NAMES_ADD_CHECK = [
    'paket data',
    'voucher'
];

var ALFAMART_LIST = [
    'ALFAMART',
    'Alfamart - Reguler',
    'Alfamart - Franchise',
    'ALFAMIDI - REGULER',
    'ALFAMIDI - FRANCHISE'
];

var IPHONE_WHITELIST_ITEMS = [
    'iphone',
    'ios',
    'apple'
];

var IPHONE_WHITELIST_STORES = [
    'Hello plus',
    'Hello +'
];

var OFFLINE_WHITELIST_ITEMS = [ /*this list includes samsung for these editions only: OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS*/
    'find n2 flip',
    'find n3 flip',
    'vivo x80',
    'find x5'
];

var OFFLINE_WHITELIST_ITEMS_APPLE_EDITIONS = [
    'iphone 15',
    'iphone 16',
    'iphone 17',
    'iphone 18',
    'ip 15',
    'ip 16',
    'ip 17',
    'ip 18',  
    'iphone15',
    'iphone16',
    'iphone17',
    'iphone18',
    'apple 15',
    'apple 16',
    'apple 17',
    'apple 18',
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

var FSP_STORES = [
    'pt fokus solusi proteksi',
    'fsp - insurance broker',
    'cermati protect'
];

var PRJ_STORES = [
    /*JAKARTA FAIR KEMAYORAN 2025*/
    '9to9 002 - exhibition jakarta fair kemayoran 2025',
    'advance 334 exhibition jakarta fair kemayoran 2025',
    'agres.id - agres.id & fone x intel exhibition jakarta fair kemayoran 2025',
    'agres.id - agres.id exhibition jakarta fair kemayoran 2025',
    'agres.id - agres.id gamer.id x amd exhibition jakarta fair kemayoran 2025',
    'belmont mattress 002 - belmont intertama perkasa exhibition jakarta fair kemayoran 2025',
    'best price elektronik indonesia 005 - bosh & beco exhibition jakarta fair kemayoran 2025',
    'best price elektronik indonesia 006 - shark ninja exhibition jakarta fair kemayoran 2025',
    'best price elektronik indonesia 007 - beko exhibition jakarta fair kemayoran 2025',
    'best price elektronik indonesia 008 - bosch exhibition jakarta fair kemayoran 2025',
    'best price elektronik indonesia 009 - hitachi exhibition jakarta fair kemayoran 2025',
    'buccheri 140 - exhibition jakarta fair kemayoran 2025',
    'delapan lapan sejahtera 002 - tailg exhibition jakarta fair kemayoran 2025',
    'delapan lapan sejahtera 003 - tailg motor listrik exhibition jakarta fair kemayoran 2025',
    'dimarco mitra utama 20 - exhibition jakarta fair kemayoran 2025',
    'dinamika indonusa prima 014 - airland exhibition jakarta fair kemayoran 2025',
    'ear 1201 - erafone exhibition jakarta fair kemayoran 2025',
    'electronic city 87 - exhibition jakarta fair kemayoran 2025',
    'gabino 80 - exhibition jakarta fair kemayoran 2025',
    'gan 25 - hello exhibition jakarta fair kemayoran 2025',
    'gio furniture 011 - alga exhibition jakarta fair kemayoran 2025',
    'gio furniture 012 - m flow & gadie exhibition jakarta fair kemayoran 2025',
    'gramedia 372 harapan indah',
    'gtn 284 - blibli exhibition jakarta fair kemayoran 2025',
    'gtn 289 - samsung blibli exhibition jakarta fair kemayoran 2025',
    'harmoni abadi mandiri 009 - dunlopillo exhibition jakarta fair kemayoran 2025',
    'ibox 197 - ibox exhibition jakarta fair kemayoran 2025',
    'indobuana auto raya e-motor 002 - exhibition jakarta fair kemayoran 2025',
    'inlife 05 - exhibition jakarta fair kemayoran 2025',
    'intex 24 - exhibition jakarta fair kemayoran 2025',
    'jmg international 057 - exhibition jakarta fair kemayoran 2025',
    'kiki motor persada 001 - volta motor listrik exhibition jakarta fair kemayoran 2025',
    'lady americana mattress 012 - cemerlang abadi mulya elite americana exhibition jakarta fair kemayoran 2025',
    'lady americana mattress 013 - cemerlang abadi mulya lady americana exhibition jakarta fair kemayoran 2025',
    'league 16 - gpn 1',
    'league 17 - gpn 3',
    'league 18 - hall b extention',
    'league 19 - hall c',
    'league 20 - hall a',
    'league 21 - pasar gambir barat patung budha',
    'league 21 - pasar gambir tower barat',
    'league 22 - hall b selasar',
    'league 23 - hall d dalam',
    'league 24 - hall open space',
    'league 25 - prj d luar',
    'league 26 - gpn 3 consignment',
    'lingkaran dua lestari 003 - ofero motor listrik exhibition jakarta fair kemayoran 2025',
    'lingkaran dua lestari 004 - ofero sepeda listrik exhibition jakarta fair kemayoran 2025',
    'logo 011 - gambir expo',
    'maka motor niaga 002 - exhibition jakarta fair kemayoran 2025',
    'master media 03 - exhibition jakarta fair kemayoran 2025',
    'matahari 185 - jakarta fair kemayoran',
    'mii urban republic 071 - urban republic exhibition jakarta fair kemayoran 2025',
    'nasa 177 - samsung exhibition jakarta fair kemayoran 2025',
    'neohaus 06 - neohaus exhibition jakarta fair kemayoran 2025',
    'optik melawai 378 - exhibition jakarta fair kemayoran 2025',
    'oriskin 81 - exhibition prj 2025',
    'oxxo sentral tekindo motor listrik 003 - yadea exhibition jakarta fair kemayoran 2025',
    'oxxo sentral tekindo sepeda listrik 002 - yadea exhibition jakarta fair kemayoran 2025',
    'pacific indah pratama 008 - exhibition jakarta fair kemayoran 2025',
    'perfect health 36 - exhibition jakarta fair kemayoran 2025',
    'pimbi corp indonesia 001 - nuv sepeda listrik exhibition jakarta fair kemayoran 2025',
    'polytron elektronik 05 - sarana kencana mulya exhibition jakarta fair kemayoran 2025',
    'polytron motor listrik 003 - sarana kencana mulya exhibition jakarta fair kemayoran 2025',
    'roda maju bahagia 005 - element exhibition jakarta fair kemayoran 2025',
    'romance grosir 018 - exhibition jakarta fair kemayoran 2025',
    'rovos 06 - exhibition jakarta fair kemayoran 2025',
    'saturdays 65 - exhibition jakarta fair kemayoran 2025',
    'scandia 025 - exhibition jakarta fair kemayoran 2025',
    'sentral komputer 019 - sentral komputer exhibition jakarta fair kemayoran 2025',
    'skin+ 68 exhibition jakarta lebaran fair 2025',
    'sleep center mkp 26 - massindo karya prima comforta exhibition jakarta fair kemayoran 2025',
    'sleep center mkp 27 - massindo karya prima therapedic exhibition jakarta fair kemayoran 2025',
    'sleep center mkp 28 - massindo karya prima spring air exhibition jakarta fair kemayoran 2025',
    'sunra retail indonesia 002 - sepeda listrik exhibition jakarta fair kemayoran 2025',
    'sunra retail indonesia 003 - motor listrik exhibition jakarta fair kemayoran 2025',
    'tokuyo 32 - exhibition jakarta fair kemayoran 2025',
    'ufo 35 - ufo exhibition jakarta fair kemayoran 2025',
    'ufo 36 - ufo tcl exhibition jakarta fair kemayoran 2025',
    'usaha lancar mandiri 005 - aqua exhibition jakarta fair kemayoran 2025',
    'usaha lancar mandiri 006 - sharp auvi exhibition jakarta fair kemayoran 2025',
    'usaha lancar mandiri 007 - lg exhibition jakarta fair kemayoran 2025',
    'vapebay 02 - tri distrindo abadi exhibition jakarta fair kemayoran 2025',
    'vivo store 43 - exhibition jakarta fair kemayoran 2025',
    'xiaohei teknologi indonesia 002 - saige motor listrik exhibition jakarta fair kemayoran 2025',
    'xiaohei teknologi indonesia sepeda listrik 001 - saige exhibition jakarta fair kemayoran 2025',
    'kawan lama azko 261 pameran mag a962',
    'ear 1202 - erafone x telkomsel exhibition jakarta fair kemayoran 2025',
    'eiger - jfk',
    'best price elektronik indonesia 010 - tefal exhibition jakarta fair kemayoran 2025',
    'perkasa makmur sejahtera 02 - florence exhibition jakarta fair kemayoran 2025',
    'perkasa makmur sejahtera 03 - olympic bed exhibition jakarta fair kemayoran 2025',
    'sumber digital media 01 - tanaka roomi exhibition jakarta fair kemayoran 2025',
    'duta abadi permata 01 - serta exhibition jakarta fair kemayoran 2025',
    'duta abadi permata 02 - tempur exhibition jakarta fair kemayoran 2025',
    'duta abadi permata 03 - ogawa exhibition jakarta fair kemayoran 2025'
];

/*Cant Support using merchantId due to initialMerchantId is not available, therefore still using by name */
var OFFLINE_DEKORUMA_STORES = [
    'project dekoruma'
    ];

var PRJ_DUMMY_LIST = [
    'dummy exhibition jakarta fair kemayoran 2024 admin 1%',
    'dummy exhibition jakarta fair kemayoran 2024 admin 190k',
    'dummy sharp official store',
    'DUMMY SHARP OFFICIAL STORE',
    'DUMMY SHARP OFFICIAL STORE - SHARP EXHIBITION PET EXPO ICE BSD',
    'dummy sharp official store - sharp exhibition pet expo ice bsd',
    'dummy exhibition jakarta lebaran fair 2025'
];

var MEDAN_FRAUD_APPLICATION = [
    'buccheri 110 - medan fair',
    'buccheri 28 - medan mall',
    'gabino 26 - gabino medan fair',
    'gabino 27 - gabino medan mall'
];

var OTHERS_FRAUD_APPLICATION = [
    'optimum',
    'sriwijaya selular 03 - palembang square'
];

var OFFLINE_RESTRICTED_ITEM = [
    'motor listrik'
];

var SBC_RESTRICTED_ITEM = [
    'alat makan & wadah makanan',
    'kompor',
    'dapur',
    'masak',
    'makan',
    'peralatan',
    'rice cooker'
];

var MEDAN_FRAUD_TRX = [
    'ERASPACE',
    'GABINO 26 - GABINO MEDAN FAIR',
    'GABINO 27 - GABINO MEDAN MALL',
    'MATAHARI 553 - MEDAN THAMRIN',
    'MATAHARI 645 - MEDAN MALL',
    'BUCCHERI 110 - MEDAN FAIR',
    'BUCCHERI 28 - MEDAN MALL'
];

var EBIKE_FRAUD_APPLICATION = [
    'auto ev 01 - auto ev rengasdengklok',
    'kelly bike'
];

var EBIKE_FRAUD_TRX = [
    'auto ev 01 - auto ev rengasdengklok',
    'kelly bike'
];

var MERCHANT_NON_GADGET = [
    'ERABLUE 43 - ERABLUE ELECTRONICS BOJONG GEDE',
    'EAR 622 - ERAFONE BOJONG GEDE',
    'BOJONG GEDE',
    'ERABLUE 10 - ERABLUE ELECTRONICS JATIMULYA',
    'ERABLUE 63 - ERABLUE ELECTRONICS TELUK JAMBE',
    'ERABLUE 64 - ERABLUE ELECTRONICS TAJUR',
    'ERABLUE 73 - ERABLUE ELECTRONICS RAYA HANKAM'
];

var FRAUD_AGENT_LIST = [
    /*dup imei + fake handover*/
    '85b251b4-83b8-4f79-ad9c-d81a2c8a9357', /*septi puspitasari*/

    /*dup imei dc/andrean*/
    'd9f6d810-ec09-4b2f-85f6-4b9d1037f212', /*choirun nisa*/
    '50f23cdd-f4ef-4ce7-9d1c-9e4b85425fdd', /*dista ayu manjari*/

    /*fraud cempakamas*/
    '01230c90-a293-4987-9a33-ee1c351bc12a', /*arifin ilham*/
    '07d4f22c-cdf7-4db8-929b-f66f79ae197e', /*andeas sharul saputra zendrato*/
    '5fff6d0c-351b-4f06-973a-40b4fb8334e9', /*melisa pratiwi*/
    'd3db1cc1-40a8-4870-a4b9-6ef248bb6513', /*afni duskin halawa*/

    /*fraud bekasi*/
    '728183af-0be3-44eb-8403-37c7603f7c11', /*fariz bukhori*/
    '4923b6ff-cab9-4e89-b12c-7f53338cc740', /*devi oktavani*/
    '34ad00ea-c463-41c3-b7b8-fdedff86fb15', /*angga dermawan*/

    /*fraud bogor*/
    '877d05b4-0a0b-4802-b852-0d0c6e12ff82', /*muhamad rifqi ibrahim*/
    '6341efff-748d-444a-8d07-ff16dca2c490', /*siti aisah*/
    'a8580d35-2225-4865-ac34-175832d4a9f8', /*nadya permata putri budiyanto*/
    '97c2c64c-e32b-42e5-9d03-e3ad0b65d8d3', /*asri maulandari*/
    '1feff263-f645-4e0e-a8cf-9bdc55002f28', /*arham maulana r*/
    'ddef862e-f0e4-4d03-8cab-582e11982572', /*maradira suryawan*/
    '6d328da7-0e45-4d0d-8e72-1407fdb5069b',  /*setio nugraha*/

    /*fraud ITC Ambassador & Kuningan City*/
    'fafca8f7-498d-4a42-a30b-95b4d136e153', /*savira azahra*/
    '03b266ad-fda9-4091-8ba3-f4978c12555b', /*dita anggraeni*/

    /*fraud ITC Cempaka Mas*/
    '536efc46-d176-4495-b249-fbe334dc76b5', /*davia balqis*/

    /*fraud Karawang*/
    '00593716-cd6e-4386-b9a1-6a09b9ce048b', /*ayu livia rizkiana syahifa*/
    '3b1810eb-f2f1-4283-baec-f00f2c167bd8', /*sudir sutisna*/
    'af8599f6-20b0-4f5c-8966-c49e48750678', /*anggi yusup junaedi*/
    '69079e89-f1a2-4214-b76a-bc8ce0440486', /*wahyu aripin*/

    /*fraud login to customer account*/
    '1fc0552a-d91b-4e66-9688-c47b45206681', /*asep saepul*/
    'a1ec8f0d-1b9d-4704-a5db-16af5ac482bf'  /*husen*/

];  

var XENDIT_WHITELIST_STORES = [
    'jagofon pte ltd',
    'xl prioritas',
    'xl axiata (myxl apps - produk prepaid)',
    'xl prioritas (myxl apps - produk postpaid)',
    'xl home / xl satu (myxl apps - produk xl home / xl satu)',
    'live validation test t4',
    'refocus',
    'dbklik',

    /*updated by irvin*/
    'pt cipta medika informasi',

    'xl prepaid',
    'xl prioritas', 
    'xl home', 

    'axis',
    'bodypack',
    'fithub',
    'renos',
    'urban icon',
    'fossil',
    'nav',
    'gym zone',
    '910',
    'tomoro',
    'lovise sofa',
    'tiptip',
    'fjallraven',
    'keen',
    'outside',
    'bbo',
    'kelas.work',
    'lg',
    'fitnesswork',
    'urban atheletes',
    'josephjoseph',
    'bizgital',
    'addtix',
    'add tix',
    'habitat',
    'glooeye',
    'plaza it'
];

var XENDIT_WHITELIST_STORES_2 = [
    'xl'
];

var QR_MERCHANT_ONE_MIO = [
    'artha jaya supermarket bangunan',
    'vapebay',
    'luxe ignite watch',
    'buana lestari sentosa'
];

var QR_MERCHANT_TWO_MIO = [
    'sony center',
    'sukses kolaborasi surabaya',
    'sukses kolaborasi jogja',
    'sukses kolaborasi bali',
    'doss makassar',
    'doss camera & gadget',
    'vanilla convenient store',
    'rumah mahardika karsya',
    'alaska mandiri cemerlang',
    'lestari maju perkasa',
    'mii urban republic',
    'cellular world',
    'celullar world',
    'indo group',
    'cahaya rumah furniture',
    'doran gadget',
    'dunia bangunan bsd',
    'suriatama mahkota kencana',
    'ciputat jaya furniture',
    'acc ideal supermarket bahan bangunan',
    'pinangsia jaya mandiri',
    'zuko shop',
    'domo oto care',
    'u2 care service mataram',
    'toko bangunan artha jaya express',
    'digital life',
    'victory baby',
    'graha musika solagratia',
    'autocars audio variasi',
    'dewa motor indonesia',
    'global elektronik mitaprana'
];

var QR_MERCHANT_FIVE_MIO = [
    'seven stereo'
];

var MANDATORY_HANDOVER_MERCHANT = [
    'oriskin 21 - point square medan',
    'oriskin 28 - juanda medan'
];
 
var good_merchant_online = [
    'NICEPAY - ZALORA',
    'BELANJA DI ZALORA',
    'BELANJA DI AGODA',
    'BELANJA DI TRAVELOKA',
    'BELANJA DI TRIP.COM',
    'CITILINK',
    'FASPAY - LOKET.COM',
    'LOKET.COM',
    'GARUDA INDONESIA',
    'KLIK INDOMARET',
    'SOCIOLLA ONLINE',
    'RUPARUPA',
    'ALFAGIFT'
];

var high_risk_items = [
    'AN-1000028,HA-1000067,HA-1000066','HA-1000066,AN-1000028,HA-1000067','HA-1000066,HA-1000068,HA-1000067','IP-1000003,HA-1000067,HA-1000066','IP-1000003,HA-1000066,HA-1000067', //handphone
    'ELE-', //pln
    'KO-1000057', //computer
    'BL-1000030', //groceries
    'TA-1000052,HA-1000066', 'HA-1000066,TA-1000052', //tablet
    'PHO-', //pulsa
    'KA-1000114,KA-1000113,KA-1000120','KA-1000114,KA-1000113,KA-1000119','KA-1000115,KA-1000113,AC-1000043','LE-1000031,KA-1000113,LE-1000032', //camera
    'TEL-10000', //telkom
    'WAT-100001', //pdam
    'BPJ-', //bpjs
    'PBB-', //pbb
    'HO-1000023,FU-1000019,BE-1000052', //bed
    'DAT-100001', 'TEL-100003' //kuota
];

var sanitizedItemNames = itemNames.replaceAll("_", " ");
var lowerCaseItemNames = sanitizedItemNames.toLowerCase();

var decision = '';

var creditLimitMaxDpd = creditLimitMaxDpd == null ? -99 : creditLimitMaxDpd;
var creditLimitAccountMaxDpd = creditLimitAccountMaxDpd == null ? -99 : creditLimitAccountMaxDpd;
var userRescoringScore = userRescoringScore == null ? -99 : userRescoringScore;

/* scoringFeature */
/* numeric */
var blibli_score = scoringFeature['blibli_score'] == null ? -99 : scoringFeature['blibli_score'];
var tiket_score = scoringFeature['tiket_score'] == null ? -99 : scoringFeature['tiket_score'];
var izi_max_multi_inquiries_14d = scoringFeature['izi_max_multi_inquiries_14d'] == null ? -99 : scoringFeature['izi_max_multi_inquiries_14d'];
var avg_amount_disbursed_total = scoringFeature['avg_amount_disbursed_total'] == null ? -99 : scoringFeature['avg_amount_disbursed_total'];
var average_age_of_relationship = scoringFeature['average_age_of_relationship'] == null ? -99 : scoringFeature['average_age_of_relationship'];
var discounted_sum_outstanding_late_1y = scoringFeature['discounted_sum_outstanding_late_1y'] == null ? -99 : scoringFeature['discounted_sum_outstanding_late_1y'];
var app_list_score_pefindo_flag = scoringFeature['app_list_score_pefindo_flag'] == null ? -99 : scoringFeature['app_list_score_pefindo_flag'];
var percentage_latest_dpd_15_1y = scoringFeature['percentage_latest_dpd_15_1y'] == null ? -99 : scoringFeature['percentage_latest_dpd_15_1y'];
var percentage_max_dpd_15_1y = scoringFeature['percentage_max_dpd_15_1y'] == null ? -99 : scoringFeature['percentage_max_dpd_15_1y'];
var percentage_latest_active_dpd_3 = scoringFeature['percentage_latest_active_dpd_3'] == null ? -99 : scoringFeature['percentage_latest_active_dpd_3'];
var count_written_off_unique_creditor_2y = scoringFeature['count_written_off_unique_creditor_2y'] == null ? -99 : scoringFeature['count_written_off_unique_creditor_2y'];
var count_written_off_unique_creditor = scoringFeature['count_written_off_unique_creditor'] == null ? -99 : scoringFeature['count_written_off_unique_creditor'];
var percentage_latest_active_dpd_30 = scoringFeature['percentage_latest_active_dpd_30'] == null ? -99 : scoringFeature['percentage_latest_active_dpd_30'];
var pefindo_discounted_sum_outstanding_late = scoringFeature['pefindo_discounted_sum_outstanding_late'] == null ? -99 : scoringFeature['pefindo_discounted_sum_outstanding_late'];
var count_outstanding_amount_active_cc = scoringFeature['count_outstanding_amount_active_cc'] == null ? -99 : scoringFeature['count_outstanding_amount_active_cc'];
var max_limit_active_cc = scoringFeature['max_limit_active_cc'] == null ? -99 : scoringFeature['max_limit_active_cc'];
var sum_limit_active_cc = scoringFeature['sum_limit_active_cc'] == null ? -99 : scoringFeature['sum_limit_active_cc'];
var sum_paylater_settled_1y = scoringFeature['sum_paylater_settled_1y'] == null ? -99 : scoringFeature['sum_paylater_settled_1y'];
var sum_paylater_disbursed_1y = scoringFeature['sum_paylater_disbursed_1y'] == null ? -99 : scoringFeature['sum_paylater_disbursed_1y'];
var days_from_active_credit_card_disbursement_date = scoringFeature['days_from_active_credit_card_disbursement_date'] == null ? -99 : scoringFeature['days_from_active_credit_card_disbursement_date'];
var percentage_outstanding_credit_card_active = scoringFeature['percentage_outstanding_credit_card_active'] == null ? -99 : scoringFeature['percentage_outstanding_credit_card_active'];
var number_of_installed_loan_apps_within_14days = scoringFeature['number_of_installed_loan_apps_within_14days'] == null ? -99 : scoringFeature['number_of_installed_loan_apps_within_14days'];
var email_age_ever_name_match = scoringFeature['email_age_ever_name_match'] == null ? -999 : scoringFeature['email_age_ever_name_match'];
var phone_age_ever_name_match = scoringFeature['phone_age_ever_name_match'] == null ? -999 : scoringFeature['phone_age_ever_name_match'];
var hibp_name_match = scoringFeature['hibp_name_match'] == null ? -999 : scoringFeature['hibp_name_match'];
var tiket_account_age_days = scoringFeature['tiket_account_age_days'] == null ? -99 : scoringFeature['tiket_account_age_days'];
var number_of_related_previous_order_id = scoringFeature['number_of_related_previous_order_id'] == null ? -99 : scoringFeature['number_of_related_previous_order_id'];
var max_partner_score = scoringFeature['max_partner_score'] == null ? -99 : scoringFeature['max_partner_score'];
var offline_transaction_applied_amount = scoringFeature['offline_transaction_applied_amount'] == null ? -9999 : scoringFeature['offline_transaction_applied_amount'];
var is_tokopedia = scoringFeature['is_tokopedia'] == null ? '-99' : scoringFeature['is_tokopedia'];
var tiket_account_age = scoringFeature['tiket_account_age'] == null ? -99 : scoringFeature['tiket_account_age'];
var tiket_account_age_max = scoringFeature['tiket_account_age_max'] == null ? -99 : scoringFeature['tiket_account_age_max'];
var tiket_account_age_days_max = scoringFeature['tiket_account_age_days_max'] == null ? -99 : scoringFeature['tiket_account_age_days_max'];
var tiket_days_before_1st_trx = scoringFeature['tiket_days_before_1st_trx'] == null ? -99 : scoringFeature['tiket_days_before_1st_trx'];
var tiket_sum_order_amount_paid_max = scoringFeature['tiket_sum_order_amount_paid_max'] == null ? -99 : scoringFeature['tiket_sum_order_amount_paid_max'];


/* string */
var current_company_name = scoringFeature['current_company_name'] == null ? '-99' : scoringFeature['current_company_name'];
var initial_store_name = scoringFeature['store_name'] == null ? '-99' : scoringFeature['store_name'];
var offline_store_category = scoringFeature['offline_store_category'] == null ? '-99' : scoringFeature['offline_store_category'];
var verified_izi_mobile_phone_whatsapp = scoringFeature['verified_izi_mobile_phone_whatsapp'] == null ? '-999' : scoringFeature['verified_izi_mobile_phone_whatsapp'];
var match_ewallet_name_logic = scoringFeature['match_ewallet_name_logic'] == null ? '-999' : scoringFeature['match_ewallet_name_logic'];
var izi_mobile_phone_number_ages = scoringFeature['izi_mobile_phone_number_ages'] == null ? '-999' : scoringFeature['izi_mobile_phone_number_ages'];
var offline_item_names = scoringFeature['offline_item_names'] == null ? '-99' : scoringFeature['offline_item_names'];
var offline_item_category = scoringFeature['offline_item_category'] == null ? '-99' : scoringFeature['offline_item_category'];
var phone_model_class = scoringFeature['phone_model_class'] == null ? '-99' : scoringFeature['phone_model_class'];
var offline_sub_item_category = scoringFeature['offline_sub_item_category'] == null ? '-99' : scoringFeature['offline_sub_item_category'];
var address_is_current_address = scoringFeature['address_is_current_address'] == null ? '-99' : scoringFeature['address_is_current_address'];
var applicant_current_residence_city = scoringFeature['applicant_current_residence_city'] == null ? '-99' : scoringFeature['applicant_current_residence_city'];
var applicant_residence_city = scoringFeature['applicant_residence_city'] == null ? '-99' : scoringFeature['applicant_residence_city'];
var product_type = scoringFeature['product_type'] == null ? '-99' : scoringFeature['product_type'];
var partner = scoringFeature['partner'] == null ? '-99' : scoringFeature['partner'];

/* featureScoresByFeatureName */
var count_submit_app_within_4_hours_distinct = featureScoresByFeatureName['count_submit_app_within_4_hours_distinct'] == null ? -99 : featureScoresByFeatureName['count_submit_app_within_4_hours_distinct'];
var day_latest_to_earliest_payment_date_last3y_before_trx = featureScoresByFeatureName['day_latest_to_earliest_payment_date_last3y_before_trx'] == null ? -99 : featureScoresByFeatureName['day_latest_to_earliest_payment_date_last3y_before_trx'];
var count_unique_month_paid_before_trx = featureScoresByFeatureName['count_unique_month_paid_before_trx'] == null ? -99 : featureScoresByFeatureName['count_unique_month_paid_before_trx'];
var max_diff_transaction_creation_to_submit = featureScoresByFeatureName['max_diff_transaction_creation_to_submit'] == null ? -99 : featureScoresByFeatureName['max_diff_transaction_creation_to_submit'];
var count_approved_cash_loan = featureScoresByFeatureName['count_approved_cash_loan'] == null ? -99 : featureScoresByFeatureName['count_approved_cash_loan'];
var count_finished_cash_loan = featureScoresByFeatureName['count_finished_cash_loan'] == null ? -99 : featureScoresByFeatureName['count_finished_cash_loan'];
var item_group_risk = featureScoresByFeatureName['item_group_risk'] == null ? '-99' : featureScoresByFeatureName['item_group_risk'];
var count_round_item_price = featureScoresByFeatureName['count_round_item_price'] == null ? -99 : featureScoresByFeatureName['count_round_item_price'];
var shipping_purchase_ratio = featureScoresByFeatureName['shipping_purchase_ratio'] == null ? -99 : featureScoresByFeatureName['shipping_purchase_ratio'];
var count_submit_cash_loan_application_30_days = featureScoresByFeatureName['count_submit_cash_loan_application_30_days'] == null ? -99 : featureScoresByFeatureName['count_submit_cash_loan_application_30_days'];
var count_low_risk_facematch_score_1d = featureScoresByFeatureName['count_low_risk_facematch_score_1d'] == null ? -99 : featureScoresByFeatureName['count_low_risk_facematch_score_1d'];
var count_reject_abusedet_last_30d = featureScoresByFeatureName['count_reject_abusedet_last_30d'] == null ? -9999 : featureScoresByFeatureName['count_reject_abusedet_last_30d'];
var sum_pulsa_trx_3h = featureScoresByFeatureName['sum_pulsa_trx_3h'] == null ? -99 : featureScoresByFeatureName['sum_pulsa_trx_3h'];
var sum_pln_trx_3h = featureScoresByFeatureName['sum_pln_trx_3h'] == null ? -99 : featureScoresByFeatureName['sum_pln_trx_3h'];
var sum_pln_trx_6h = featureScoresByFeatureName['sum_pln_trx_6h'] == null ? -99 : featureScoresByFeatureName['sum_pln_trx_6h'];
var days_since_last_trx = featureScoresByFeatureName['days_since_last_trx'] == null ? -99 : featureScoresByFeatureName['days_since_last_trx'];
var count_installed_fraud_app_90d = featureScoresByFeatureName['count_installed_fraud_app_90d'] == null ? -99 : featureScoresByFeatureName['count_installed_fraud_app_90d'];
var count_reject_cash_after_cli_submit_last_60d = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d'];
var count_reject_cash_after_cli_submit_last_60d_excl_btpl_cash = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_cash'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_cash'];
var count_reject_cash_after_cli_submit_last_30d_excl_btpl_cash = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_cash'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_cash'];
var count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup'];
var count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup = featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup'] == null ? -99 : featureScoresByFeatureName['count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup'];
var count_handphone_purchase_blibli = featureScoresByFeatureName['count_handphone_purchase_blibli'] == null ? -99 : featureScoresByFeatureName['count_handphone_purchase_blibli'];
var is_va_same_phone_number = featureScoresByFeatureName['is_va_same_phone_number'] == null ? -99 : featureScoresByFeatureName['is_va_same_phone_number'];
var count_motor_listrik_purchased_30d = featureScoresByFeatureName['count_motor_listrik_purchased_30d'] == null ? -99 : featureScoresByFeatureName['count_motor_listrik_purchased_30d'];
var count_smartphone_purchased_30d = featureScoresByFeatureName['count_smartphone_purchased_30d'] == null ? -99 : featureScoresByFeatureName['count_smartphone_purchased_30d'];
var count_prev_suspect_fraud = featureScoresByFeatureName['count_prev_suspect_fraud'] == null ? -99 : featureScoresByFeatureName['count_prev_suspect_fraud'];
var app_recognition_verdict = featureScoresByFeatureName['app_recognition_verdict'] == null ? '-99' : featureScoresByFeatureName['app_recognition_verdict'];
var sum_pulsa_trx_30d = featureScoresByFeatureName['sum_pulsa_trx_30d'] == null ? -99 : featureScoresByFeatureName['sum_pulsa_trx_30d'];
var count_pulsa_trx_30d = featureScoresByFeatureName['count_pulsa_trx_30d'] == null ? -99 : featureScoresByFeatureName['count_pulsa_trx_30d'];
var flight_route_match = featureScoresByFeatureName['flight_route_match'] == null ? '-9999' : featureScoresByFeatureName['flight_route_match'];
// var adjusted_limit_utilization = featureScoresByFeatureName['adjusted_limit_utilization'] == null ? 0: featureScoresByFeatureName['adjusted_limit_utilization'];
var discounted_sum_outstanding_late_1y_latest = featureScoresByFeatureName['discounted_sum_outstanding_late_1y_latest'] == null ? -9999 : featureScoresByFeatureName['discounted_sum_outstanding_late_1y_latest'];
var rule_pefindo = featureScoresByFeatureName['rule_pefindo'] == null ? '-9999' : featureScoresByFeatureName['rule_pefindo'];
var sum_pulsa_pln_trx_3h = featureScoresByFeatureName['sum_pulsa_pln_trx_3h'] == null ? -9999 : featureScoresByFeatureName['sum_pulsa_pln_trx_3h'];
// var uses_merchant_side_discount = featureScoresByFeatureName['uses_merchant_side_discount'] == null ? '-9999' : featureScoresByFeatureName['uses_merchant_side_discount'];
// var is_applicant_phonenum_match_billing_or_shipping = featureScoresByFeatureName['is_applicant_phonenum_match_billing_or_shipping'] == null ? -9999 : featureScoresByFeatureName['is_applicant_phonenum_match_billing_or_shipping'];
// var sum_payment_same_merchant_tiket_blibli = featureScoresByFeatureName['sum_payment_same_merchant_tiket_blibli'] == null ? -9999 : featureScoresByFeatureName['sum_payment_same_merchant_tiket_blibli'];
var count_pulsa_transaction_8d = featureScoresByFeatureName['count_pulsa_transaction_8d'] == null ? -99: featureScoresByFeatureName['count_pulsa_transaction_8d'];
var count_disbursed_cash_7d = featureScoresByFeatureName['count_disbursed_cash_7d'] == null ? -99: featureScoresByFeatureName['count_disbursed_cash_7d'];
var sum_hp_transaction_1y = featureScoresByFeatureName['sum_hp_transaction_1y'] == null ? -99: featureScoresByFeatureName['sum_hp_transaction_1y'];

/* featureScoresByFeatureName - user activity*/
var is_change_device_l30d = featureScoresByFeatureName['is_change_device_l30d'] == null ? '-99' : featureScoresByFeatureName['is_change_device_l30d'];
var number_of_recaptured_l14d = featureScoresByFeatureName['number_of_recaptured_l14d'] == null ? -99 : featureScoresByFeatureName['number_of_recaptured_l14d'];
var count_otp_sms_l3d = featureScoresByFeatureName['count_otp_sms_l3d'] == null ? -99 : featureScoresByFeatureName['count_otp_sms_l3d'];
var count_verified_otp_sms_l3d = featureScoresByFeatureName['count_verified_otp_sms_l3d'] == null ? -99 : featureScoresByFeatureName['count_verified_otp_sms_l3d'];
var number_of_recaptured_l3d_above_70_percent = featureScoresByFeatureName['number_of_recaptured_l3d_above_70_percent'] == null ? -99 : featureScoresByFeatureName['number_of_recaptured_l3d_above_70_percent'];
var count_low_70_risk_facematch_score_14d = featureScoresByFeatureName['count_low_70_risk_facematch_score_14d'] == null ? -99 : featureScoresByFeatureName['count_low_70_risk_facematch_score_14d'];
var sum_amount_l7d_inc_now = featureScoresByFeatureName['sum_amount_l7d_inc_now'] == null ? -99 : featureScoresByFeatureName['sum_amount_l7d_inc_now'];
var day_diff_trx_to_last_cash_approve = featureScoresByFeatureName['day_diff_trx_to_last_cash_approve'] == null ? -99 : featureScoresByFeatureName['day_diff_trx_to_last_cash_approve'];
var day_diff_trx_to_last_cash_submit = featureScoresByFeatureName['day_diff_trx_to_last_cash_submit'] == null ? -99 : featureScoresByFeatureName['day_diff_trx_to_last_cash_submit'];
var day_diff_trx_to_last_cash_disburse = featureScoresByFeatureName['day_diff_trx_to_last_cash_disburse'] == null ? -99 : featureScoresByFeatureName['day_diff_trx_to_last_cash_disburse'];
var latest_cash_approved_date_1y = featureScoresByFeatureName['latest_cash_approved_date_1y'] == null ? '-999' : featureScoresByFeatureName['latest_cash_approved_date_1y'];
var latest_cash_rejected_date_1y = featureScoresByFeatureName['latest_cash_rejected_date_1y'] == null ? '-999' : featureScoresByFeatureName['latest_cash_rejected_date_1y'];
var count_prev_trx_merchant = featureScoresByFeatureName['count_prev_trx_merchant'] == null ? -99 : featureScoresByFeatureName['count_prev_trx_merchant'];
var count_prev_approved_trx_merchant_24h = featureScoresByFeatureName['count_prev_approved_trx_merchant_24h'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_merchant_24h'];
var count_prev_approved_trx_merchant_3h = featureScoresByFeatureName['count_prev_approved_trx_merchant_3h'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_merchant_3h'];
var count_prev_approved_trx_merchant_3d = featureScoresByFeatureName['count_prev_approved_trx_merchant_3d'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_merchant_3d'];
var count_prev_approved_trx_merchant_7d = featureScoresByFeatureName['count_prev_approved_trx_merchant_7d'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_merchant_7d'];
var count_prev_approved_trx_merchant_30d = featureScoresByFeatureName['count_prev_approved_trx_merchant_30d'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_merchant_30d'];
var match_ewallet_topup_phonenumber = featureScoresByFeatureName['match_ewallet_topup_phonenumber'] == null ? -9999 : featureScoresByFeatureName['match_ewallet_topup_phonenumber'];
var sum_approved_va_shopee_tiktok_tokopedia_30d_before_trx = featureScoresByFeatureName['sum_approved_va_shopee_tiktok_tokopedia_30d_before_trx'] == null ? -99 : featureScoresByFeatureName['sum_approved_va_shopee_tiktok_tokopedia_30d_before_trx'];

/* featureScoresByFeatureName - rescoring latest features*/
var app_list_score_cli_rescore = featureScoresByFeatureName['app_list_score_cli_rescore'] == null ? -99 : featureScoresByFeatureName['app_list_score_cli_rescore'];
var discounted_sum_outstanding_late1y_rescore = featureScoresByFeatureName['discounted_sum_outstanding_late1y_rescore'] == null ? -99 : featureScoresByFeatureName['discounted_sum_outstanding_late1y_rescore'];
var average_age_of_relationship_rescore = featureScoresByFeatureName['average_age_of_relationship_rescore'] == null ? -99 : featureScoresByFeatureName['average_age_of_relationship_rescore'];
var number_of_installed_loan_apps_within14days_rescore = featureScoresByFeatureName['number_of_installed_loan_apps_within14days_rescore'] == null ? -99 : featureScoresByFeatureName['number_of_installed_loan_apps_within14days_rescore'];
var izi_max_multi_inquiries14d_rescore = featureScoresByFeatureName['izi_max_multi_inquiries14d_rescore'] == null ? -99 : featureScoresByFeatureName['izi_max_multi_inquiries14d_rescore'];
var app_list_pefindo_flag_rescore = featureScoresByFeatureName['app_list_pefindo_flag_rescore'] == null ? -99 : featureScoresByFeatureName['app_list_pefindo_flag_rescore'];

/* offlineFeatures */
var cliMaxDpdLast30d = offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast30d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast30d'];
var cliMaxDpdLast90d = offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast90d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['cliMaxDpdLast90d'];
var store_count = size(offlineFeatures['blibliStoreLevelFeatures']);
var sumAmountTenure1MonthLast30dBlibli = offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dBlibli'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dBlibli'];
var sumAmountTenure1MonthLast30dIndodana = offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dIndodana'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dIndodana'];
var sumAmountTenure1MonthLast30dTiket = offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dTiket'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountTenure1MonthLast30dTiket'];
var isLimitEqualsLimitExposureBlibli = offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureBlibli'] == null ? false : offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureBlibli'];
var isLimitEqualsLimitExposureIndodana = offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureIndodana'] == null ? false : offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureIndodana'];
var isLimitEqualsLimitExposureTiket = offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureTiket'] == null ? false : offlineFeatures['userTransactionHistoryFeatures']['isLimitEqualsLimitExposureTiket'];
var blibliLimit = offlineFeatures['userTransactionHistoryFeatures']['blibliLimit'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['blibliLimit'];
var indodanaLimit = offlineFeatures['userTransactionHistoryFeatures']['indodanaLimit'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['indodanaLimit'];
var tiketLimit = offlineFeatures['userTransactionHistoryFeatures']['tiketLimit'] == null ? 0 : offlineFeatures['userTransactionHistoryFeatures']['tiketLimit'];
var riskGrade = offlineFeatures['userTransactionHistoryFeatures']['riskGrade'] == null ? '-99' : offlineFeatures['userTransactionHistoryFeatures']['riskGrade'];
var riskGradeOfflineScore = offlineFeatures['userTransactionHistoryFeatures']['riskGradeOfflineScore'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['riskGradeOfflineScore'];
var prevCliPaidInstallmentAvg = offlineFeatures['userTransactionHistoryFeatures']['prevCliPaidInstallmentAvg'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['prevCliPaidInstallmentAvg'];
var prevCliOutstandingBalance = offlineFeatures['userTransactionHistoryFeatures']['prevCliOutstandingBalance'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['prevCliOutstandingBalance'];
var countCashLoan1mFdcLatest = offlineFeatures['userTransactionHistoryFeatures']['countCashLoan1mFdcLatest'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['countCashLoan1mFdcLatest'];
var countCashLoan3mFdcLatest = offlineFeatures['userTransactionHistoryFeatures']['countCashLoan3mFdcLatest'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['countCashLoan3mFdcLatest'];
var cashMaxDpdLast30d = offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast30d'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast30d'];
var cashMaxDpdLast90d = offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast90d'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['cashMaxDpdLast90d'];
var countDistinctKtpDevice = offlineFeatures['userTransactionHistoryFeatures']['countDistinctKtpDevice'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['countDistinctKtpDevice'];
var sumAmountCancelledTrx30d = offlineFeatures['userTransactionHistoryFeatures']['sumAmountCancelledTrx30d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['sumAmountCancelledTrx30d'];
var countRejectedCashNikLevelLast1y = offlineFeatures['userTransactionHistoryFeatures']['countRejectedCashNikLevelLast1y'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['countRejectedCashNikLevelLast1y'];
var fdcStatisticNumberOfInquiryId30d = offlineFeatures['userTransactionHistoryFeatures']['fdcStatisticNumberOfInquiryId30d'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['fdcStatisticNumberOfInquiryId30d'];
var sumPaymentVaBeforeTrx = offlineFeatures['userTransactionHistoryFeatures']['sumPaymentVaBeforeTrx'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['sumPaymentVaBeforeTrx'];
var sumPaymentTiketBeforeTrx = offlineFeatures['userTransactionHistoryFeatures']['sumPaymentTiketBeforeTrx'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['sumPaymentTiketBeforeTrx'];
var activeCashOutstandingPercentage = offlineFeatures['userTransactionHistoryFeatures']['activeCashOutstandingPercentage'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['activeCashOutstandingPercentage'];
var cashLimitUtilization = offlineFeatures['userTransactionHistoryFeatures']['cashLimitUtilization'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['cashLimitUtilization'];
// var countInstalledLoanApps30dBeforeTrx = offlineFeatures['userTransactionHistoryFeatures']['countInstalledLoanApps30dBeforeTrx'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['countInstalledLoanApps30dBeforeTrx'];
var countInstalledLoanApps14dBeforeTrx = offlineFeatures['userTransactionHistoryFeatures']['countInstalledLoanApps14dBeforeTrx'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['countInstalledLoanApps14dBeforeTrx'];
// var countHpPurchaseAll1y = offlineFeatures['userTransactionHistoryFeatures']['countHpPurchaseAll1y'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['countHpPurchaseAll1y'];
// var countApprovedCash30d = offlineFeatures['userTransactionHistoryFeatures']['countApprovedCash30d'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['countApprovedCash30d'];
// var countHpPurchaseAll30d = offlineFeatures['userTransactionHistoryFeatures']['countHpPurchaseAll30d'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['countHpPurchaseAll30d'];
var totalOrganizerWithOutstanding1yExcludeIndodana = offlineFeatures['userTransactionHistoryFeatures']['totalOrganizerWithOutstanding1yExcludeIndodana'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['totalOrganizerWithOutstanding1yExcludeIndodana'];
var haveTokpedAppLatestDevice = offlineFeatures['userTransactionHistoryFeatures']['haveTokpedAppLatestDevice'] == null ? '-9999' : offlineFeatures['userTransactionHistoryFeatures']['haveTokpedAppLatestDevice'];
var vaOutstandingPercentage = offlineFeatures['userTransactionHistoryFeatures']['vaOutstandingPercentage'] == null ? -99 : offlineFeatures['userTransactionHistoryFeatures']['vaOutstandingPercentage'];
var latestItemRejected1y = offlineFeatures['userTransactionHistoryFeatures']['latestItemRejected1y'] == null ? '-9999' : offlineFeatures['userTransactionHistoryFeatures']['latestItemRejected1y'];
var totalPaidTrxBefore = offlineFeatures['userTransactionHistoryFeatures']['totalPaidTrxBefore'] == null ? -9999 : offlineFeatures['userTransactionHistoryFeatures']['totalPaidTrxBefore'];

// rapid trx cutoff
var thresholdRapidTrx3hMerchant = offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx3hMerchant'] == null ? 9999 : offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx3hMerchant'];
var thresholdRapidTrx24hMerchant = offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx24hMerchant'] == null ? 9999 : offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx24hMerchant'];
var thresholdRapidTrx3dMerchant = offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx3dMerchant'] == null ? 9999 : offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx3dMerchant'];
var thresholdRapidTrx7dMerchant = offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx7dMerchant'] == null ? 9999 : offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx7dMerchant'];
var thresholdRapidTrx30dMerchant = offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx30dMerchant'] == null ? 9999 : offlineFeatures['rapidTransactionAnalysis']['thresholdRapidTrx30dMerchant'];


/* blibliStoreLevelFeatures */
var ratioRoundItemPriceTrxAmt = size(offlineFeatures['blibliStoreLevelFeatures']) == 0 ? null : offlineFeatures['blibliStoreLevelFeatures'][0]['ratioRoundItemPriceTrxAmt'];
var isOfficialStore = size(offlineFeatures['blibliStoreLevelFeatures']) == 0 ? null : offlineFeatures['blibliStoreLevelFeatures'][0]['isOfficialStore'];
var trxChannel = size(offlineFeatures['blibliStoreLevelFeatures']) == 0 ? null : offlineFeatures['blibliStoreLevelFeatures'][0]['ptTrxDetailsChannels'];

/* scrappedSellerInformation */
var blibli_badges = featureScoresByFeatureName['blibli_badges'] == null ? "-9999" : featureScoresByFeatureName['blibli_badges'];

/* model score */
var model_tiket_blibli_30102025 = modelScore['model_tiket_blibli_30102025'];
var offline_transaction_scoring_202602 = modelScore['offline_transaction_scoring_202602'];

/* ----------- feature calculation ---------------------*/
var total_limit_usage = bucketizedCreditLimitAccountLimit - (bucketizedCreditLimitAccountLimitBalance - transactionAmount);
var total_limit_cumulative_usage = bucketizedCreditLimitAccountLimit - (bucketizedCreditLimitAccountLimitBalance + transactionAmount);

var amount_1mo_to_limit_ratio = 0;
if ((tenure == 1)) {
    if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
        amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dBlibli + transactionAmount) * 1.00 / bucketizedCreditLimitAccountLimit;
    } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
        amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dTiket + transactionAmount) * 1.00 / bucketizedCreditLimitAccountLimit;
    } else if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') {
        amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dIndodana + transactionAmount) * 1.00 / bucketizedCreditLimitAccountLimit;
    }
} else if ((tenure > 1)) {
    if ((creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') && (blibliLimit > 0)) {
        amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dBlibli * 1.00) / blibliLimit;
    } else if ((creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') && (tiketLimit > 0)) {
        amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dTiket * 1.00) / tiketLimit;
    } else if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME' && (indodanaLimit > 0)) {
        amount_1mo_to_limit_ratio = (sumAmountTenure1MonthLast30dIndodana * 1.00) / indodanaLimit;
    }
}

var bucket_multipliers = '';
var split_multiplier = '';
var max_multiplier = 1;

if ((creditLimitAccountCategoryType != null) && (!stringUtils.contains(creditLimitAccountCategoryType, 'NO_MULTIPLIER'))) {
    bucket_multipliers = stringUtils.split(creditLimitAccountCategoryType, '_');
    split_multiplier = bucket_multipliers[size(bucket_multipliers) - 1].toCharArray();
    max_multiplier = 1;

    for (m: split_multiplier) {
        if (toInteger(toString(m)) > max_multiplier) {
            max_multiplier = toInteger(toString(m));
        }
    }
}

var amount_1mo_to_limit_ratio_limit_equals_exposure_combined = '';
if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
    if (
        ((creditLimitAccountCategoryType != null) && (max_multiplier == 1))
        || (isLimitEqualsLimitExposureBlibli == true)
    ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'True';
    } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio < 0.3) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[-inf, 0.3)';
    } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio < 0.5) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.3, 0.5)';
    } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio < 0.9) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.5, 0.9)';
    } else if ((isLimitEqualsLimitExposureBlibli == false) && (amount_1mo_to_limit_ratio >= 0.9) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.9, inf)';
    }
} else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
    if (
        ((creditLimitAccountCategoryType != null) && (max_multiplier == 1))
        || (isLimitEqualsLimitExposureTiket == true)
    ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'True';
    } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio < 0.3) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[-inf, 0.3)';
    } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio < 0.5) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.3, 0.5)';
    } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio < 0.9) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.5, 0.9)';
    } else if ((isLimitEqualsLimitExposureTiket == false) && (amount_1mo_to_limit_ratio >= 0.9) ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.9, inf)';
    }
} else if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') {
    if (
        ((creditLimitAccountCategoryType != null) && (max_multiplier == 1))
        || (isLimitEqualsLimitExposureIndodana == true)
    ) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'True';
    } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio < 0.3)) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[-inf, 0.3)';
    } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio < 0.5)) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.3, 0.5)';
    } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio < 0.9)) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.5, 0.9)';
    } else if ((isLimitEqualsLimitExposureIndodana == false) && (amount_1mo_to_limit_ratio >= 0.9)) {
        amount_1mo_to_limit_ratio_limit_equals_exposure_combined = 'False[0.9, inf)';
    }
}

var previous_purchases_merchants = '';
for (merchant : countOfPurchaseByMerchant.keySet()) {
    previous_purchases_merchants = previous_purchases_merchants + merchant + ';'; 
}

var blibliStoreGroup = '';
if (store_count == 1) {
    blibliStoreGroup = offlineFeatures['blibliStoreLevelFeatures'][0]['blibliStoreGroup'];
}
var store_name = '';
for (store : storeNames) {
    store_name = store_name + store + ';'; 
}

var adjusted_limit_utilization = 1 - ((bucketizedCreditLimitAccountLimitBalance - (transactionAmount * 1.00)) / bucketizedCreditLimitAccountLimit);
var count_active_cash_loan = count_approved_cash_loan - count_finished_cash_loan;

var is_official_store_blibli = false;
if (stringUtils.contains(store_name, 'Official Store') || stringUtils.contains(store_name, 'by Blibli')) {
    is_official_store_blibli = true;
} 

var is_whitelisted_iphone_item_temp_limit = false;
for (item: IPHONE_WHITELIST_ITEMS) {
    if(stringUtils.contains(lowerCaseItemNames, item.toLowerCase())) {
        is_whitelisted_iphone_item_temp_limit = true;
    }    
}

var is_offline_origination = offline_transaction_applied_amount > 0 ? true : false;

var is_offline_transaction_with_agent = false;
if (agentId != null && is_offline_transaction){
    is_offline_transaction_with_agent = true;
}

var is_offline_dekoruma_origination = false;
for(store_initial: OFFLINE_DEKORUMA_STORES) {
    if (stringUtils.contains(initial_store_name.toLowerCase(), store_initial)) {
        is_offline_dekoruma_origination = true;
    }      
}

var is_offline_dekoruma_transaction = false;
for(store_initial: OFFLINE_DEKORUMA_STORES) {
    if (stringUtils.contains(merchantName.toLowerCase(), store_initial)) {
        is_offline_dekoruma_transaction = true;
    }      
}

var is_blibli_pln_transaction = false;
for (item_cat: itemCategories) {
    if (stringUtils.contains(item_cat.toLowerCase(), 'ele-')) {
        is_blibli_pln_transaction = true;
    }
}

var is_tiket_flight_transaction = false;
for (item_cat: itemCategories) {
    if (stringUtils.contains(item_cat.toLowerCase(), 'flight')) {
        is_tiket_flight_transaction = true;
    }
}

var is_restricted_item = false;
for (restricted_item: OFFLINE_RESTRICTED_ITEM){
    for (item_cat: itemCategories){
        if(stringUtils.contains(item_cat.toLowerCase(), restricted_item.toLowerCase())) {
            is_restricted_item = true;
        }
    }

    for (item_type: itemTypes){
        if(stringUtils.contains(item_type.toLowerCase(), restricted_item.toLowerCase())) {
            is_restricted_item = true;
        }
    }

    for (item_name: itemNames){
        if(stringUtils.contains(item_name.toLowerCase(), restricted_item.toLowerCase())) {
            is_restricted_item = true;
        }
    }
}

var is_sbc_restricted_item = false;
for (restricted_item: SBC_RESTRICTED_ITEM){
    for (item_type: itemTypes) {
        if(stringUtils.contains(merchantName.toLowerCase(), 'sbc berkah bersama') 
        && stringUtils.contains(item_type.toLowerCase(), restricted_item)) {
            is_sbc_restricted_item = true;
        }
    }
}

var is_change_item_to_ebike = false;
for (item_type: itemTypes){
    if(!(stringUtils.contains(offline_sub_item_category.toLowerCase(), 'sepeda listrik')) && (stringUtils.contains(item_type.toLowerCase(), 'sepeda listrik'))) {
        is_change_item_to_ebike = true;
    }
}

var is_insurance_merchant = false; /*Offline insurance merchants */
for (fsp_store: FSP_STORES) {
    for (store: storeNames) {
        if(stringUtils.contains(store.toLowerCase(), fsp_store)) {
            is_insurance_merchant = true;
        }
    }
}

var is_prj_merchants = false;
for (prj_store: PRJ_STORES) {
    for (store: storeNames) {
        if(stringUtils.contains(store.toLowerCase(), prj_store)) {
            is_prj_merchants = true;
        }
    }
}

var is_good_instore = false;
for (good_instore: BLIBLI_GOOD_INSTORE_LIST) {
    for (store: storeNames) {
        if(stringUtils.contains(store.toLowerCase(), good_instore)) {
            is_good_instore = true;
        }
    }
}

var is_good_merchant_online = false; /*Online good merchant*/
for (good_merchant: good_merchant_online) {
    if(stringUtils.contains(merchantName.toUpperCase(), good_merchant)) {
        is_good_merchant_online = true;
    }
}

var is_current_item_offline_whitelisted_item = false;
var is_requested_item_offline_whitelisted_item = false;
for (item: OFFLINE_WHITELIST_ITEMS) {
    if (stringUtils.contains(lowerCaseItemNames, item)) {
        is_current_item_offline_whitelisted_item = true;
    }
    if (stringUtils.contains(offline_item_names.toLowerCase(), item)) {
        is_requested_item_offline_whitelisted_item = true;
    }
}

/* samsung + (s21/s22/s23/flip/fold/z) */
for (samsung_series: OFFLINE_WHITELIST_ITEMS_SAMSUNG_EDITIONS) {
    if(stringUtils.contains(lowerCaseItemNames, 'samsung') 
    && stringUtils.contains(lowerCaseItemNames, samsung_series.toLowerCase())) {
        is_current_item_offline_whitelisted_item = true;
    }
    if(stringUtils.contains(offline_item_names.toLowerCase(), 'samsung') 
    && stringUtils.contains(offline_item_names.toLowerCase(), samsung_series.toLowerCase())) {
        is_requested_item_offline_whitelisted_item = true;
    }    
}

/*Apple + (iphone 12/iphone 13/iphone 14/iphone 15/ipad/macbook/imac/watch)*/
for (apple_series: OFFLINE_WHITELIST_ITEMS_APPLE_EDITIONS) {
    if(stringUtils.contains(lowerCaseItemNames, 'apple') 
    && stringUtils.contains(lowerCaseItemNames, apple_series.toLowerCase())) {
        is_current_item_offline_whitelisted_item = true;
    }
    if(stringUtils.contains(offline_item_names.toLowerCase(), 'apple') 
    && stringUtils.contains(offline_item_names.toLowerCase(), apple_series.toLowerCase())) {
        is_requested_item_offline_whitelisted_item = true;
    }    
}

/* PRJ DUMMY TO SMARTHPHONE */
for (store_initial: PRJ_DUMMY_LIST) {
    if (stringUtils.contains(initial_store_name.toLowerCase(), store_initial)) {
        offline_item_category = 'smartphone';
        is_requested_item_offline_whitelisted_item = false;
    } 
}

var item_name_list = stringUtils.split(itemNames, ',');
var count_item_price_above_1mio = 0;

for (itemname : item_name_list) {
    itemname_trim = itemname.replaceAll("^[ \t]+", "");
    var foundItemPrice = itemPrices[itemname_trim] == null ? itemPrices[itemname] : itemPrices[itemname_trim];
    if (foundItemPrice != null && foundItemPrice >= 1000000) {
        count_item_price_above_1mio = count_item_price_above_1mio + 1;
    }
}

/* change count_round_item_price definition for Belanja di Tokopedia */
if (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TOKOPEDIA')) {
    count_round_item_price = 0;

    for (itemname : item_name_list) {
        itemname_trim = itemname.replaceAll("^[ \t]+", "");
        var foundItemPrice = itemPrices[itemname_trim] == null ? itemPrices[itemname] : itemPrices[itemname_trim];
        if (foundItemPrice != null && foundItemPrice % 100000 == 1000) {
            count_round_item_price = count_round_item_price + 1;
        }
    }
}
/*======================OFFLINE CONTEXT======================
store_name: initial merchant
offline_store_category: initial merchant category
merchantName: current merchant
riskMerchantCategoryName: current merchant category 
===========================================================*/

var sanitizedMerchantNames = merchantName.replaceAll(";", "");

/* offline inital good store */
var is_initial_bad_store = stringUtils.contains(offline_store_category.toLowerCase(), 'bad');
/* offline current bad store */
var is_current_bad_store = stringUtils.contains(riskMerchantCategoryName.toLowerCase(), 'bad');

/* Motor Listrik */
/* Is listed motor listrik merchant & prefix merchant id ev2- */
var is_motor_listrik_merchant = false;
if(stringUtils.startsWith(merchantOrderId.toLowerCase(),'ev2-')) {
    is_motor_listrik_merchant = true;
}

var count_item_type_motor_listrik = 0;
var count_item_type_non_motor_listrik = 0;
for (itemtypes : itemTypes) {
    if (itemtypes.toLowerCase() == 'motor listrik') {
        count_item_type_motor_listrik = count_item_type_motor_listrik + 1;
    }
    if (itemtypes.toLowerCase() != 'motor listrik') {
        count_item_type_non_motor_listrik = count_item_type_non_motor_listrik + 1;
    }
}

/* medan fraud application and trx */
var is_medan_fraud_application = false;
for (medan_application: MEDAN_FRAUD_APPLICATION) {
    if(stringUtils.contains(initial_store_name.toLowerCase(), medan_application)) {
        is_medan_fraud_application = true;
    }
}

var is_medan_fraud_trx = false;
for (medan_trx: MEDAN_FRAUD_TRX) {
    if(stringUtils.contains(sanitizedMerchantNames, medan_trx)) {
        is_medan_fraud_trx = true;
    }
}

/* other fraud application and trx */
var is_other_fraud_application = false;
for (others_application: OTHERS_FRAUD_APPLICATION) {
    if(stringUtils.contains(initial_store_name.toLowerCase(), others_application)) {
        is_other_fraud_application = true;
    }
}

var is_others_fraud_trx = false;
for (others_trx: OTHERS_FRAUD_APPLICATION) {
    if(stringUtils.contains(sanitizedMerchantNames.toLowerCase(), others_trx)) {
        is_others_fraud_trx = true;
    }
}

/* ebike fraud application and trx */
var is_ebike_fraud_application = false;
for (ebike_application: EBIKE_FRAUD_APPLICATION) {
    if(stringUtils.contains(initial_store_name.toLowerCase(), ebike_application)) {
        is_ebike_fraud_application = true;
    }
}

var is_ebike_fraud_trx = false;
for (ebike_trx: EBIKE_FRAUD_TRX) {
    if(stringUtils.contains(sanitizedMerchantNames, ebike_trx)) {
        is_ebike_fraud_trx = true;
    }
}

var is_merchant_non_gadget_trx = false;
for (merchant_non_gadget: MERCHANT_NON_GADGET) {
    if(stringUtils.contains(sanitizedMerchantNames.toUpperCase(), merchant_non_gadget)) {
        is_merchant_non_gadget_trx = true;
    }
}

var is_agent_fraud_application = false;
var is_agent_fraud_trx = false;
for (fraud_agent_id: FRAUD_AGENT_LIST) {
    if(stringUtils.contains(agentId, fraud_agent_id)) {
        is_agent_fraud_trx = true;
    }

    if(stringUtils.contains(applicationAgentId, fraud_agent_id)) {
        is_agent_fraud_application = true;
    }
}

var count_item_type_smartphone = 0;
for (itemtypes : itemTypes) {
    if (itemtypes.toLowerCase() == 'smartphone') {
        count_item_type_smartphone = count_item_type_smartphone + 1;
    }
}

var count_item_type_gadget = 0;
for (itemtypes : itemTypes) {
    if (itemtypes.toLowerCase() == 'smartphone' || itemtypes.toLowerCase() == 'tablet') {
        count_item_type_gadget = count_item_type_gadget + 1;
    }
}
  
/* blibliStoreLevelFeatures */
if (ratioRoundItemPriceTrxAmt == null) {
    if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
        ratioRoundItemPriceTrxAmt = -999;
    } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
        ratioRoundItemPriceTrxAmt = -9999;
    }
}

if (isOfficialStore == null) {
    if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') {
        isOfficialStore = '-999';
    } else if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
        isOfficialStore = '-9999';
    }
}


/* item category gladys (handphone) */
var item_category_gladys = '';
if ((creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME') && (itemCategories.size()==1)) {
    if(["HA-1000066,HA-1000068,HA-1000067", "AN-1000028,HA-1000067,HA-1000066", "HA-1000066,AN-1000028,HA-1000067", "IP-1000003,HA-1000067,HA-1000066", "IP-1000003,HA-1000066,HA-1000067"].contains(itemCategories[0].toUpperCase())) {
            item_category_gladys = 'handphone';
        }
}

/* item category gladys (high risk item) */
var is_high_risk_items = false;
for (high_item: high_risk_items){
    for (item_ctg: itemCategories) {
        if(stringUtils.contains(item_ctg.toUpperCase(), high_item.toUpperCase())) {
            is_high_risk_items = true;
        }
    }
}

for (item_ctg: itemCategories) {
    if((item_ctg.toUpperCase().contains("MO-1000027")) && (item_ctg.toUpperCase().contains("OT-1000009"))) {
        is_high_risk_items = true;
    }
}

/* insurance */
if (is_insurance_merchant == true) {
    return "NORMAL;FSP insurance transactions;Insurance";
}  

/* ogan komering rule */
if ((stringUtils.contains(billingAddressCity.toLowerCase(), 'ogan') && stringUtils.contains(billingAddressCity.toLowerCase(), 'komering'))
    || (stringUtils.contains(billingAddressStreet.toLowerCase(), 'ogan') && stringUtils.contains(billingAddressStreet.toLowerCase(), 'komering'))
    || (stringUtils.contains(shippingAddressCity.toLowerCase(), 'ogan') && stringUtils.contains(shippingAddressCity.toLowerCase(), 'komering'))
    || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'ogan') && stringUtils.contains(shippingAddressStreet.toLowerCase(), 'komering'))) {
    return "BLOCK;Ogan Komering Billing / Shipping Address Blacklist;SuspectFraud";
}

/* Account Takeover Rule */
if((is_change_device_l30d == 'Change Device') && (count_otp_sms_l3d > 0)){
    if (number_of_recaptured_l14d > 0) {
        return "BLOCK;Change Device With OTP Sms And Recaptured;SuspectFraud";
    } else if (number_of_recaptured_l3d_above_70_percent > 0){
        return "BLOCK;Change Device With OTP Sms And LikelyRecaptured;SuspectFraud";
    } else if ((count_low_70_risk_facematch_score_14d > 1) && (merchantCategory == 'ONLINE') && (sum_amount_l7d_inc_now > 500000)){
        return "BLOCK;Change Device With OTP Sms And FaceNotMatch Online Transaction More Than 500K;SuspectFraud";
    } else if ((count_low_70_risk_facematch_score_14d > 1) && (merchantCategory == 'ONLINE')) {
        return "BLOCK;Change Device With OTP Sms And FaceNotMatch Online Transaction;SuspectFraud";
    }
}

/* cloned app / app recognition rule block */
if (app_recognition_verdict == 'UNRECOGNIZED_VERSION') {
return "BLOCK;Unrecognized App Version;SuspectFraud";
}

/* fraud different master user id, first secondary trx */
var userid_and_master_userid_different = false;
if (masterUserId != null && userId != null && masterUserId != userId) {
    userid_and_master_userid_different = true;
}
if (isMainApplication == false && userid_and_master_userid_different && (count_prev_trx_merchant == 0) && (transactionAmount > 1000000)) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
        return "SUSPICIOUS;Secondary First Transaction With Different Master User ID;SuspectFraud";
    }
    else {
        return "BLOCK;Secondary First Transaction With Different Master User ID;SuspectFraud";
    }
}
if (stringUtils.contains(merchantName.toUpperCase(), 'XENDIT') && stringUtils.contains(store_name.toLowerCase(), 'taplink komputer') ) {
    return "BLOCK;XENDIT - TapLink Computer Suspect fraud;BlacklistedSeller";
}

if (stringUtils.contains(merchantName.toUpperCase(), 'UNIPIN') && stringUtils.contains(lowerCaseItemNames, 'reload') ) {
    return "BLOCK;UNIPIN - Reload Suspect fraud;BlacklistedItem";
}



/* ------------- LOGIC - identity score -------------*/
var identity_score = -999
/* ------------- ALL - identity_score_scoring_criteria_cli_payslip_tiket_20220125 -------------*/

identity_score = 460;
if (email_age_ever_name_match <= -99) {
    identity_score = identity_score - 16;
} else if (email_age_ever_name_match <= -1) {
    identity_score = identity_score - 9;
} else if (email_age_ever_name_match > -1) {
    identity_score = identity_score + 33;
}

if (phone_age_ever_name_match <= -99) {
    identity_score = identity_score - 9;
} else if (phone_age_ever_name_match <= -1) {
    identity_score = identity_score + 0;
} else if (phone_age_ever_name_match > -1) {
    identity_score = identity_score + 20;
}
if (verified_izi_mobile_phone_whatsapp == 'not verified') {
    identity_score = identity_score + 4;
} else if (verified_izi_mobile_phone_whatsapp == 'no') {
    identity_score = identity_score - 25;
} else if (verified_izi_mobile_phone_whatsapp == 'verified') {
    identity_score = identity_score + 45;
} 
if (match_ewallet_name_logic == 'OK') {
    identity_score = identity_score + 56;
} else if (match_ewallet_name_logic == 'NOT OK') {
    identity_score = identity_score - 12;
} else if (match_ewallet_name_logic == '-99') {
    identity_score = identity_score - 12;
} else if (match_ewallet_name_logic == '-999') {
    identity_score = identity_score - 12;
}
if (hibp_name_match <= 0) {
    identity_score = identity_score - 7;
} else if (hibp_name_match > 0) {
    identity_score = identity_score + 26;
}
if (["12month+", "10-12month"].contains(izi_mobile_phone_number_ages)) {
    identity_score = identity_score + 23;
} else if (["8-10month", "0-1month", "1-2month", "6-8month", "3-4month", "2-3month", "5-6month", "4-5month"].contains(izi_mobile_phone_number_ages)) {
    identity_score = identity_score + 1;
} else if (["-99", "-999"].contains(izi_mobile_phone_number_ages)) {
    identity_score = identity_score - 11;
}
    
var tiket_blibli_transaction_model_ab_test = abTestingHelper.getVariation(entityId, 'TIKET_BLIBLI_TRANSACTION_MODEL_NEW', 'NORMAL');  
/* ------------- LOGIC - transaction score -------------*/
var trx_score = -999
/* ------------- BLIBLI TIKET-------------*/
if ((creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") || (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME")) {
    var adjusted_limit_utilization = featureScoresByFeatureName['adjusted_limit_utilization'] == null ? 0: featureScoresByFeatureName['adjusted_limit_utilization'];
    if (tiket_blibli_transaction_model_ab_test == 'BLIBLI_TIKET_TRX_NEW_MODEL'){
        trx_score = model_tiket_blibli_30102025;
    } else {
        trx_score = 483;
        if (discounted_sum_outstanding_late_1y_latest <= -1.0) {
            trx_score = trx_score - 10;
        } else if (discounted_sum_outstanding_late_1y_latest <= 14000.0) {
            trx_score = trx_score + 22;
        } else if (discounted_sum_outstanding_late_1y_latest <= 100000.0) {
            trx_score = trx_score - 14;
        } else if (discounted_sum_outstanding_late_1y_latest <= 200000.0) {
            trx_score = trx_score - 25;
        } else if (discounted_sum_outstanding_late_1y_latest <= 300000.0) {
            trx_score = trx_score - 37;
        } else if (discounted_sum_outstanding_late_1y_latest <= 600000.0) {
            trx_score = trx_score - 58;
        } else if (discounted_sum_outstanding_late_1y_latest <= 2000000.0) {
            trx_score = trx_score - 75;
        } else if (discounted_sum_outstanding_late_1y_latest <= 6000000.0) {
            trx_score = trx_score - 76;
        } else if (discounted_sum_outstanding_late_1y_latest > 6000000.0) {
            trx_score = trx_score - 84;
        }
        if (creditLimitMaxDpd <= 3.0) {
            trx_score = trx_score + 11;
        } else if (creditLimitMaxDpd <= 7.0) {
            trx_score = trx_score - 1;
        } else if (creditLimitMaxDpd <= 15.0) {
            trx_score = trx_score - 34;
        } else if (creditLimitMaxDpd <= 30.0) {
            trx_score = trx_score - 61;
        } else if (creditLimitMaxDpd > 30.0) {
            trx_score = trx_score - 93;
        }
        if (cliMaxDpdLast90d <= 0.0) {
            trx_score = trx_score + 2;
        } else if (cliMaxDpdLast90d <= 5.0) {
            trx_score = trx_score - 1;
        } else if (cliMaxDpdLast90d <= 7.0) {
            trx_score = trx_score - 11;
        } else if (cliMaxDpdLast90d <= 15.0) {
            trx_score = trx_score - 19;
        } else if (cliMaxDpdLast90d <= 30.0) {
            trx_score = trx_score - 24;
        } else if (cliMaxDpdLast90d > 30.0) {
            trx_score = trx_score - 32;
        }
        if (prevCliPaidInstallmentAvg <= -1.0) {
            trx_score = trx_score - 10;
        } else if (prevCliPaidInstallmentAvg <= 0.0) {
            trx_score = trx_score + 0;
        } else if (prevCliPaidInstallmentAvg <= 100000.0) {
            trx_score = trx_score - 15;
        } else if (prevCliPaidInstallmentAvg <= 125000.0) {
            trx_score = trx_score - 8;
        } else if (prevCliPaidInstallmentAvg <= 155000.0) {
            trx_score = trx_score - 3;
        } else if (prevCliPaidInstallmentAvg <= 180000.0) {
            trx_score = trx_score - 2;
        } else if (prevCliPaidInstallmentAvg <= 250000.0) {
            trx_score = trx_score + 3;
        } else if (prevCliPaidInstallmentAvg <= 360000.0) {
            trx_score = trx_score + 10;
        } else if (prevCliPaidInstallmentAvg <= 525000.0) {
            trx_score = trx_score + 16;
        } else if (prevCliPaidInstallmentAvg > 525000.0) {
            trx_score = trx_score + 26;
        }
        if (adjusted_limit_utilization <= 0.3) {
            trx_score = trx_score + 20;
        } else if (adjusted_limit_utilization <= 0.5) {
            trx_score = trx_score + 2;
        } else if (adjusted_limit_utilization <= 0.7) {
            trx_score = trx_score - 7;
        } else if (adjusted_limit_utilization <= 0.8) {
            trx_score = trx_score - 15;
        } else if (adjusted_limit_utilization <= 0.9) {
            trx_score = trx_score - 22;
        } else if (adjusted_limit_utilization <= 0.95) {
            trx_score = trx_score - 28;
        } else if (adjusted_limit_utilization > 0.95) {
            trx_score = trx_score - 37;
        }
        if (max_partner_score <= 0.0) {
            trx_score = trx_score - 14;
        } else if (max_partner_score <= 363.0) {
            trx_score = trx_score - 6;
        } else if (max_partner_score <= 376.0) {
            trx_score = trx_score + 1;
        } else if (max_partner_score <= 388.0) {
            trx_score = trx_score + 8;
        } else if (max_partner_score <= 407.0) {
            trx_score = trx_score + 12;
        } else if (max_partner_score > 407.0) {
            trx_score = trx_score + 29;
        }
        if (cliMaxDpdLast30d <= 0.0) {
            trx_score = trx_score + 3;
        } else if (cliMaxDpdLast30d <= 3.0) {
            trx_score = trx_score - 5;
        } else if (cliMaxDpdLast30d <= 7.0) {
            trx_score = trx_score - 32;
        } else if (cliMaxDpdLast30d <= 15.0) {
            trx_score = trx_score - 56;
        } else if (cliMaxDpdLast30d > 15.0) {
            trx_score = trx_score - 78;
        }
        if (['-9999'].contains(blibli_badges)) {
            trx_score = trx_score + 4;
        } else if (['-999'].contains(blibli_badges)) {
            trx_score = trx_score - 10;
        } else if (['Diamond'].contains(blibli_badges)) {
            trx_score = trx_score + 8;
        } else if (['Gold'].contains(blibli_badges)) {
            trx_score = trx_score + 3;
        } else if (['Silver'].contains(blibli_badges)) {
            trx_score = trx_score - 3;
        } else if (['Bronze'].contains(blibli_badges)) {
            trx_score = trx_score - 8;
        } else {
            trx_score = trx_score + 0;
        }
        if (average_age_of_relationship_rescore <= -1.0) {
            trx_score = trx_score - 1;
        } else if (average_age_of_relationship_rescore <= 0.0) {
            trx_score = trx_score - 8;
        } else if (average_age_of_relationship_rescore <= 30.0) {
            trx_score = trx_score - 22;
        } else if (average_age_of_relationship_rescore <= 90.0) {
            trx_score = trx_score - 19;
        } else if (average_age_of_relationship_rescore <= 180.0) {
            trx_score = trx_score - 18;
        } else if (average_age_of_relationship_rescore <= 360.0) {
            trx_score = trx_score - 8;
        } else if (average_age_of_relationship_rescore > 360.0) {
            trx_score = trx_score + 14;
        }
        if (days_since_last_trx <= -1.0) {
            trx_score = trx_score + 8;
        } else if (days_since_last_trx <= 1.0) {
            trx_score = trx_score - 10;
        } else if (days_since_last_trx <= 2.0) {
            trx_score = trx_score - 3;
        } else if (days_since_last_trx <= 5.0) {
            trx_score = trx_score - 2;
        } else if (days_since_last_trx <= 9.0) {
            trx_score = trx_score + 3;
        } else if (days_since_last_trx <= 15.0) {
            trx_score = trx_score + 7;
        } else if (days_since_last_trx > 15.0) {
            trx_score = trx_score + 13;
        }
        if (ratioRoundItemPriceTrxAmt <= -9999.0) {
            trx_score = trx_score + 2;
        } else if (ratioRoundItemPriceTrxAmt <= -999.0) {
            trx_score = trx_score + 2;
        } else if (ratioRoundItemPriceTrxAmt <= 0.06) {
            trx_score = trx_score + 0;
        } else if (ratioRoundItemPriceTrxAmt <= 0.2) {
            trx_score = trx_score - 3;
        } else if (ratioRoundItemPriceTrxAmt <= 0.7) {
            trx_score = trx_score - 6;
        } else if (ratioRoundItemPriceTrxAmt > 0.7) {
            trx_score = trx_score - 8;
        }
        if (['1', '1A-2', '2', '1A-2CC', '1A-2CCB', '2CC', '2CCB'].contains(rule_pefindo)) {
            trx_score = trx_score - 6;
        } else {
            trx_score = trx_score + 19;
        }
        if (['-9999'].contains(isOfficialStore)) {
            trx_score = trx_score + 1;
        } else if (['-999'].contains(isOfficialStore)) {
            trx_score = trx_score - 2;
        } else if (isOfficialStore == false) {
            trx_score = trx_score - 2;
        } else if (isOfficialStore == true) {
            trx_score = trx_score + 2;
        } else {
            trx_score = trx_score + 0;
        }
        if (['False[0.9, inf)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score + 5;
        } else if (['False[0.5, 0.9)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score - 7;
        } else if (['False[-inf, 0.3)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score + 10;
        } else if (['False[0.3, 0.5)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score - 2;
        } else if (['True'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score - 17;
        } else {
            trx_score = trx_score + 0;
        }
        if (count_unique_month_paid_before_trx <= 0.0) {
            trx_score = trx_score - 42;
        } else if (count_unique_month_paid_before_trx <= 3.0) {
            trx_score = trx_score - 23;
        } else if (count_unique_month_paid_before_trx <= 9.0) {
            trx_score = trx_score - 1;
        } else if (count_unique_month_paid_before_trx <= 12.0) {
            trx_score = trx_score + 4;
        } else if (count_unique_month_paid_before_trx <= 15.0) {
            trx_score = trx_score + 8;
        } else if (count_unique_month_paid_before_trx <= 20.0) {
            trx_score = trx_score + 17;
        } else if (count_unique_month_paid_before_trx > 20.0) {
            trx_score = trx_score + 61;
        }
        if (prevCliOutstandingBalance <= 0.0) {
            trx_score = trx_score + 8;
        } else if (prevCliOutstandingBalance > 0.0) {
            trx_score = trx_score - 2;
        }
        if (countCashLoan3mFdcLatest <= -1.0) {
            trx_score = trx_score - 9;
        } else if (countCashLoan3mFdcLatest <= 0.0) {
            trx_score = trx_score + 3;
        } else if (countCashLoan3mFdcLatest <= 3.0) {
            trx_score = trx_score + 6;
        } else if (countCashLoan3mFdcLatest <= 4.0) {
            trx_score = trx_score + 3;
        } else if (countCashLoan3mFdcLatest <= 5.0) {
            trx_score = trx_score - 6;
        } else if (countCashLoan3mFdcLatest <= 8.0) {
            trx_score = trx_score - 9;
        } else if (countCashLoan3mFdcLatest <= 10.0) {
            trx_score = trx_score - 20;
        } else if (countCashLoan3mFdcLatest <= 20.0) {
            trx_score = trx_score - 25;
        } else if (countCashLoan3mFdcLatest > 20.0) {
            trx_score = trx_score - 38;
        }
        if (app_list_pefindo_flag_rescore <= -1.0) {
            trx_score = trx_score + 2;
        } else if (app_list_pefindo_flag_rescore <= 220.0) {
            trx_score = trx_score + 3;
        } else if (app_list_pefindo_flag_rescore <= 280.0) {
            trx_score = trx_score - 11;
        } else if (app_list_pefindo_flag_rescore <= 330.0) {
            trx_score = trx_score - 19;
        } else if (app_list_pefindo_flag_rescore > 330.0) {
            trx_score = trx_score - 35;
        }
        if (cashMaxDpdLast30d <= -99.0) {
            trx_score = trx_score + 3;
        } else if (cashMaxDpdLast30d <= 0.0) {
            trx_score = trx_score - 9;
        } else if (cashMaxDpdLast30d <= 1.0) {
            trx_score = trx_score - 47;
        } else if (cashMaxDpdLast30d <= 3.0) {
            trx_score = trx_score - 66;
        } else if (cashMaxDpdLast30d > 3.0) {
            trx_score = trx_score - 85;
        }
        if (cashMaxDpdLast90d <= -99.0) {
            trx_score = trx_score + 1;
        } else if (cashMaxDpdLast90d <= 0.0) {
            trx_score = trx_score - 1;
        } else if (cashMaxDpdLast90d <= 1.0) {
            trx_score = trx_score - 8;
        } else if (cashMaxDpdLast90d <= 3.0) {
            trx_score = trx_score - 11;
        } else if (cashMaxDpdLast90d > 3.0) {
            trx_score = trx_score - 15;
        }
        if (countCashLoan1mFdcLatest <= -1.0) {
            trx_score = trx_score - 7;
        } else if (countCashLoan1mFdcLatest <= 2.0) {
            trx_score = trx_score + 2;
        } else if (countCashLoan1mFdcLatest <= 3.0) {
            trx_score = trx_score - 11;
        } else if (countCashLoan1mFdcLatest <= 5.0) {
            trx_score = trx_score - 20;
        } else if (countCashLoan1mFdcLatest <= 10.0) {
            trx_score = trx_score - 28;
        } else if (countCashLoan1mFdcLatest > 10.0) {
            trx_score = trx_score - 38;
        }
        if (sumAmountCancelledTrx30d <= 0.0) {
            trx_score = trx_score + 1;
        } else if (sumAmountCancelledTrx30d <= 2000000.0) {
            trx_score = trx_score - 5;
        } else if (sumAmountCancelledTrx30d <= 4000000.0) {
            trx_score = trx_score - 7;
        } else if (sumAmountCancelledTrx30d > 4000000.0) {
            trx_score = trx_score - 9;
        }
        if (count_reject_abusedet_last_30d <= -1.0) {
            trx_score = trx_score + 8;
        } else if (count_reject_abusedet_last_30d <= 0.0) {
            trx_score = trx_score + 3;
        } else if (count_reject_abusedet_last_30d <= 5.0) {
            trx_score = trx_score - 34;
        } else if (count_reject_abusedet_last_30d <= 10.0) {
            trx_score = trx_score - 41;
        } else if (count_reject_abusedet_last_30d > 10.0) {
            trx_score = trx_score - 49;
        }
        if (izi_max_multi_inquiries14d_rescore <= 0.0) {
            trx_score = trx_score + 0;
        } else if (izi_max_multi_inquiries14d_rescore <= 1.0) {
            trx_score = trx_score - 8;
        } else if (izi_max_multi_inquiries14d_rescore <= 3.0) {
            trx_score = trx_score - 13;
        } else if (izi_max_multi_inquiries14d_rescore > 3.0) {
            trx_score = trx_score - 20;
        }
        if (percentage_max_dpd_15_1y <= -1.0) {
            trx_score = trx_score + 1;
        } else if (percentage_max_dpd_15_1y <= 0.0) {
            trx_score = trx_score + 1;
        } else if (percentage_max_dpd_15_1y > 0.0) {
            trx_score = trx_score - 15;
        }
        if (countDistinctKtpDevice <= -1.0) {
            trx_score = trx_score - 2;
        } else if (countDistinctKtpDevice <= 2.0) {
            trx_score = trx_score + 0;
        } else if (countDistinctKtpDevice > 2.0) {
            trx_score = trx_score - 10;
        }
        if (sum_pulsa_pln_trx_3h <= 0.0) {
            trx_score = trx_score + 0;
        } else if (sum_pulsa_pln_trx_3h <= 1000000.0) {
            trx_score = trx_score - 10;
        } else if (sum_pulsa_pln_trx_3h <= 2000000.0) {
            trx_score = trx_score - 18;
        } else if (sum_pulsa_pln_trx_3h > 2000000.0) {
            trx_score = trx_score - 62;
        }    
    }
}

/* ------------- INDODANA -------------*/
var va_transaction_model_ab_test = abTestingHelper.getVariation(entityId, 'VA_TRANSACTION_MODEL_NEW', 'default_value');  

if (creditLimitAccountScheme == "INDODANA_GENERIC_SCHEME") {
    var adjusted_limit_utilization = featureScoresByFeatureName['adjusted_limit_utilization'] == null ? 0: featureScoresByFeatureName['adjusted_limit_utilization'];

    if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI')) && (va_transaction_model_ab_test == 'VA_TRANSACTION_MODEL_NEW')) {
        // Calculate score here
        trx_score = 433;

        if(adjusted_limit_utilization <= 0.3) {
            trx_score = trx_score + 36;
        } else if (adjusted_limit_utilization <= 0.5) {
            trx_score = trx_score + 13;
        } else if (adjusted_limit_utilization <= 0.7) {
            trx_score = trx_score + 5;
        } else if (adjusted_limit_utilization <= 0.9) {
            trx_score = trx_score - 9;
        } else if (adjusted_limit_utilization <= 0.95) {
            trx_score = trx_score - 19;
        } else if (adjusted_limit_utilization > 0.95) {
            trx_score = trx_score - 33;
        }
        if(fdcStatisticNumberOfInquiryId30d <= 0.0) {
            trx_score = trx_score + 7;
        } else if (fdcStatisticNumberOfInquiryId30d <= 4.0) {
            trx_score = trx_score + 5;
        } else if (fdcStatisticNumberOfInquiryId30d <= 7.0) {
            trx_score = trx_score - 5;
        } else if (fdcStatisticNumberOfInquiryId30d > 7.0) {
            trx_score = trx_score - 22;
        }
        if(total_limit_usage <= 1500000.0) {
            trx_score = trx_score + 28;
        } else if (total_limit_usage <= 8500000.0) {
            trx_score = trx_score + 7;
        } else if (total_limit_usage <= 20000000.0) {
            trx_score = trx_score - 7;
        } else if (total_limit_usage > 20000000.0) {
            trx_score = trx_score - 21;
        }
        if(vaOutstandingPercentage <= 0.0) {
            trx_score = trx_score - 5;
        } else if (vaOutstandingPercentage <= 0.7) {
            trx_score = trx_score + 42;
        } else if (vaOutstandingPercentage <= 0.9) {
            trx_score = trx_score + 5;
        } else if (vaOutstandingPercentage > 0.9) {
            trx_score = trx_score - 18;
        }
        if(totalOrganizerWithOutstanding1yExcludeIndodana <= 0.0) {
            trx_score = trx_score + 13;
        } else if (totalOrganizerWithOutstanding1yExcludeIndodana <= 3.0) {
            trx_score = trx_score + 7;
        } else if (totalOrganizerWithOutstanding1yExcludeIndodana <= 5.0) {
            trx_score = trx_score - 9;
        } else if (totalOrganizerWithOutstanding1yExcludeIndodana <= 9.0) {
            trx_score = trx_score - 21;
        } else if (totalOrganizerWithOutstanding1yExcludeIndodana <= 15.0) {
            trx_score = trx_score - 32;
        } else if (totalOrganizerWithOutstanding1yExcludeIndodana > 15.0) {
            trx_score = trx_score - 56;
        }
        if(activeCashOutstandingPercentage <= -1.0) {
            trx_score = trx_score + 13;
        } else if (activeCashOutstandingPercentage <= 0.3) {
            trx_score = trx_score + 4;
        } else if (activeCashOutstandingPercentage <= 0.7) {
            trx_score = trx_score - 7;
        } else if (activeCashOutstandingPercentage > 0.7) {
            trx_score = trx_score - 26;
        }
        if(countCashLoan1mFdcLatest <= -1.0) {
            trx_score = trx_score - 1;
        } else if (countCashLoan1mFdcLatest <= 0.0) {
            trx_score = trx_score + 2;
        } else if (countCashLoan1mFdcLatest <= 3.0) {
            trx_score = trx_score - 1;
        } else if (countCashLoan1mFdcLatest > 3.0) {
            trx_score = trx_score - 8;
        }
        if(totalPaidTrxBefore <= 2.0) {
            trx_score = trx_score - 17;
        } else if (totalPaidTrxBefore <= 7.0) {
            trx_score = trx_score - 15;
        } else if (totalPaidTrxBefore <= 15.0) {
            trx_score = trx_score - 3;
        } else if (totalPaidTrxBefore <= 40.0) {
            trx_score = trx_score + 1;
        } else if (totalPaidTrxBefore > 40.0) {
            trx_score = trx_score + 14;
        }
        if(cashMaxDpdLast30d <= 0.0) {
            trx_score = trx_score + 1;
        } else if (cashMaxDpdLast30d > 0.0) {
            trx_score = trx_score - 24;
        }
        if(cashMaxDpdLast90d <= 0.0) {
            trx_score = trx_score + 1;
        } else if (cashMaxDpdLast90d > 0.0) {
            trx_score = trx_score - 13;
        }
        if(countInstalledLoanApps14dBeforeTrx <= 0.0) {
            trx_score = trx_score + 4;
        } else if (countInstalledLoanApps14dBeforeTrx <= 1.0) {
            trx_score = trx_score - 18;
        } else if (countInstalledLoanApps14dBeforeTrx <= 3.0) {
            trx_score = trx_score - 30;
        } else if (countInstalledLoanApps14dBeforeTrx > 3.0) {
            trx_score = trx_score - 42;
        }
        if(offline_transaction_applied_amount <= 0.0) {
            trx_score = trx_score + 7;
        } else if (offline_transaction_applied_amount > 0.0) {
            trx_score = trx_score - 17;
        }
        if(cliMaxDpdLast90d <= 3.0) {
            trx_score = trx_score + 0;
        } else if (cliMaxDpdLast90d <= 7.0) {
            trx_score = trx_score - 4;
        } else if (cliMaxDpdLast90d > 7.0) {
            trx_score = trx_score - 31;
        }
        if(cliMaxDpdLast30d <= 1.0) {
            trx_score = trx_score + 1;
        } else if (cliMaxDpdLast30d <= 3.0) {
            trx_score = trx_score - 11;
        } else if (cliMaxDpdLast30d <= 7.0) {
            trx_score = trx_score - 33;
        } else if (cliMaxDpdLast30d > 7.0) {
            trx_score = trx_score - 157;
        }
        if(['Handphone', 'Smartphone'].contains(latestItemRejected1y)) {
            trx_score = trx_score - 22;
        } else if (['Pulsa'].contains(latestItemRejected1y)) {
            trx_score = trx_score - 15;
        } else if (['BPJS'].contains(latestItemRejected1y)) {
            trx_score = trx_score - 3;
        } else if (['PLN/Tagihan Listrik'].contains(latestItemRejected1y)) {
            trx_score = trx_score - 6;
        } else if (stringUtils.contains(latestItemRejected1y, '-99')) {
            trx_score = trx_score + 3;
        } else {
            trx_score = trx_score - 2;
        }
        if(days_since_last_trx <= 0.0) {
            trx_score = trx_score - 7;
        } else if (days_since_last_trx <= 60.0) {
            trx_score = trx_score + 3;
        } else if (days_since_last_trx <= 180.0) {
            trx_score = trx_score + 2;
        } else if (days_since_last_trx > 180.0) {
            trx_score = trx_score - 2;
        }
        if(stringUtils.contains(('' + haveTokpedAppLatestDevice).toLowerCase(), 'true')) {
            trx_score = trx_score + 0;
        } else if (stringUtils.contains(('' + haveTokpedAppLatestDevice).toLowerCase(), 'false')) {
            trx_score = trx_score - 12;
        } else if (stringUtils.contains(('' + haveTokpedAppLatestDevice), '-99')) {
            trx_score = trx_score + 5;
        } else {
            trx_score = trx_score + 0
        }
        if(average_age_of_relationship_rescore <= -1.0) {
            trx_score = trx_score - 3;
        } else if (average_age_of_relationship_rescore <= 90.0) {
            trx_score = trx_score - 4;
        } else if (average_age_of_relationship_rescore > 90.0) {
            trx_score = trx_score + 0;
        }
        if(is_va_same_phone_number == 1) {
            trx_score = trx_score + 4;
        } else if (is_va_same_phone_number == 0) {
            trx_score = trx_score - 8;
        } else {
            trx_score = trx_score + 0;
        }
        if(stringUtils.contains(phone_model_class, '-99')) {
            trx_score = trx_score + 24;
        } else if (['Iphone', 'Expensive'].contains(phone_model_class)) {
            trx_score = trx_score + 7;
        } else if (['Cheap'].contains(phone_model_class)) {
            trx_score = trx_score - 11;
        } else {
            trx_score = trx_score - 6;
        }
        if(count_pulsa_transaction_8d <= 0.0) {
            trx_score = trx_score + 2;
        } else if (count_pulsa_transaction_8d > 0.0) {
            trx_score = trx_score - 22;
        }
        if(count_submit_cash_loan_application_30_days <= 0.0) {
            trx_score = trx_score + 2;
        } else if (count_submit_cash_loan_application_30_days > 0.0) {
            trx_score = trx_score - 4;
        }
        if(sum_hp_transaction_1y <= 10000000.0) {
            trx_score = trx_score + 0;
        } else if (sum_hp_transaction_1y > 10000000.0) {
            trx_score = trx_score - 14;
        }
        if(sumTotalPayment <= 0.0) {
            trx_score = trx_score - 56;
        } else if (sumTotalPayment <= 1000000.0) {
            trx_score = trx_score - 13;
        } else if (sumTotalPayment <= 2000000.0) {
            trx_score = trx_score - 22;
        } else if (sumTotalPayment <= 5000000.0) {
            trx_score = trx_score - 12;
        } else if (sumTotalPayment > 5000000.0) {
            trx_score = trx_score + 4;
        }
        if(['1', '1A-2', '2', '1A-2CC', '1A-2CCB', '2CC', '2CCB'].contains(rule_pefindo)) {
            trx_score = trx_score - 9;
        } else {
            trx_score = trx_score + 14;
        }
        if(countDistinctKtpDevice <= 1.0) {
            trx_score = trx_score + 1;
        } else if (countDistinctKtpDevice > 1.0) {
            trx_score = trx_score - 12;
        }
        if(discounted_sum_outstanding_late_1y_latest <= 0.0) {
            trx_score = trx_score + 1;
        } else if (discounted_sum_outstanding_late_1y_latest <= 100000.0) {
            trx_score = trx_score - 32;
        } else if (discounted_sum_outstanding_late_1y_latest <= 1000000.0) {
            trx_score = trx_score - 24;
        } else if (discounted_sum_outstanding_late_1y_latest > 1000000.0) {
            trx_score = trx_score - 42;
        }
        if(count_reject_abusedet_last_30d <= 0.0) {
            trx_score = trx_score + 1;
        } else if (count_reject_abusedet_last_30d <= 7.0) {
            trx_score = trx_score - 23;
        } else if (count_reject_abusedet_last_30d > 7.0) {
            trx_score = trx_score - 32;
        }
        if(count_disbursed_cash_7d <= 0.0) {
            trx_score = trx_score + 2;
        } else if (count_disbursed_cash_7d > 0.0) {
            trx_score = trx_score - 35;
        }
    } else {
        trx_score = 450;

        if (cliMaxDpdLast30d <= 0) {
            trx_score = trx_score + 9;
        } else if (cliMaxDpdLast30d <= 1) {
            trx_score = trx_score + 2;
        } else if (cliMaxDpdLast30d <= 2) {
            trx_score = trx_score - 5;
        } else if (cliMaxDpdLast30d <= 3) {
            trx_score = trx_score - 22;
        } else if (cliMaxDpdLast30d <= 7) {
            trx_score = trx_score - 29;
        } else if (cliMaxDpdLast30d <= 15) {
            trx_score = trx_score - 66;
        } else if (cliMaxDpdLast30d > 15) {
            trx_score = trx_score - 99;
        }
        if (cliMaxDpdLast90d <= 0) {
            trx_score = trx_score + 9;
        } else if (cliMaxDpdLast90d <= 1) {
            trx_score = trx_score + 5;
        } else if (cliMaxDpdLast90d <= 2) {
            trx_score = trx_score + 2;
        } else if (cliMaxDpdLast90d <= 3) {
            trx_score = trx_score - 11;
        } else if (cliMaxDpdLast90d <= 7) {
            trx_score = trx_score - 19;
        } else if (cliMaxDpdLast90d <= 15) {
            trx_score = trx_score - 49;
        } else if (cliMaxDpdLast90d <= 30) {
            trx_score = trx_score - 68;
        } else if (cliMaxDpdLast90d > 30) {
            trx_score = trx_score - 84;
        }
        if (app_list_score_cli_rescore <= -1) {
            trx_score = trx_score + 15;
        } else if (app_list_score_cli_rescore <= 150) {
            trx_score = trx_score + 26;
        } else if (app_list_score_cli_rescore <= 200) {
            trx_score = trx_score + 12;
        } else if (app_list_score_cli_rescore <= 250) {
            trx_score = trx_score + 0;
        } else if (app_list_score_cli_rescore <= 280) {
            trx_score = trx_score - 13;
        } else if (app_list_score_cli_rescore <= 310) {
            trx_score = trx_score - 20;
        } else if (app_list_score_cli_rescore > 310) {
            trx_score = trx_score - 25;
        }
        if (discounted_sum_outstanding_late1y_rescore <= -1) {
            trx_score = trx_score - 29;
        } else if (discounted_sum_outstanding_late1y_rescore <= 0) {
            trx_score = trx_score + 13;
        } else if (discounted_sum_outstanding_late1y_rescore <= 100000) {
            trx_score = trx_score - 4;
        } else if (discounted_sum_outstanding_late1y_rescore <= 500000) {
            trx_score = trx_score - 23;
        } else if (discounted_sum_outstanding_late1y_rescore > 500000) {
            trx_score = trx_score - 38;
        }
        if (adjusted_limit_utilization <= 0.3) {
            trx_score = trx_score + 50;
        } else if (adjusted_limit_utilization <= 0.5) {
            trx_score = trx_score + 15;
        } else if (adjusted_limit_utilization <= 0.7) {
            trx_score = trx_score + 2;
        } else if (adjusted_limit_utilization <= 0.8) {
            trx_score = trx_score - 8;
        } else if (adjusted_limit_utilization <= 0.9) {
            trx_score = trx_score - 18;
        } else if (adjusted_limit_utilization <= 0.95) {
            trx_score = trx_score - 19;
        } else if (adjusted_limit_utilization > 0.95) {
            trx_score = trx_score - 40;
        }
        if (day_latest_to_earliest_payment_date_last3y_before_trx <= -99) {
            trx_score = trx_score - 11;
        } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 0) {
            trx_score = trx_score - 1;
        } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 30) {
            trx_score = trx_score + 0;
        } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 90) {
            trx_score = trx_score + 1;
        } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 180) {
            trx_score = trx_score + 0;
        } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 270) {
            trx_score = trx_score + 2;
        } else if (day_latest_to_earliest_payment_date_last3y_before_trx <= 450) {
            trx_score = trx_score + 5;
        } else if (day_latest_to_earliest_payment_date_last3y_before_trx > 450) {
            trx_score = trx_score + 8;
        }
        if (average_age_of_relationship_rescore <= -1) {
            trx_score = trx_score - 12;
        } else if (average_age_of_relationship_rescore <= 0) {
            trx_score = trx_score - 13;
        } else if (average_age_of_relationship_rescore <= 30) {
            trx_score = trx_score - 10;
        } else if (average_age_of_relationship_rescore <= 90) {
            trx_score = trx_score - 5;
        } else if (average_age_of_relationship_rescore <= 180) {
            trx_score = trx_score - 3;
        } else if (average_age_of_relationship_rescore <= 360) {
            trx_score = trx_score + 0;
        } else if (average_age_of_relationship_rescore > 360) {
            trx_score = trx_score + 14;
        }
        if (count_unique_month_paid_before_trx <= 0) {
            trx_score = trx_score - 37;
        } else if (count_unique_month_paid_before_trx <= 3) {
            trx_score = trx_score + 2;
        } else if (count_unique_month_paid_before_trx <= 6) {
            trx_score = trx_score + 3;
        } else if (count_unique_month_paid_before_trx <= 9) {
            trx_score = trx_score + 6;
        } else if (count_unique_month_paid_before_trx <= 12) {
            trx_score = trx_score + 12;
        } else if (count_unique_month_paid_before_trx > 12) {
            trx_score = trx_score + 24;
        }
        if (['True'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score - 15;
        } else if (['False[-inf, 0.3)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score + 3;
        } else if (['False[0.3, 0.5)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score + 9;
        } else if (['False[0.5, 0.9)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score + 13;
        } else if (['False[0.9, inf)'].contains(amount_1mo_to_limit_ratio_limit_equals_exposure_combined)) {
            trx_score = trx_score + 13;
        }
        if (['badrate 0%-3%'].contains(item_group_risk)) {
            trx_score = trx_score + 10;
        } else if (['badrate 3%-6%'].contains(item_group_risk)) {
            trx_score = trx_score + 4;
        } else if (['badrate 6%-9%'].contains(item_group_risk)) {
            trx_score = trx_score - 4;
        } else if (['badrate 9%-12%', 'badrate > 12%'].contains(item_group_risk)) {
            trx_score = trx_score - 20;
        }
        if (number_of_installed_loan_apps_within14days_rescore <= -99.0) {
            trx_score = trx_score + 10;
        } else if (number_of_installed_loan_apps_within14days_rescore <= 0) {
            trx_score = trx_score + 3;
        } else if (number_of_installed_loan_apps_within14days_rescore <= 1) {
            trx_score = trx_score - 7;
        } else if (number_of_installed_loan_apps_within14days_rescore > 1) {
            trx_score = trx_score - 19;
        }
        if (["1", "1A-2", "2", "2CC", "2CCB", "1A-2CC", "1A-2CCB"].contains(rule_pefindo)) {
            trx_score = trx_score - 5;
        } else {
            trx_score = trx_score + 30;
        }
        if (shipping_purchase_ratio <= 0) {
            trx_score = trx_score - 6;
        } else if (shipping_purchase_ratio <= 0.03) {
            trx_score = trx_score + 8;
        } else if (shipping_purchase_ratio > 0.03) {
            trx_score = trx_score + 15;
        }
        if (percentage_latest_dpd_15_1y <= -1) {
            trx_score = trx_score - 1;
        } else if (percentage_latest_dpd_15_1y <= 0.1) {
            trx_score = trx_score + 1;
        } else if (percentage_latest_dpd_15_1y <= 0.2) {
            trx_score = trx_score + 0;
        } else if (percentage_latest_dpd_15_1y <= 0.5) {
            trx_score = trx_score - 2;
        } else if (percentage_latest_dpd_15_1y > 0.5) {
            trx_score = trx_score - 6;
        }
        if (count_round_item_price <= 0) {
            trx_score = trx_score + 2;
        } else if (count_round_item_price > 0) {
            trx_score = trx_score - 25;
        }
        if (percentage_max_dpd_15_1y <= -1) {
            trx_score = trx_score - 3;
        } else if (percentage_max_dpd_15_1y <= 0) {
            trx_score = trx_score + 4;
        } else if (percentage_max_dpd_15_1y > 0) {
            trx_score = trx_score - 21;
        }
        if (izi_max_multi_inquiries14d_rescore <= 0) {
            trx_score = trx_score + 1;
        } else if (izi_max_multi_inquiries14d_rescore <= 1) {
            trx_score = trx_score - 14;
        } else if (izi_max_multi_inquiries14d_rescore <= 3) {
            trx_score = trx_score - 15;
        } else if (izi_max_multi_inquiries14d_rescore <= 5) {
            trx_score = trx_score - 26;
        } else if (izi_max_multi_inquiries14d_rescore > 5) {
            trx_score = trx_score - 48;
        }
    }
}
/* --------------------------*/
/* rejected cash after cli submit */
var offline_small_merchant = [
    'alfamart',
    'alfamidi',
    'starbucks',
    'youtap',
    'kfc'
];

var is_offline_small_merchant = false;
for(small_merchant: offline_small_merchant) {
    if (stringUtils.contains(merchantName.toLowerCase(), small_merchant)) {
        is_offline_small_merchant = true;
    }      
}

if (!blacklistHelper.isWhitelistedBulkCheck('phones', 'production-tester-user', {"phoneNumber": userPhoneNumber}, whitelistedResults)) {

    /* 1y rule */
    if ((countRejectedCashNikLevelLast1y > 0) && (!stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
        if (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME"){
            if ((transactionAmount >= 1000000) || (adjusted_limit_utilization >= 0.7)){ /*relax Tiket reject 60d/1y, amount < 1mio, limit util < 0.7 */
                if (stringUtils.contains(riskGrade.toUpperCase(), 'B') 
                    || stringUtils.contains(riskGrade.toUpperCase(), 'C')) { /*relax Tiket reject 60d/1y, RG C, last cash approved */
                    if (count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup > 0) { /*relax Tiket reject 30d exclude btpl B & C */
                        if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                            return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
                        }
                    }
                } else {
                    return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
                }
            }
        } else if (is_offline_transaction == true){
            if (((is_offline_edc_transaction == false) && (is_offline_qr_transaction == false)) /*relax QR trx*/
                && ((count_item_type_smartphone > 0) || (is_current_item_offline_whitelisted_item == true)) /*relax non smartphone trx */
            ){
                if (stringUtils.contains(riskGrade.toUpperCase(), 'B')) {
                    if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                        return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
                    }
                } else {
                    return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
                }
            }
        } else {
            if (is_offline_small_merchant == false){  /*relax offline small merchant*/ 
                if (stringUtils.contains(riskGrade.toUpperCase(), 'B')) {
                    if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                        return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
                    }
                } else {
                    return "BLOCK;User has rejected cash after submit CLI & 1y before transaction;RejectedCash";
                }
            }
        }
    }

    /* 60d rule */
    if (count_reject_cash_after_cli_submit_last_60d_excl_btpl_and_cash_topup > 0) {
        if (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME") {
            if ((transactionAmount >= 1000000) || (adjusted_limit_utilization >= 0.7)){ /*relax Tiket reject 60d/1y, amount < 1mio, limit util < 0.7 */
                if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) 
                    || (stringUtils.contains(riskGrade.toUpperCase(), 'B')) || (stringUtils.contains(riskGrade.toUpperCase(), 'C'))) { /*Relax Tiket reject non BTPL within 60d/1y B & C */
                    if (count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup > 0) {
                        if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                            return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                        }
                    }
                } else {
                    return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                }
            }
        } else if (is_offline_transaction == true){
            if (((is_offline_edc_transaction == false) && (is_offline_qr_transaction == false)) /*relax QR trx*/
                && ((count_item_type_smartphone > 0) || (is_current_item_offline_whitelisted_item == true)) /*relax non smartphone trx */
            ){
                if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) || (stringUtils.contains(riskGrade.toUpperCase(), 'B'))) {
                    if (stringUtils.contains(riskGrade.toUpperCase(), 'A')) {
                        if (count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup > 0) {
                            if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                                return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                            }
                        }
                    } else {
                        if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                            return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                        }
                    }
                } else {
                    return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                }
            }
        } else {
            if (is_offline_small_merchant == false){ /*relax offline small merchant*/ 
                if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) || (stringUtils.contains(riskGrade.toUpperCase(), 'B'))) {
                    if (stringUtils.contains(riskGrade.toUpperCase(), 'A')) {
                        if (count_reject_cash_after_cli_submit_last_30d_excl_btpl_and_cash_topup > 0) {
                            if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                                return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                            }
                        }
                    } else {
                        if ((latest_cash_rejected_date_1y == '-999') || (latest_cash_approved_date_1y == '-999') || (latest_cash_approved_date_1y <= latest_cash_rejected_date_1y)) {
                            return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                        }
                    }
                } else {
                    return "BLOCK;User has rejected cash after submit CLI & 60d before transaction;RejectedCash";
                }
            }
        }
    }
}

if (
    (stringUtils.contains(merchantName.toLowerCase(), 'gramedia') || (stringUtils.contains(merchantName, 'KAWAN LAMA'))) 
    && (agentId != null)
) {
    return `REJECT;Merchant ${merchantName} transaction using promotor app agentId ${agentId};PromotorAppTransaction`;
}
  
if (stringUtils.contains(merchantName.toUpperCase(), 'XENDIT')) {
    var contains_whitelist_store = false;
    var storename = '';
    for (whitelist_store: XENDIT_WHITELIST_STORES) {
        for (store: storeNames) {
            /*  convert store to lowercase */
            /*  check if lowercase store contains whitelist_store */
            storename = store;
            if(stringUtils.contains(store.toLowerCase(), whitelist_store)) {
                contains_whitelist_store = true;
            }
        }
    }
    for (whitelist_store: XENDIT_WHITELIST_STORES_2) {
        for (store: storeNames) {
            /*  convert store to lowercase */
            /*  check if lowercase store contains whitelist_store */
            storename = store;
            if(store.toLowerCase() == whitelist_store.toLowerCase()) {
                contains_whitelist_store = true;
            }
        }
    }
    if (contains_whitelist_store == false) {
        return `REJECT;XENDIT - ${storename} not whitelisted yet;BlacklistedSeller`;
    }
}

if ((is_offline_transaction == false) && (is_insurance_merchant == false) && (count_installed_fraud_app_90d >= 1)) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
        return "SUSPICIOUS;Installed fraud apk within 90d;SuspectFraud;Install Fraud Apk";
    } else {
        return "BLOCK;Installed fraud apk within 90d;SuspectFraud";
    }
}

/* ------------------------- VA using agent phone number ------------------------- */
var blacklisted_agent_phone_numbers = [
    '82119192253',
    '8973834152',
    '85213839499',
    '81649074849',
    '85706458530',
    '88224853563',
    '85974048150',
    '85860521384',
    '88210925173',
    '895352260704',
    '85334965154',
    '87879573334',
    '8871550411',
    '8984432114',
    '87796714175',
    '81388037842',
    '85972500691',
    '85777675410',
    '82138111893'
]

if (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) {
    for (blacklisted_agent_phone_number: blacklisted_agent_phone_numbers) {
        if (is_va_same_phone_number == 0 && (stringUtils.contains(merchantOrderId, blacklisted_agent_phone_number))) {
            return "BLOCK;VA Transaction using terminated agent phone number;SuspectFraud";
        }
    }
}

/* ------------------------- TIKET BLOCK NEW USER MAXOUT RULE --------------------------*/
if (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME"){
    var new_user_flag = 'existing';
    if ((tiket_score <= 0) && (blibli_score <= 0) &&
        ((tiket_account_age == '') || (tiket_account_age == '-99')) &&
        ((tiket_account_age_max == '') || (tiket_account_age_max == '-99')) &&
        ((tiket_account_age_days_max >= 1200 || tiket_account_age_days >=1200) || (tiket_days_before_1st_trx > 0) || (tiket_sum_order_amount_paid_max > 0))){
        new_user_flag = 'extra existing';
    } else if ((tiket_score <=0) && (blibli_score<=0) && ((tiket_account_age == '') || (tiket_account_age =='-99')) && ((tiket_account_age_max=='') || (tiket_account_age_max=='-99'))) {
        new_user_flag = 'new';
    }

    var flight_match_id_living_working_birth_city_tiket = featureScoresByFeatureName['flight_match_id_living_working_birth_city_tiket'] == null ? -9999 : featureScoresByFeatureName['flight_match_id_living_working_birth_city_tiket'];

    if (new_user_flag == 'new' && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 3) && (adjusted_limit_utilization >= 0.5)
        && (stringUtils.contains(flight_route_match.toLowerCase(), 'single trip')) && (flight_match_id_living_working_birth_city_tiket == 0)){
        return 'BLOCK;Tiket New User 3h after submit, Adjusted Limit Utilization >= 0.5, Single Trip Flight Not Match ID Living Working Birth City;BlacklistedUser';
    }
    
    if ((max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 24) && (adjusted_limit_utilization >= 0.7) && countInstalledLoanApps14dBeforeTrx >= 2){
        return 'BLOCK;Tiket transaction 24h after submit, Adjusted Limit Utilization >= 0.7, Installed Loan Apps 14d Before Trx >= 2;BlacklistedUser';
    }
}

/* ------------------------- RAPID TRANSACTION RULE --------------------------*/
if (rapidTransactionCount > 10) {
    return 'BLOCK;Rapid Transaction Count >10;BlacklistedUser';
}

var count_prev_approved_trx_24h = featureScoresByFeatureName['count_prev_approved_trx_24h'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_24h'];
if (count_prev_approved_trx_24h >= 25){
    return "BLOCK;Rapid Transaction >= 25 within 24h;BlacklistedUser";
}

var count_prev_approved_trx_3d = featureScoresByFeatureName['count_prev_approved_trx_3d'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_3d'];
if (count_prev_approved_trx_3d >= 58){
    return "BLOCK;Rapid Transaction >= 58 within 3d;BlacklistedUser";
}

var count_prev_approved_trx_merchant_by_amount_3h = featureScoresByFeatureName['count_prev_approved_trx_merchant_by_amount_3h'] == null ? -99 : featureScoresByFeatureName['count_prev_approved_trx_merchant_by_amount_3h'];
if (transactionAmount >= 1000000) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION){
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "SUSPICIOUS;Digital Products by Cermati High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "SUSPICIOUS;Blibli Paylater High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "SUSPICIOUS;Tiket Paylater High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "SUSPICIOUS;VA High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        }
    } else {
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "REJECT;Digital Products by Cermati High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 3){
            return "REJECT;Blibli Paylater High Trx Amount rapid Transaction >= 3 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "REJECT;Tiket Paylater High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 4){
            return "REJECT;VA High Trx Amount rapid Transaction >= 4 within 3h;BlacklistedUser";
        }
    }
} else if (transactionAmount < 1000000) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION){
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "SUSPICIOUS;Digital Products by Cermati Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "SUSPICIOUS;Blibli Paylater Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "SUSPICIOUS;Tiket Paylater Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "SUSPICIOUS;VA Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";    
        }
    } else {
        if ((merchantName == 'Digital Products by Cermati') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "REJECT;Digital Products by Cermati Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Blibli Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 6){
            return "REJECT;Blibli Paylater Low Trx Amount rapid Transaction >= 6 within 3h;BlacklistedUser";
        } else if ((merchantName == 'Tiket Paylater') && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "REJECT;Tiket Paylater Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && count_prev_approved_trx_merchant_by_amount_3h >= 10){
            return "REJECT;VA Low Trx Amount rapid Transaction >= 10 within 3h;BlacklistedUser";    
        }
    }
}

// only for Indomaret, Alfagift, Klik Indomaret, Zalora, Other online (avg trx amt > 600k: zalora cutoff, <= 600k: indomaret cutoff), and Offline (using indomaret cutoff) transactions
if (count_prev_approved_trx_merchant_3h >= thresholdRapidTrx3hMerchant || count_prev_approved_trx_merchant_24h >= thresholdRapidTrx24hMerchant || count_prev_approved_trx_merchant_3d >= thresholdRapidTrx3dMerchant || count_prev_approved_trx_merchant_7d >= thresholdRapidTrx7dMerchant || count_prev_approved_trx_merchant_30d >= thresholdRapidTrx30dMerchant){
    return "REJECT;Rapid Transaction;BlacklistedUser";
}

var count_approved_single_domestic_flight_exclude_cgk_24h_tiket = featureScoresByFeatureName['count_approved_single_domestic_flight_exclude_cgk_24h_tiket'] == null ? -99 : featureScoresByFeatureName['count_approved_single_domestic_flight_exclude_cgk_24h_tiket'];
if ((creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME") && (count_approved_single_domestic_flight_exclude_cgk_24h_tiket >= 2)
){
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
        return "SUSPICIOUS;Tiket Transact Flight Exclude CGK Past 24h >=2;BlacklistedUser";
    }
}

if (stringUtils.contains(initial_store_name.toUpperCase(), 'BLIBLI EVENT GRAND INDONESIA')) {
    return "NORMAL;Whitelisted Blibli Instore transactions;"
}

var super_good_merchants = [
    'kfc',
    '- mcd'
]

for (merchants: super_good_merchants) {
    if (stringUtils.contains(merchantName.toLowerCase(), merchants)) {
        return "NORMAL;Safe Transaction";
    }
}

var is_blibli_store = false;
for (store: storeNames) {
    if(stringUtils.contains(store.toLowerCase(), 'blibli')) {
        is_blibli_store = true;
    }
}

var is_bad_address_blibli_instore = false;
for (addresses: storeAddresses) {
    // 1. ITC Cempaka Mas
    if (stringUtils.contains(addresses.toUpperCase(), 'ITC') && stringUtils.contains(addresses.toUpperCase(), 'CEMPAKA')) {
        is_bad_address_blibli_instore = true;
    }
    // 2. ITC Roxy
    if (stringUtils.contains(addresses.toUpperCase(), 'ITC ROXY')) {
        is_bad_address_blibli_instore = true;
    }

    // 5. PGC
    if (
        (stringUtils.contains(addresses.toUpperCase(), 'PGC') || stringUtils.contains(addresses.toUpperCase(), 'PUSAT GROSIR CILILITAN'))
    ) {
        is_bad_address_blibli_instore = true;
    }

    // 4. BEC
    if (
        (stringUtils.contains(addresses.toUpperCase(), 'BEC') || stringUtils.contains(addresses.toUpperCase(), 'BANDUNG ELECTRONIC CENT') || stringUtils.contains(addresses.toUpperCase(), 'BANDUNG ELEKTRONIK CENT')) &&
        !is_blibli_store 
    ) {
        is_bad_address_blibli_instore = true;
    }

}

if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME' && merchantCategory.toUpperCase() == 'BLIBLI_INSTORE' && is_bad_address_blibli_instore){
    return "REJECT;Blibli Instore Bad Store Address;BlacklistedInstoreAddress";  
}

var is_whitelisted_instore = false;
for (whitelist_store: BLIBLI_INSTORE_WHITELIST) {
    if (merchantPlatformStoreIds.contains(whitelist_store)) {
        is_whitelisted_instore = true;
    }
}

if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME' && merchantCategory.toUpperCase() == 'BLIBLI_INSTORE' && !is_whitelisted_instore) {
    if (!is_blibli_store) {
    return "REJECT;Transact in Blibli Non-Whitelisted Instore;BlacklistedInstore";
    }
}

var BLIBLI_STORE_WHITELISTED_JEWELLERY = false;
for (whitelist_store: BLIBLI_JEWEL_WHITELIST) {
    if (merchantPlatformStoreIds.contains(whitelist_store)) {
        BLIBLI_STORE_WHITELISTED_JEWELLERY = true;
    }
}

if (isBlacklisted && !BLIBLI_STORE_WHITELISTED_JEWELLERY) {
    return "REJECT;Blacklisted Keywords Detected;BlacklistedSeller";
}

if (merchantName == 'Bank Sahabat Sampoerna') {
    return "REJECT;Bank Sahabat Sampoerna / Paylater Card Transaction;SystemMaintenance";
}

var BLACK_COUNTRY_LIST = ['iran','myanmar','north korea'];
var address = "";

if (billingAddressStreet != null) {
    address += billingAddressStreet.toLowerCase() + " ";
}

if (shippingAddressStreet != null) {
    address += shippingAddressStreet.toLowerCase();
}

var subbefore = "";
var lastcharsubbefore = "";
var firstcharsubafter = "";

for (black_country: BLACK_COUNTRY_LIST) {
    if (stringUtils.contains(address, black_country)) {
        subbefore = stringUtils.substringBefore(address, black_country);
        lastcharsubbefore = subbefore.charAt(subbefore.length()-1)+"";
        firstcharsubafter = stringUtils.substringAfter(address, black_country).charAt(0)+"";
        if (!(stringUtils.isAlpha(firstcharsubafter) || stringUtils.isAlpha(lastcharsubbefore))) {
            return "REJECT;Black Country Keywords Found;BlacklistedCountry";
        }
    }
}

/* ------------------Account Takeover Rule to Real Time Review-------------------*/
if((is_change_device_l30d == 'Change Device') && (count_low_70_risk_facematch_score_14d > 1) && (merchantCategory == 'ONLINE')){
    if (sum_amount_l7d_inc_now > 500000){
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Change Device And FaceNotMatch Online Transaction More Than 500K;SuspectFraud;Account Takeover Activity";
        } else {
            return "BLOCK;Change Device And FaceNotMatch Online Transaction More Than 500K;SuspectFraud";
        } 
    } else {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Change Device And FaceNotMatch Online Transaction;SuspectFraud;Account Takeover Activity";
        } else {
            return "BLOCK;Change Device And FaceNotMatch Online Transaction;SuspectFraud";
        }
    }
}

/* ------------------Ad hoc fraud rule-------------------*/
var is_liveness_not_match = 'liveness match';

/* Rule for blocking or real time transaction on liveness selfie does not match */
if ((count_low_risk_facematch_score_1d > 0) && (merchantCategory != 'OFFLINE') && (is_insurance_merchant == false)) {
    if (is_tokopedia != 'true') {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Have Liveness Selfie Not Match (99.95) Within 1 Day;SuspectFraud;Liveness Not Match";
        } else {
            is_liveness_not_match = 'liveness not match';
        }    
    }
}

/* ------------------Malahayati Address Rule-------------------*/
var SUSPICIOUS_ADDRESS = [
    'jl. mampang prapatan raya no.2',
    'jl. mampang prpt. raya no.2',
    'jl. mampang prapatan raya no.37',
    'jl. mampang prpt. raya no.37',
    'jl. mampang prapatan raya no.99',
    'jl. mampang prpt. raya no.99',
    'jl. meruya ilir raya no.8',
    'jl. meruya ilir raya no.10a',
    'jl. pesona anggrek harapan no.15',
    'jl. kota bambu selatan iii no.8', /* sapala consultant */
    'qr5g+558', /* malahayati mampang */
    'rr82+3g', /* sapala consultant */
    'jl. meruya selatan no.100', /* sapala consultant */
    'jl. prof. drg. soeria soemantri no.b4/66', /* budhe jilly bdg */
    'jl. tukad balian no.226a', /* budhe jilly bali */
    'kebon jeruk xix rrx9+mg9', /* rumah pak rw */
    'jl. h. sennin no.55',/* babe panju */
    'jl. h. sennin no. 55',
    'jl. h. sennin no55',
    'toko seragam haji rosni',
    'jl. gajah raya no.45',
    'jl. h. bandarsyah timur no.65'
];

/* Risky City South Sumatera */
var SOUTH_SUMATERA_CITY = [
    'banyuasin',
    'banyu asin',
    'lubuklinggau',
    'lubuk linggau',
    'muara enim',
    'ogan komering',
    'oku timur',
    'ogan ilir',
    'musi rawas',
    'prabumulih',
    'lahat',
    'penukal abab lematang',
    'pagar alam',
    'pagaralam',
    'empat lawang',
    'palembang',
    'bukit kecil',
    'sekayu',
    'muara beliti',
    'rupit',
    'talang ubi'
];

var is_suspicious_billing_shipping_address = false;

for (suspicious_address: SUSPICIOUS_ADDRESS) {
    if ((stringUtils.contains(shippingAddressStreet.toLowerCase(), suspicious_address)) || (stringUtils.contains(billingAddressStreet.toLowerCase(), suspicious_address))) {
        is_suspicious_billing_shipping_address = true;
    }
}

var is_applicant_city_in_sumsel = false;
var is_applicant_current_city_in_sumsel = false;
var is_shipping_to_sumsel = false;

for (city_keyword : SOUTH_SUMATERA_CITY) {
    if (stringUtils.contains(applicant_residence_city.toLowerCase(), city_keyword)) {
        is_applicant_city_in_sumsel = true;
    }
    if (stringUtils.contains(applicant_current_residence_city.toLowerCase(), city_keyword)) {
        is_applicant_current_city_in_sumsel = true;
    }
    if (stringUtils.contains(shippingAddressCity.toLowerCase(), city_keyword)) {
        is_shipping_to_sumsel = true;
    }
}

if (creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {
    if (
        (is_suspicious_billing_shipping_address == true)
        || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'malahayati')) /* malahayati*/ || (stringUtils.contains(shippingName.toLowerCase(), 'malahayati')) /* malahayati*/
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. damai rt.02/rw.05, kota bambu utara')) && (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'no.32'))) /* sapala consultant */ || ((stringUtils.contains(billingAddressStreet.toLowerCase(), 'jl. damai rt.02/rw.05, kota bambu utara')) && (stringUtils.contains(billingAddressStreet.toLowerCase(), 'no.32'))) /* sapala consultant */  
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. letjend sutoyo no.140')) ) || ((stringUtils.contains(billingAddressStreet.toLowerCase(), 'jl. letjend sutoyo no.140')) ) 
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. kusumanegara no.99')) ) || ((stringUtils.contains(billingAddressStreet.toLowerCase(), 'kusumanegara no.99')) ) 
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspected Malahayati Fraud;SuspectFraud;Malahayati";
        } else {
            return "BLOCK;Suspected Malahayati Fraud;SuspectFraud";
        }
    }

    if (
        (is_suspicious_billing_shipping_address == true)
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'kebon jeruk xix')) && ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'rt 11/rw 09')) || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'rt.11/rw.9')) || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'rt11 rw09')))) /* rumah pak rw */
        || ((stringUtils.contains(billingAddressStreet.toLowerCase(), 'kebon jeruk xix')) && ((stringUtils.contains(billingAddressStreet.toLowerCase(), 'rt 11/rw 09')) || (stringUtils.contains(billingAddressStreet.toLowerCase(), 'rt.11/rw.9')) || (stringUtils.contains(billingAddressStreet.toLowerCase(), 'rt11 rw09')))) /* rumah pak rw */   
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. pahlawan no.40')) && (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'rt.3/rw.5'))) 
        || ((stringUtils.contains(billingAddressStreet.toLowerCase(), 'jl. pahlawan no.40')) && (stringUtils.contains(billingAddressStreet.toLowerCase(), 'rt.3/rw.5'))) 
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspected Bad Address Fraud;SuspectFraud;Bad Address";
        } else {
            return "BLOCK;Suspected Bad Address Fraud;SuspectFraud";
        }
    }

    if (
        (is_suspicious_billing_shipping_address == true)
        || ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'jl. damai rt.02/rw.05, kota bambu utara')) && (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'no.32'))) /* sapala consultant */
        || ((stringUtils.contains(billingAddressStreet.toLowerCase(), 'jl. damai rt.02/rw.05, kota bambu utara')) && (stringUtils.contains(billingAddressStreet.toLowerCase(), 'no.32'))) /* sapala consultant */
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspected Sapala Consultant Fraud;SuspectFraud;Sapala Consultant";
        } else {
            return "BLOCK;Suspected Sapala Consultant Fraud;SuspectFraud";
        }
    }

    /* SHIPPING ADDRESS TO SOUTH SUMATERA */
    if (
        (is_offline_transaction == false) && 
        (is_insurance_merchant == false) && 
        (trxChannel != 'Digital Product') &&
        (is_applicant_city_in_sumsel == false) &&
        (is_applicant_current_city_in_sumsel == false) &&
        (is_shipping_to_sumsel == true)
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspected Shipping Address Fraud;SuspectFraud;ShippingAddress";
        } else {
            return "BLOCK;Suspected Shipping Address Fraud;SuspectFraud";
        }
    }

    if (
        ((stringUtils.contains(shippingAddressStreet.toLowerCase(), 'pusat grosir cililitan (pgc)')) /*Pusat Grosir Cililitan (PGC)*/
        || (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'cililitan'))) /* cililitan */
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspicious Address;SuspectFraud;PGC";
        } else {
            return "BLOCK;Suspicious Address;SuspectFraud;PGC";
        }
    }
}

if (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME") {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION && (adjusted_limit_utilization >= 0.8) && (is_tiket_flight_transaction) && (sumTotalPayment <= 0) && (transactionAmount >= 500000)
        && (
        ((address_is_current_address == 'ya') && ((stringUtils.contains(applicant_residence_city.toLowerCase(), 'jakarta')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'bekasi')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'tangerang')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'bogor')) || (stringUtils.contains(applicant_residence_city.toLowerCase(), 'depok'))))
        || ((address_is_current_address == 'tidak') && ((stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'jakarta')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'bekasi')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'tangerang')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'bogor')) || (stringUtils.contains(applicant_current_residence_city.toLowerCase(), 'depok'))))
            )
    ) {
        return "SUSPICIOUS;Suspicious Tiket Transaction;SuspectFraud;Suspect Malahayati";
    }
}

var median_item_prices = offlineFeatures['trxMedianItemPrices'] == null ? 0 : offlineFeatures['trxMedianItemPrices'];

// return median_price
if ((creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME") && (is_tiket_flight_transaction == true)){
    var is_price_higher_than_median = false;

    for (itemName : itemPrices.keySet()) {
        var price = itemPrices.get(itemName);
        var lowerItem = itemName.toLowerCase();

        for (item : median_item_prices) {
            if (stringUtils.contains(lowerItem, item['itemNames'].toLowerCase())) {
                if (item['medianItemPrice'] > 0){
                    if (price * 1.0 /  item['medianItemPrice'] >= 2.5) {
                        is_price_higher_than_median = true;
                        break;
                    }
                }
            } 
        }

        if (is_price_higher_than_median == true) {
            break;
        }
    }

    if ((is_price_higher_than_median == true)
    && sumPaymentTiketBeforeTrx <= 0) {
        if (((day_diff_trx_to_last_cash_approve >= 0 && day_diff_trx_to_last_cash_approve <= 3) || hasNonLimitActiveCashLoanContract == true)){
            if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
                return "SUSPICIOUS;Tiket Active Cash Transact Flight Amount >= 2.5x Normal Price;SuspectFraud;AnomalyAmount";
            } else {
                return "REJECT;Tiket Active Cash Transact Flight Amount >= 2.5x Normal Price;SuspectFraud";
            }
        } else if (new_user_flag == 'new'
            && (day_diff_trx_to_last_cash_approve < 0 || day_diff_trx_to_last_cash_approve > 3) 
            && hasNonLimitActiveCashLoanContract == false
            && (!stringUtils.contains(flight_route_match.toLowerCase(), 'multiple trip')) 
            && (flight_match_id_living_working_birth_city_tiket == 0)){
            if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
                return "SUSPICIOUS;Tiket New User Transact Flight Not Match Amount >= 2.5x Normal Price No Active Cash;SuspectFraud;AnomalyAmount";
            } else {
                return "REJECT;Tiket New User Transact Flight Not Match Amount >= 2.5x Normal Price No Active Cash;SuspectFraud";
            }
        }
    }
}

/* ------------- LOGIC - transaction category -------------*/
var trx_category = 'other';
var null_parameters = '';

/* ------------- BLIBLI -------------*/
if (creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {
    if ((size(scoringFeature) == 0) || (size(featureScoresByFeatureName) == 0)) {
        trx_category = 'cannot be categorized - contain null parameter';
        if (size(scoringFeature) == 0){
            null_parameters += 'scoringFeature';
        }
        if (size(featureScoresByFeatureName) == 0){
            null_parameters += ',featureScoresByFeatureName';
        }
    }
}
/* ------------- TIKET -------------*/
if (creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME") {
    if ((size(scoringFeature) == 0) || (size(featureScoresByFeatureName) == 0)) {
        trx_category = 'cannot be categorized - contain null parameter';
        if (size(scoringFeature) == 0){
            null_parameters += 'scoringFeature';
        }
        if (size(featureScoresByFeatureName) == 0){
            null_parameters += ',featureScoresByFeatureName';
        }
    }
}
/* ------------- INDODANA -------------*/
if (creditLimitAccountScheme == "INDODANA_GENERIC_SCHEME") {
    if ((size(scoringFeature) == 0) || (size(featureScoresByFeatureName) == 0)) {
        trx_category = 'cannot be categorized - contain null parameter';
        if (size(scoringFeature) == 0){
            null_parameters += 'scoringFeature';
        }
        if (size(featureScoresByFeatureName) == 0){
            null_parameters += ',featureScoresByFeatureName';
        }
    } else if (
        (number_of_installed_loan_apps_within14days_rescore > 2)
        && (adjusted_limit_utilization > 0.7)
        && (max_diff_transaction_creation_to_submit >= 0)
        && (max_diff_transaction_creation_to_submit <= 168)
    ) {
        trx_category = 'bad installed loan apps 14d';
    } else if (
        (number_of_installed_loan_apps_within14days_rescore == 2)
        && (trx_score < 420)
        && (max_diff_transaction_creation_to_submit >= 0)
        && (max_diff_transaction_creation_to_submit <= 168)
    ) {
        trx_category = 'bad installed loan apps 14d';
    } else if (
        (number_of_installed_loan_apps_within14days_rescore > 2)
        && (adjusted_limit_utilization > 0.5)
        && (max_diff_transaction_creation_to_submit >= 0)
        && (max_diff_transaction_creation_to_submit <= 168)
    ) {
        trx_category = 'bad installed loan apps 14d - for online trx';
    }
}      

/* --------------------------*/
var experiment_code = abTestingHelper.getVariation(entityId, 'AUTO_APPROVE_RULE_ENGINE_EXPERIMENT', '-999');

trx_score = trx_score.toString();
var message = ('trx_additional_info'+';'+entityId+';'+purchaseTransactionId+';'+trx_score+';'+trx_category+';'+rule_pefindo+';'+total_limit_usage+';'+experiment_code+';'+day+';'+hour+';'+amount_1mo_to_limit_ratio+';'+amount_1mo_to_limit_ratio_limit_equals_exposure_combined+';'+count_active_cash_loan+';'+max_multiplier+';'+null_parameters+';'+is_liveness_not_match+';'+tiket_blibli_transaction_model_ab_test+';'+va_transaction_model_ab_test);
log.info(message);

/* ---------------------------- BLACKLIST AND FRAUD RULE ---------------------------- */
if (stringUtils.contains(userEmail, 'hi2.in')) {
    return 'BLOCK;Fraud Email;BlacklistedUser';
}

if ((transactionAmount > 105000) && !(merchantName == 'Tiket Paylater') && !(merchantName == 'E-Wallet by Cermati')) {
    for (item: FRAUD_ITEM_NAMES) {
        if (stringUtils.contains(lowerCaseItemNames, item)) {
            return `BLOCK;Item Name Contains Keyword ${item};BlacklistedItem`;
        }
    }     
}

if (merchantName == 'Itemku' || merchantName == 'BUKALAPAK Marketplace') {
    for (item: FRAUD_ITEM_NAMES) {
        if(stringUtils.contains(lowerCaseItemNames, item)) {
            return `BLOCK;Item Name Contains Keyword ${item};BlacklistedItem`;
        }
    }
}

/* ------------ Blibli Motor Listrik Block -------------*/
if (merchantName == 'Blibli Paylater' && stringUtils.contains(lowerCaseItemNames, 'motor listrik')) {
    return 'BLOCK;Blibli Motor Listrik;BlacklistedItem';
}

/* ------------ Blibli Motorcycle and Car Block -------------*/
if (merchantName == 'Blibli Paylater' && transactionAmount > 4000000) {
  for (itemCategory : itemCategories) {
    var itemCategorySanitized = stringUtils.upperCase(itemCategory);

    if (stringUtils.contains(itemCategorySanitized, 'OT-1000009')) {
      if (stringUtils.contains(itemCategorySanitized, 'MO-1000027')) {
        return 'BLOCK;Blibli Motorcycle Item;BlacklistedItem';
      } 
      else if (stringUtils.contains(itemCategorySanitized, 'MO-1000062')) {
        return 'BLOCK;Blibli Car Item;BlacklistedItem';
      }
    }
  }
}

/* ------------[Dekoruma Rule] Dekoruma Rule Reject Change Store Before X Period -------------*/
/*Context: Lock Dekoruma Origination and prevent change store before 60 days */
if (is_offline_dekoruma_origination == true && is_offline_dekoruma_transaction == false && max_diff_transaction_creation_to_submit >= 0 && max_diff_transaction_creation_to_submit <= 1440) {
    return 'REJECT;Offline Dekoruma Origination Change Store Attempt;OfflineDekorumaOriginationChangeStoreAttempt';
}
if ((userId == 'e99ca96d-6a7e-4102-adfe-8d295d575ac9' || masterUserId == 'e99ca96d-6a7e-4102-adfe-8d295d575ac9') && is_offline_dekoruma_transaction == false) {
    return 'REJECT;Offline Dekoruma Origination Change Store Attempt;OfflineDekorumaOriginationChangeStoreAttempt';
}
/* ------------[Dekoruma Rule] Dekoruma Rule Reject Utilization 30Mio In Non Dekoruma Merchant*/
if (is_offline_dekoruma_origination == true && is_offline_dekoruma_transaction == false && max_diff_transaction_creation_to_submit > 1440 && total_limit_usage >= 30000000) {
    return 'REJECT;Offline Dekoruma Origination Attempt Utilize 30Mio In Other Merchant;OfflineDekorumaOriginationAttemptUtilize30MioInOtherMerchant';
}
/* ------------[Offline Rule] Fraud Shipping Address Block -------------*/
if (is_offline_transaction == true) {
    if (stringUtils.contains(shippingAddressStreet.toLowerCase(), 'griya batu aji asri blok g no. 14')) {
        return 'BLOCK;Offline Fraud Shipping Addresss;OfflineAddressFraudBlock';
    }
}

/* ------------[Offline Rule] Fraud Agent Reject-------------*/
if ((is_agent_fraud_application == true) || (is_agent_fraud_trx == true)) {
    return 'BLOCK;Offline Agent Fraud;OfflineAgentFraudBlock';
}

/* ------------[Offline Rule] Offline Medan Fraud Block -------------
if ((is_medan_fraud_application == true)) {
    return 'BLOCK;Offline Medan Fraud;OfflineMedanFraudBlock';
}
*/
/* ------------[Offline Rule] Offline Auto EV Fraud Block -------------*/
if ((is_ebike_fraud_application == true)|| (is_ebike_fraud_trx == true)) {
    return 'BLOCK;Offline Ebike Fraud;OfflineEbikeFraudBlock';
}

/* ------------[Offline Rule] Offline Others Fraud Block -------------*/
if ((is_other_fraud_application == true) || (is_others_fraud_trx == true)) {
    return 'BLOCK;Offline Others Fraud;OfflineOthersFraudBlock';
}

/* ------------[Offline Rule] All Origination --> Offline Transaction and ever suspect fraud-------------*/
if ((creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') && (is_offline_transaction == true) && (count_prev_suspect_fraud > 0)) {
    return 'BLOCK;Offline Transaction ever suspect fraud;OfflineEverSuspectFraudBlock';
}

/* ------------[Offline Rule] Offline Reject Motor Listrik (for Non Motor Listrik Merchant) -------------*/
if ((is_restricted_item == true && !is_motor_listrik_merchant)) {
    return 'REJECT;Offline Motor Listrik In Non Motor Listrik Merchant;OfflineMotorListrikInNonMotorListrikMerchant';
}

/* ------------[Offline Rule] Offline Reject SBC Berkah Bersama specific not supported item -------------*/
if (is_sbc_restricted_item == true) {
return 'REJECT;Offline Reject SBC Not Supported Item Category;OfflineRejectNotSupportedItemSBC';
}

/* ------------[Offline Rule] Offline Reject 1++ Motor Listrik in one bill-------------*/
if (is_motor_listrik_merchant && count_item_type_motor_listrik>=2) {
    return 'REJECT;Offline Reject More Than 1 Motor Listrik In One Bill;OfflineRejectMoreThan1MotorListrikInOneBill';
}

/* ------------[Offline Rule] Offline Reject Motor Listrik With Other Financing -------------*/
if (is_motor_listrik_merchant && count_item_type_motor_listrik==1 && count_item_type_non_motor_listrik>=1) {
    return 'REJECT;Offline Reject Motor Listrik With Other Financing;OfflineRejectMotorListrikWithOtherFinancing';
}

/* ------------[Offline Rule] Offline Reject Ever Purchase Motor Listrik Last 30 Day -------------*/
/* ever purchase motor listrik + currently purchase motor listrik */
if (count_motor_listrik_purchased_30d>=1 && count_item_type_motor_listrik>=1) {
    return 'REJECT;Offline Reject Ever Purchase Motor Listrik Last 30 Day;OfflineRejectEverPurchaseMotorListrikLast30Day';
}

/* ------------[Offline Rule] Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone -------------*/
/* ever purchase motor listrik and smartphone + currently purchase smartphone again */
if (count_motor_listrik_purchased_30d>=1 && count_smartphone_purchased_30d>=1 && count_item_type_smartphone>=1) {
    return 'REJECT;Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone;OfflineRejectEverPurchaseMotorListrikWithAttemptPurchase2Smartphone';
}

/* ------------[Offline Rule] Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone -------------*/
/* ever purchase motor listrik + currently purchase 2 smartphone in 1 bill again */
if (count_motor_listrik_purchased_30d>=1 && count_item_type_smartphone>=2) {
    return 'REJECT;Offline Reject Ever Purchase Motor Listrik With Attempt Purchase 2 Smartphone;OfflineRejectEverPurchaseMotorListrikWithAttemptPurchase2Smartphone';
}

/* ------------[Offline Rule] Offline Reject Change Item to E-Bike -------------*/
    /*Reduce Blockrate for those who hv no transaction after X period */
    /*By pass this rule if not making transaction (which means always sumPayment always 0) and pass 60days after submit */
    /*Add max_diff_transaction_creation_to_submit<=-99 due to 2022 data was not backfilled and have no transaction before */
    /* if max_diff_transaction_creation_to_submit in between 1 to 720 */
if ((max_diff_transaction_creation_to_submit > 0) && max_diff_transaction_creation_to_submit <= 720) {
    if (count_unique_month_paid_before_trx<=0) {
        if (is_prj_merchants == false){
            if (is_change_item_to_ebike == true) {
                return 'REJECT;Offline Change Ebike Within 30 Days;OfflineChangeEBikeReject';
            } 
        }
    }       
}

/* ------------[Offline Rule] Offline Reject Gadget on Selected Merchant -------------*/
if (is_merchant_non_gadget_trx == true) {
    if (count_item_type_gadget >= 1) {
        return 'REJECT;Offline Selected Merchant non-Gadget;OfflineMerchantNonGadget';
    }
}

/* ------------[Offline Rule] Offline initial transaction store in Ibox but transacting in other store (Tagging Suspect Fraud)-------------*/
if (
    (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME')
    && (stringUtils.contains(initial_store_name.toUpperCase(), 'IBOX')) /* initial transaction store is ibox*/
    && !(stringUtils.contains(merchantName.toUpperCase(), 'IBOX')) && !(stringUtils.contains(merchantName.toUpperCase(), 'FOKUS SOLUSI PROTEKSI')) /* current transaction store is not ibox and not insurance*/
    && !(stringUtils.contains(previous_purchases_merchants.toUpperCase(), 'IBOX')) /* no previous successful ibox transactions*/
    && (max_diff_transaction_creation_to_submit >= 0) & (max_diff_transaction_creation_to_submit <= 720) /* current transactions happened within 30d after submit*/
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && (transactionAmount >= 2000000) && ALLOW_SUSPICIOUS_TRANSACTION) {
            return "SUSPICIOUS;Suspect Fraud IBOX;SuspectFraud;Suspect Fraud IBOX";
        }
}

/* ------------ [Offline Rule] Tiket Origination Offline Transaction (<=24h)------------*/
if ((product_type == "CREDIT_LIMIT") && (partner == "TIKET") && (is_offline_transaction == true) && (max_diff_transaction_creation_to_submit <= 24)){
    return "REJECT;Offline Transaction <=24h After Tiket Submission;OfflineTransaction24hAfterTiketSubmission"
}

/* ------------[Offline Rule] Offline Pilot Higher Pricing Block Online Trx First 60days-------------*/
var is_additional_approval_mp_cde = 
whitelistedResults != null && blacklistHelper.isWhitelistedBulkCheck('users', 'offline-mp-higher-rate-cde', {"userId": masterUserId}, whitelistedResults);

var is_mandatory_dp_additional_approval_mp_cde = 
whitelistedResults != null && blacklistHelper.isWhitelistedBulkCheck('users', 'mandatory-dp-offline-mp-higher-rate-cde', {"userId": masterUserId}, whitelistedResults);



if (is_additional_approval_mp_cde || is_mandatory_dp_additional_approval_mp_cde) {
    if ((is_offline_transaction == false) && (is_insurance_merchant == false) && (transactionAmount > 1000000) && (max_diff_transaction_creation_to_submit >= 0 && max_diff_transaction_creation_to_submit <= 1440)) {
        return 'REJECT;Pilot Higher Pricing Population Not Allowed Online Transaction First 2 Month;PilotHigherPricingPopulationNotAllowedOnlineTransactionFirst2Month'; 
    }
}       


/* ------------[Offline Rule] Offline Mandatory DP Block Online Trx First 60days-------------*/
var submit_traditional_eligible_promo = 
    whitelistedResults != null && blacklistHelper.isWhitelistedBulkCheck('users', 'traditional-mp-eligible-promo', {"userId": masterUserId}, whitelistedResults);

var submit_traditional_mandatory_dp_no_promo = 
    whitelistedResults != null && blacklistHelper.isWhitelistedBulkCheck('users', 'traditional-mandatory-dp-offline-mp', {"userId": masterUserId}, whitelistedResults);;



if (submit_traditional_mandatory_dp_no_promo || submit_traditional_eligible_promo) {
    if ((is_offline_transaction == false) && (is_insurance_merchant == false) && (transactionAmount > 1000000) && (max_diff_transaction_creation_to_submit >= 0 && max_diff_transaction_creation_to_submit <= 1440)) {
        return 'REJECT;Pilot Mandatory DP Population Not Allowed Online Transaction First 2 Month;PilotMandatoryDpPopulationNotAllowedOnlineTransactionFirst2Month'; 
    }
}  

    /* Dump these BLIBLI to AF team */
if (
    (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME')
    && (identity_score < 440)
    && (transactionAmount >= 500000) 
    && (adjusted_limit_utilization > 0.8) 
    && (sumTotalPayment <= 0)
    && (max_partner_score > 0)
    && (phone_model_class == 'Iphone')
) {
    if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY') && ALLOW_SUSPICIOUS_TRANSACTION) {
        return "SUSPICIOUS;Suspect Fraud Blibli;SuspectFraud;Suspect Fraud Blibli";
    } else {
        return "REJECT;Suspect Fraud Blibli New Account Maxout Low Identity;LowTransactionScore";
    }
}

if (creditLimitAccountMaxDpd > 30) {
    return "REJECT;CLA Max DPD > 30;BadDpd";
}

var isPromoAbuser = blacklistHelper.isBlacklistedBulkCheck('phones', 'promo-abuse', { "phoneNumber": userPhoneNumber }, blacklistedResults);
var hasDiscount = partnerDiscountAmount > 30000; /*To handle shipping discount*/

if (stringUtils.contains(merchantName.toLowerCase(), 'tokopedia') & isPromoAbuser & hasDiscount & partnerDiscountAmount*100.0/(partnerDiscountAmount+transactionAmount) > 10.0){
    return "REJECT;User in Blacklist, Promo Abuser in Tokopedia;BlacklistedUser";
}

/* ------------------------------------------------------------------------------------ */

if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && transactionAmount < 500000) {
    if (isPulsaTransaction && count_pulsa_trx_30d > 10) {
        return "REJECT;Pulsa transaction count > 10 in last 30d;HighTransactionCount";
    }
    else if (
            creditLimitAccountScheme == "LINK_AJA_WHITELABEL_SCHEME" ||
            creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME" ||
            creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME" || 
            creditLimitAccountScheme == "BUKALAPAK_WHITELABEL_SCHEME" ||
            creditLimitAccountScheme == "MITRA_BLIBLI_WHITELABEL_SCHEME"
    ) {
        return "NORMAL;Whitelabel Scheme";
    } else {
        return "NORMAL;Safe Transaction";
    }
}

if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME') {
    if (ALFAMART_LIST.contains(merchantName)) {
        if (transactionAmount >= 500000) {
            return "REJECT;Alfamart transaction amount >= 500k;HighTransactionAmount";
        }
    }
}
/********************************************************/ 
/******************** INDODANA OFFLINE ******************/
/********************************************************/

if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME' && is_offline_transaction) {

    if (hasNonLimitActiveCashLoanContract) {
        if ((!is_silverlist) /* non silverlist */
                || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467)) /* silverlist A7 non offline */
                || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
        ) {
            return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
            
        
        }
    }

    /* disabling this rule due to unsure effect because of the shared limit changes
    if (
        (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME' || creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME" || creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME")
        && merchantName != 'PT Fokus Solusi Proteksi'    
    ) {
        if ((countOfMaxedOutLimit70 > 1) && (sumTotalPayment < 100000)) {
            return "BLOCK;Maxed Out Multiple Limit, No Payment;MaxedOutUsage";
        }
        if ((countOfMaxedOutLimit70 > 0) && (sumTotalPayment < 100000) && (bucketizedCreditLimitAccountLimitBalance >= bucketizedCreditLimitAccountLimit * 0.3)) {
            return "REJECT;Maxed Out Limit, No Payment, Transacting in Other CLI;MaxedOutUsage";
        }
    }
    */

    /* ------------[Offline Rule] Handler for Change Item Category: Non-MP to MP + Max out 85%-------------*/
    if ((is_offline_origination == true) && (is_insurance_merchant == false)) {

        /*Reduce Blockrate for those who hv no transaction after X period */
        /*By pass this rule if not making transaction (which means always sumPayment always 0) and pass 60days after submit */
        /*Add max_diff_transaction_creation_to_submit<=-99 due to 2022 data was not backfilled and have no transaction before */
        if (max_diff_transaction_creation_to_submit <= 1440 && (max_diff_transaction_creation_to_submit> -99 || days_since_last_trx > -99)) {
            if (sumTotalPayment == -1) { /*Null handler logic if sumTotalPayment is null */
                if (adjusted_limit_utilization >=0.85 && prevCliPaidInstallmentAvg <= 0 && offline_item_category != 'smartphone' && count_item_type_smartphone >= 1) {
                    return 'BLOCK;Offline Change non-MP to MP + max out 85%;OfflineAttemptChangeItemCategory';
                }
            } else {
                if (adjusted_limit_utilization >=0.85 && sumTotalPayment < 500000 && offline_item_category != 'smartphone' && count_item_type_smartphone >= 1) {
                    return 'BLOCK;Offline Change non-MP to MP + max out 85%;OfflineAttemptChangeItemCategory';                
                }
            }
        }

    }

    /* ------------[Offline Rule] All Origination --> Offline Transaction with more than 3 Item above 1 Mio-------------*/
    if ((is_insurance_merchant == false) ) {
        if (sumTotalPayment < 1000000) {
            if (count_item_type_smartphone >= 3) {
                return 'BLOCK;Offline Transaction Attempt to Purchase More than 3 MP;OfflineAttemptPurchaseMultipleItem';
            }   
        }
    }

    /* ------------[Offline Rule] All Origination --> Offline Transaction with more than 2 Item above 1 Mio-------------*/
    if ((is_insurance_merchant == false) ) {
        if (sumTotalPayment < 1000000) {
            if (count_item_type_smartphone >= 2) {
                return 'REJECT;Offline Transaction Attempt to Purchase 2 MP;OfflineAttemptPurchaseMultipleItem';
            }   
        }
    }

    /* ------------[Offline Rule] Requesting Whitelisted Item and Purchasing Non Whitelisted Item (Reject Change Item Suspicious Behaviour)-------------*/
    if ((is_offline_origination == true) && (offline_item_category == 'smartphone') && (is_insurance_merchant == false) && (is_prj_merchants == false)) { 

        /*Reduce Blockrate for those who hv no transaction after X period */
        /*By pass this rule if not making transaction (which means always sumPayment always 0) and pass 60days after submit */
        /*Add max_diff_transaction_creation_to_submit<=-99 due to 2022 data was not backfilled and have no transaction before */
        if (max_diff_transaction_creation_to_submit <= 1440 && (max_diff_transaction_creation_to_submit> -99 || days_since_last_trx > -99)) {
            /* Rule Logic
            Pass  : Whitelisted item --> Whitelisted Item
            Pass  : Whitelisted item --> Non-whitelisted Item <=13Mio
            Pass  : Whitelisted item --> Non-whitelisted Item >13Mio + ever make min. Payment >=500.000
            Reject: Whitelisted item --> Non-whitelisted Item >13Mio + never have payment
            */
            if ((sumTotalPayment < 500000) && (transactionAmount > 13000000) ) {
                /*Request Whitelisted Item --> Purchase Whitelist Item */
                if ((is_requested_item_offline_whitelisted_item == true) && (is_current_item_offline_whitelisted_item == false)) {
                    return 'REJECT;Requested Offline Whitelist item, transacted different item;DifferentItemName';
                } 
            }
        }
    }

    /* ------------[Offline Rule] Handler for Change Store: Non-Bad to Bad Store-------------*/
    if ((is_offline_origination == true) && (is_insurance_merchant == false)) {
        if (sumTotalPayment < 500000 && is_initial_bad_store == false && is_current_bad_store == true) {
            if (adjusted_limit_utilization >=0.5  || total_limit_usage >= 13000000){
                return 'BLOCK;Offline Transaction Non Bad to Bad Store;OfflineAttemptChangeStoreCategory';
            }
        }
    }

    /* ------------[Offline Rule] Limit QR Transaction to 1 Mio on Selected Merchants-------------*/
    for (qr_store: QR_MERCHANT_ONE_MIO) {
        if((is_insurance_merchant == false) && (is_offline_transaction_with_agent == false) && (transactionAmount > 1000000) && stringUtils.contains(merchantName.toLowerCase(), qr_store)) {
            return 'REJECT;QR Payment Exceed Maximum Amount of 1 Mio;OfflineAttemptQR1Mio';
        }
    }

    /* ------------[Offline Rule] Limit QR Transaction to 2 Mio on Selected Merchants-------------*/
    for (qr_store: QR_MERCHANT_TWO_MIO) {
        if((is_insurance_merchant == false) && (is_offline_transaction_with_agent == false) && (transactionAmount > 2000000) && stringUtils.contains(merchantName.toLowerCase(), qr_store)) {
            return 'REJECT;QR Payment Exceed Maximum Amount of 2 Mio;OfflineAttemptQR2Mio';
        }
    }
    
    /* ------------[Offline Rule] Limit QR Transaction to 5 Mio on Selected Merchants-------------*/
    for (qr_store: QR_MERCHANT_FIVE_MIO) {
        if((is_insurance_merchant == false) && (is_offline_transaction_with_agent == false) && (transactionAmount > 5000000) && stringUtils.contains(merchantName.toLowerCase(), qr_store)) {
            return 'REJECT;QR Payment Exceed Maximum Amount of 5 Mio;OfflineAttemptQR5Mio';
        }
    }

    /* ------------[Offline Rule] Cap all oriskin to 20Mio -------------*/
    if((is_insurance_merchant == false) && (transactionAmount > 20000000) && stringUtils.contains(merchantName.toLowerCase(), 'oriskin')) {
        return 'REJECT;Amount Exceeds Max Allowed Limit of 20 Mio;OfflineMaxAmount20Mio';
    }

          /* ------------[Offline Rule] Reject Transaction if mandatory handover merchants using QR Payment-------------*/
    for (not_allow_qr_payment: MANDATORY_HANDOVER_MERCHANT) {
        if((is_insurance_merchant == false) && (is_offline_transaction_with_agent == false) && stringUtils.contains(merchantName.toLowerCase(), not_allow_qr_payment)) {
            return 'REJECT;QR Payment is not Allowed;OfflineQRNotAllowed';
        }
    }

    if (offline_transaction_applied_amount < 0) { /* additional rule for online origination */
            if (trx_category == 'bad installed loan apps 14d') {
                return "BLOCK;Bad installed loan apps 14d;InstalledApps"; 
        } 
    }


    /* ------------[Offline Rule] Offline transaction buying more than 2 handphone in last 30 days and having offline transaction score <= 362*/
    if ((is_offline_transaction == true) && (is_insurance_merchant == false) ) {
        if (offline_transaction_scoring_202602 <=362 && count_smartphone_purchased_30d >=1 && transactionAmount > 1000000 ) {
            return 'REJECT;Offline Transaction Low Score More Than 1 Phone in 30 Days;OfflineAttemptMultipleMPLowScore';
        }
    }
}
/* turn this off as there are no more cases where there are no liveness test on Tiket
    if (
    (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME')
    && (identity_score < 480)
    && (transactionAmount >= 1000000) 
    && (adjusted_limit_utilization > 0.8) 
    && (sumTotalPayment <= 0) 
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY')) {
            return "SUSPICIOUS;Suspect Fraud Tiket;SuspectFraud";
        } else {
            return "REJECT;Suspect Fraud Tiket New Account Maxout Low Identity;LowTransactionScore";
        }
} */

/********************************************************/ 
/********************* INDODANA ONLINE ******************/
/********************************************************/

if (creditLimitAccountScheme == 'INDODANA_GENERIC_SCHEME' && is_offline_transaction == false) {
    var percentage_trx_amount_from_va_payment = -9999.00;
    if (sumPaymentVaBeforeTrx > 0){
        percentage_trx_amount_from_va_payment = transactionAmount/sumPaymentVaBeforeTrx*1.00;
    }

    if (hasNonLimitActiveCashLoanContract) {
        if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && (va_transaction_model_ab_test == 'VA_TRANSACTION_MODEL_NEW')){
            if ((!is_silverlist) /* non silverlist */
                        || ((is_silverlist) && (is_offline_transaction == false) && (trx_score <= 340)) /*swap RG with trx score*/
            ) {
                if ((is_good_merchant_online == true) && trx_score < 460) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if (is_good_merchant_online == false) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
            }
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'E-WALLET BY CERMATI'))) {
            if ((!is_silverlist) /* non silverlist */
                        || ((is_silverlist) && (is_offline_transaction == false) && (trx_score < 465)) /*swap RG with trx score*/
            ) {
                return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
            }
        } else {
            if ((!is_silverlist) /* non silverlist */
                        || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467) /* silverlist A7 non offline */
                            && (stringUtils.contains(lowerCaseItemNames, 'barang elektronik') || sumPaymentVaBeforeTrx <= 0 || (!stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')))) /*relax VA fashion & has payment*/
                        || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
            ) {
                if ((is_good_merchant_online == true) && trx_score < 460) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if (is_good_merchant_online == false) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
            }
        }
    }
    
    var pulsaKeywords = [
        'Telkomsel Rp', 'Pulsa Telkomsel', 'PULSA REGULER TELKOMSEL',
        'PULSA TELKOMSEL', 'TELKOMSEL_BEST_PACKAGE', 'TELKOMSEL - TELKOMSEL',
        'TRANSFER PULSA', 'telkomsel', 'Axiata XL', 'XL Rp', 'Indosat Ooredoo',
        'Indosat Rp', 'Pulsa Indosat', 'Top Up - Pulsa', 'Pulsa Transfer',
        'Axis Rp', 'Smartfren Rp', 'Tri Rp', 'UPGC'
    ];
    var totalPulsaPrice = 0;
    var totalPLNPrice = 0;
    for (itemName : itemPrices.keySet()) {
        var price = itemPrices.get(itemName);
        var lowerItem = itemName.toLowerCase();

        for (pulsaName : pulsaKeywords) {
            if (lowerItem.contains(pulsaName.toLowerCase())) {
                totalPulsaPrice = totalPulsaPrice + price;
                break;
            }
        }
        if(stringUtils.contains(lowerItem, "pln")){
            totalPLNPrice = totalPLNPrice + price;
        }
    }

    if ((isPulsaTransaction)) {
        if (sum_pulsa_trx_30d != null && !stringUtils.contains(lowerCaseItemNames, 'telkomsel halo')) {
            if (sum_pulsa_trx_30d > 400000 && riskGradeOfflineScore < 500) {
                return "REJECT;Cumulative Monthly Pulsa > 400000;HighTransactionAmount";
            } else if (sum_pulsa_trx_30d > 2000000 && riskGradeOfflineScore >= 500) {
                return "REJECT;Cumulative Monthly Pulsa > 2mio for high offline score;HighTransactionAmount";
            }
        } 
        
        if(!stringUtils.contains(merchantOrderId, 'BILL-')){
            if (transactionAmount > 500000) {
                return "REJECT;Pulsa transaction amount > 500k;HighTransactionAmount";
            }
        } else {
            if (totalPulsaPrice > 500000) {
                return "REJECT;Pulsa transaction amount > 500k;HighTransactionAmount";
            }
        }
    }

      /* PLN Postpaid Fraud Rule */
    if ((merchantName == 'Digital Products by Cermati') && (stringUtils.contains(lowerCaseItemNames, "pln"))) {
        if(!stringUtils.contains(merchantOrderId, 'BILL-')){
            if (riskGrade == 'A-' && transactionAmount > 5000000) {
                return "REJECT;PLN transaction amount > 5 Mio;HighTransactionAmount";
            } else if (riskGrade != 'A-' && riskGrade != 'A+' && transactionAmount > 2000000) {
                return "REJECT;PLN transaction amount > 2 Mio;HighTransactionAmount";
            } else if (sum_pln_trx_6h > 5000000) {
                return "REJECT;PLN Postpaid cumulative PLN in last 6 hours > 5 Mio;HighTransactionAmount";
            }
        } else {
            if (riskGrade == 'A-' && totalPLNPrice > 5000000) {
                return "REJECT;PLN transaction amount > 5 Mio;HighTransactionAmount";
            } else if (riskGrade != 'A-' && riskGrade != 'A+' && totalPLNPrice > 2000000) {
                return "REJECT;PLN transaction amount > 2 Mio;HighTransactionAmount";
            } else if (sum_pln_trx_6h > 5000000) {
                return "REJECT;PLN Postpaid cumulative PLN in last 6 hours > 5 Mio;HighTransactionAmount";
            }
        }
    }

    /* ------------[Offline Rule] Offline origination and not transacting in offline store-------------*/
    if ((is_offline_origination == true) && (is_insurance_merchant == false)) {
        /* ------------Offline origination and not transacting in offline store with no payment history (Prevent Online Max Out)-------------*/
        if ((adjusted_limit_utilization >=0.5) && (sumTotalPayment < 500000) && (total_limit_usage >= 13000000)) {
            return 'REJECT;Offline Origination Attempt to Maxout Online;OfflineAttemptMaxoutOnline';
        } 
        /* ------------ALDI offline->non offline, no payment, and max out within 30d (Fraud prevention)-------------*/
        else if (
            (offline_item_names == 'Offline Transaction') /*ALDI*/
            && (sumTotalPayment <= 0) /*No payment*/
            && (adjusted_limit_utilization >= 0.7) /*Max out*/
            && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 720) /*Within 30d*/
        ) {
            return 'BLOCK;Offline to Online No Payment and Max Out Within 30d;OfflineAttemptMaxoutOnline';
        }
    }

    var ONLINE_MERCHANTS_INDODANA = [
        "TOKOPEDIA",
        "BELANJA DI TOKOPEDIA",
        "BUKALAPAK MARKETPLACE",
        "DIGITAL PRODUCTS BY CERMATI",
        "E-WALLET BY CERMATI"
    ];  

    /********************************************************/ 
    /*************************** VA *************************/
    /********************************************************/

    if (ONLINE_MERCHANTS_INDODANA.contains(merchantName.toUpperCase()) || (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI '))){
        if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI ')) && (va_transaction_model_ab_test == 'VA_TRANSACTION_MODEL_NEW')){

            // FEATURE CALCULATION
            var trx_category = 'other';
            var null_parameters = '';

            /* ------------- INDODANA -------------*/
            if ((size(scoringFeature) == 0) || (size(featureScoresByFeatureName) == 0)) {
                trx_category = 'cannot be categorized - contain null parameter';
                if (size(scoringFeature) == 0){
                null_parameters += 'scoringFeature';
                }
                if (size(featureScoresByFeatureName) == 0){
                    null_parameters += ',featureScoresByFeatureName';
                }
            } else if (
                (number_of_installed_loan_apps_within14days_rescore > 2)
                && (adjusted_limit_utilization > 0.7)
                && (max_diff_transaction_creation_to_submit >= 0)
                && (max_diff_transaction_creation_to_submit <= 168)
            ) {
                trx_category = 'bad installed loan apps 14d';
            } else if (
                (number_of_installed_loan_apps_within14days_rescore == 2)
                && (trx_score < 310)
                && (max_diff_transaction_creation_to_submit >= 0)
                && (max_diff_transaction_creation_to_submit <= 168)
            ) {
                trx_category = 'bad installed loan apps 14d';
            } else if (
                (number_of_installed_loan_apps_within14days_rescore > 2)
                && (adjusted_limit_utilization > 0.5)
                && (max_diff_transaction_creation_to_submit >= 0)
                && (max_diff_transaction_creation_to_submit <= 168)
            ) {
                trx_category = 'bad installed loan apps 14d - for online trx';
            }

            // RULE
            if ((trx_category == 'bad installed loan apps 14d') || (trx_category == 'bad installed loan apps 14d - for online trx')) {
                return "BLOCK;Bad installed loan apps 14d;InstalledApps";
            } else if (trx_score < 335) {
                return "BLOCK;transaction score < 335;LowTransactionScore";
            } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
                return "BLOCK;offline score < 380;LowOfflineScore";
            } else if (
                (trx_score < 285)  
                && (discounted_sum_outstanding_late_1y_latest > 0)
            ) {
                return "BLOCK;transaction score < 285, latest FDC late;LowTransactionScore";
            } else if (
                (adjusted_limit_utilization >= 0.7)
                && (max_diff_transaction_creation_to_submit >= 0)
                && (max_diff_transaction_creation_to_submit <= 24)
                && (is_tokopedia == 'false')
            ) {
                return "BLOCK;limit utilization >= 0.7 within 24 hours after submit;HighLimitUtilization";
            } else if (
                (is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)
                && (transactionAmount > sumTotalPayment) && (transactionAmount > 15000000) 
                && (adjusted_limit_utilization > 0.9)
            ) {
                return "REJECT;CLI Offline Transact to VA > 15mio Max Out;OfflinetoVAMaxOut";
            } else if ((transactionAmount >= 15000000) && (trx_score) < 370) {
                return "BLOCK;Transact VA High Amount >= 15mio and Low Score < 370;LowTransactionScore";
            } else if ((hasNonLimitActiveCashLoanContract == true)) {
                if ((day_diff_trx_to_last_cash_disburse >= 0) && (day_diff_trx_to_last_cash_disburse <= 3)) {
                    return "BLOCK;Transact VA Within 3 Days After Disburse Cash;UserHasActiveCashLoan";
                } else if ((is_va_same_phone_number==0) && (transactionAmount>=20000000)) {
                    return "BLOCK;Active Cash Transact VA High Amount >= 20mio to Different Phone Number;UserHasActiveCashLoan";
                } else if ((is_offline_origination == true) && (sumPaymentVaBeforeTrx<=0) && (adjusted_limit_utilization>=0.8)) {
                    return "BLOCK;Offline origination with active cash, no payment in VA and max out;UserHasActiveCashLoan";
                }
            } else if (hasNonLimitActiveCashLoanContract == false) {
                if ((adjusted_limit_utilization>0.9) && (fdcStatisticNumberOfInquiryId30d>10)) {
                    return "BLOCK;Transact VA Max Out > 90% and FDC Inquiry > 10;VAMaxOut";
                }
            }

            if (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TIKTOK') || stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI SHOPEE') || stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TOKOPEDIA')) {
                if (!is_whitelist_va) {
                    if (percentage_trx_amount_from_va_payment >= 2){
                        return "REJECT;VA Transaction >= 2x from Total VA Payment Before;VAOpenAllUserBad";
                    } else if (percentage_trx_amount_from_va_payment < 0 && transactionAmount > 2000000 && trx_score <= 370) {
                        return "REJECT;No Payment VA, Transact VA > 2mio, low score ;VAOpenAllUserBad";                
                    }
                }
            }
        } else {
            if ((trx_category == 'bad installed loan apps 14d') || (trx_category == 'bad installed loan apps 14d - for online trx')) {
                return "BLOCK;Bad installed loan apps 14d;InstalledApps";
            } else if (trx_score < 390) {
                return "BLOCK;transaction score < 390;LowTransactionScore";
            } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
                return "BLOCK;offline score < 380;LowOfflineScore";
            } else if (
                (trx_score < 420) 
                && (stringUtils.contains(itemNames.toLowerCase(), 'handphone'))
                && (is_tokopedia == 'false')
                && (max_diff_transaction_creation_to_submit >= 0)
                && (max_diff_transaction_creation_to_submit <= 168)
            ) {
                return "BLOCK;transaction score < 420, transact within 7d, buy phone;LowTransactionScore";
            } else if (
                (trx_score < 420)  
                && (discounted_sum_outstanding_late_1y_latest > 0)
            ) {
                return "BLOCK;transaction score < 420, latest FDC late;LowTransactionScore";
            } else if (
                (adjusted_limit_utilization >= 0.7)
                && (max_diff_transaction_creation_to_submit >= 0)
                && (max_diff_transaction_creation_to_submit <= 24)
                && (is_tokopedia == 'false')
            ) {
                return "BLOCK;limit utilization >= 0.7 within 24 hours after submit;HighLimitUtilization";
            } else if (stringUtils.contains(merchantName.toUpperCase(), 'BUKALAPAK MARKETPLACE')) {
                if (trx_score < 480) {
                    return "BLOCK;Bukalapak marketplace transaction score < 480;LowTransactionScore";
                } else if (isMainApplication == false) {
                    return "BLOCK;Bukalapak marketplace from secondary limit;BukalapakSecondaryLimit";
                } 
            } else if (stringUtils.contains(merchantName.toUpperCase(), 'DIGITAL PRODUCTS BY CERMATI')) {
                if (trx_score < 420) {
                    return "BLOCK;Digital Products by Cermati transaction score < 420;LowTransactionScore";
                } else if ((trx_score < 480) && (discounted_sum_outstanding_late_1y_latest > 0)) {
                    return "BLOCK;Digital Products by Cermati late FDC transaction score < 480;LowTransactionScore";
                } 
            } else if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI '))) {
                if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)
                    && (transactionAmount > sumTotalPayment) && (transactionAmount > 15000000) 
                    && (adjusted_limit_utilization > 0.9)) {
                    return "REJECT;CLI Offline Transact to VA > 15mio Max Out;OfflinetoVAMaxOut";
                } else if ((transactionAmount >= 15000000) && (trx_score) < 480) {
                    return "BLOCK;Transact VA High Amount >= 15mio and Low Score < 480;LowTransactionScore";
                } else if ((hasNonLimitActiveCashLoanContract == true)) {
                    if ((day_diff_trx_to_last_cash_disburse >= 0) && (day_diff_trx_to_last_cash_disburse <= 3)) {
                        return "BLOCK;Transact VA Within 3 Days After Disburse Cash;UserHasActiveCashLoan";  
                    } else if ((is_va_same_phone_number==0) && (transactionAmount>=20000000)) {
                        return "BLOCK;Active Cash Transact VA High Amount >= 20mio to Different Phone Number;UserHasActiveCashLoan";
                    } else if ((is_offline_origination == true) && (sumPaymentVaBeforeTrx<=0) && (adjusted_limit_utilization>=0.8)) {
                        return "BLOCK;Offline origination with active cash, no payment in VA and max out;UserHasActiveCashLoan";
                    }
                } else if (hasNonLimitActiveCashLoanContract == false) {
                    if ((adjusted_limit_utilization>0.9) && (fdcStatisticNumberOfInquiryId30d>10)) {
                        return "BLOCK;Transact VA Max Out > 90% and FDC Inquiry > 10;VAMaxOut";
                    }
                }
            }
            if (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TIKTOK') || stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI SHOPEE') || stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TOKOPEDIA')) {
                if (!is_whitelist_va) {
                    if (percentage_trx_amount_from_va_payment >= 2){
                        return "REJECT;VA Transaction >= 2x from Total VA Payment Before;VAOpenAllUserBad";
                    } else if (percentage_trx_amount_from_va_payment < 0 && transactionAmount > 2000000 && trx_score <= 450) {
                        return "REJECT;No Payment VA, Transact VA > 2mio, low score ;VAOpenAllUserBad";
                    }
                }
            }
        }
    } else if (offline_transaction_applied_amount < 0) { /* additional rule for online origination */
        if (trx_category == 'bad installed loan apps 14d') {
            return "BLOCK;Bad installed loan apps 14d;InstalledApps";
        } 
    }

    if (!is_whitelist_va && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 720)) {
        if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI SHOPEE'))) {
            if (is_va_same_phone_number == 0) {
                return 'REJECT;Shopee New Users Trx 30d after Submit to Different Phone Number;VAOpenAllUserBad';
            } 
        } else if ((stringUtils.contains(merchantName.toUpperCase(), 'E-WALLET BY CERMATI'))) { 
            if (match_ewallet_topup_phonenumber == 0) {
                return 'REJECT;E-Wallet New Users Trx 30d after Submit to Different Phone Number;VAOpenAllUserBad';
            }
        }

        if ((stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI SHOPEE')) || (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TIKTOK')) || (stringUtils.contains(merchantName.toUpperCase(), 'BELANJA DI TOKOPEDIA'))) {
            if (sum_approved_va_shopee_tiktok_tokopedia_30d_before_trx + transactionAmount > 3000000) {
                return 'REJECT;Shopee New Users Trx 30d after Submit, Cumulative Approved Trx past 30d > 3mio;VAOpenAllUserBad';
            }
        }
    }
}

/********************************************************/ 
/************************* BLIBLI ***********************/
/********************************************************/
if (creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME") {
    if (tiket_blibli_transaction_model_ab_test == 'BLIBLI_TIKET_TRX_NEW_MODEL'){
        if (hasNonLimitActiveCashLoanContract) {
            if ((isMainApplication == false)) {
                if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (is_high_risk_items==true) && (trx_score<425)) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (is_high_risk_items==false) && (trx_score<405)) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
            } else if ((!is_silverlist) /* non silverlist */
                        || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467)) /* silverlist A7 non offline */
                        || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
            ) {
                if (is_high_risk_items==true) {
                    if (trx_score < 395) {
                        return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                    } else if ((trx_score < 415) && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                        return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                    }
                } else if (is_high_risk_items==false) {
                    if (trx_score < 375) {
                        return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                    } else if ((trx_score < 395) && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                        return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                    }
                }
            }
        }

        /* BLIBLI Reject Item Category */
        /* 1 phone */
        if (item_category_gladys == 'handphone') {
            if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && trx_score < 340) {
                return `BLOCK;transaction score < 340, RG A, buy phone;LowTransactionScore`;
            } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A')) && trx_score < 350) {
                return `BLOCK;transaction score < 350, buy phone;LowTransactionScore`;
            }
        }
        /* multiple phone */
        if (count_handphone_purchase_blibli > 1 && trx_score < 415) {
            return `BLOCK;transaction score < 415, buy multiple phone;LowTransactionScore`;
        }
        /* ------------[Offline Rule] Offline origination and not transacting in offline store-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)) {
            /* ------------ALDI offline->non offline, no payment, and max out within 30d (Fraud prevention)-------------*/
            if (
                (offline_item_names == 'Offline Transaction') /*ALDI*/
                && (sumTotalPayment <= 0) /*No payment*/
                && (adjusted_limit_utilization >= 0.7) /*Max out*/
                && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 720) /*Within 30d*/
            ) {
                return 'BLOCK;Offline to Online No Payment and Max Out Within 30d;OfflineAttemptMaxoutOnline';
            }
        }
            /* ------------[Offline Rule] Offline origination and not transacting in offline store with no payment history (Prevent Secondary Online Max Out)-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false) ) {
            if (adjusted_limit_utilization >=0.5 && sumTotalPayment < 500000 && total_limit_usage >= 8000000) {
                return 'REJECT;Offline Origination Attempt to Maxout Secondary Online;OfflineAttemptMaxoutSecondaryOnline';
            }
        }

        if (isMainApplication == true && trx_score < 330) {
            return "BLOCK;Blibli or Tiket transaction score < 330;LowTransactionScore";
        } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
            return "BLOCK;offline score < 380;LowOfflineScore";
        } else if ((isMainApplication == true) && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 6) && (adjusted_limit_utilization >= 0.8)) {
            return "BLOCK;Blibli Max Out >= 80% Within 6h After Submit;NewAccountMaxOut";
        } else if ((isMainApplication == false)) {
            if (trx_score < 345) {
                return "BLOCK;Secondary Blibli transaction score < 345;LowTransactionScore";
            }
            if ((max_diff_transaction_creation_to_submit >= 0) 
                && (max_diff_transaction_creation_to_submit <= 24) 
                && (adjusted_limit_utilization > 0.7)
            ) {
                return "BLOCK;Secondary Blibli Max Out > 70% Within 24h After Submit;NewAccountMaxOut";
            }
        }
    } else {
        if (hasNonLimitActiveCashLoanContract) {
            if ((isMainApplication == false)) {
                if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score<520)) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
            } else if ((!is_silverlist) /* non silverlist */
                        || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467)) /* silverlist A7 non offline */
                        || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
            ) {

                if (trx_score < 460) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if ((trx_score < 480) && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
                
            }
        }

        /* BLIBLI Reject Item Category */
        /* 1 phone */
        if (item_category_gladys == 'handphone') {
            if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && trx_score < 400) {
                return `BLOCK;transaction score < 400, RG A, buy phone;LowTransactionScore`;
            } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A')) && trx_score < 410) {
                return `BLOCK;transaction score < 410, buy phone;LowTransactionScore`;
            }
        }
        /* multiple phone */
        if (count_handphone_purchase_blibli > 1 && trx_score < 490) {
            return `BLOCK;transaction score < 490, buy multiple phone;LowTransactionScore`;
        }

        /* ------------[Offline Rule] Offline origination and not transacting in offline store-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)) {
            /* ------------ALDI offline->non offline, no payment, and max out within 30d (Fraud prevention)-------------*/
            if (
                (offline_item_names == 'Offline Transaction') /*ALDI*/
                && (sumTotalPayment <= 0) /*No payment*/
                && (adjusted_limit_utilization >= 0.7) /*Max out*/
                && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 720) /*Within 30d*/
            ) {
                return 'BLOCK;Offline to Online No Payment and Max Out Within 30d;OfflineAttemptMaxoutOnline';
            }
        }
            /* ------------[Offline Rule] Offline origination and not transacting in offline store with no payment history (Prevent Secondary Online Max Out)-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false) ) {
            if (adjusted_limit_utilization >=0.5 && sumTotalPayment < 500000 && total_limit_usage >= 8000000) {
                return 'REJECT;Offline Origination Attempt to Maxout Secondary Online;OfflineAttemptMaxoutSecondaryOnline';
            }
        }

        if (isMainApplication == true && trx_score < 390) {
            return "BLOCK;Blibli or Tiket transaction score < 390;LowTransactionScore";
        } else if (creditLimitAccountScheme == 'BLIBLI_WHITELABEL_SCHEME' && merchantCategory == 'BLIBLI_INSTORE' && ((isOfficialStore == false) || (['-999'].contains(isOfficialStore))) && is_good_instore == false && trx_score < 440) {
            return "BLOCK;Blibli Instore transaction score < 440;LowTransactionScore";
        } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
            return "BLOCK;offline score < 380;LowOfflineScore";
        } else if ((isMainApplication == true) && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 6) && (adjusted_limit_utilization >= 0.8)) {
            return "BLOCK;Blibli Max Out >= 80% Within 6h After Submit;NewAccountMaxOut";
        } else if ((isMainApplication == false)) {
            if (trx_score < 420) {
                return "BLOCK;Secondary Blibli transaction score < 420;LowTransactionScore";
            }
            if ((max_diff_transaction_creation_to_submit >= 0) 
                && (max_diff_transaction_creation_to_submit <= 24) 
                && (adjusted_limit_utilization > 0.7)
            ) {
                return "BLOCK;Secondary Blibli Max Out > 70% Within 24h After Submit;NewAccountMaxOut";
            }
        }
    }

    if (hasNonLimitActiveCashLoanContract && BLIBLI_STORE_WHITELISTED_JEWELLERY == true && transactionAmount >= 10000000){
        return "REJECT;User with Active Cash Transact Jewellery >= 10mio;UserHasActiveCashLoan";
    }

    if ((isPulsaTransaction) && (is_offline_transaction == false)) {
        if (sum_pulsa_trx_30d != null && !stringUtils.contains(lowerCaseItemNames, 'telkomsel halo')) {
            if (sum_pulsa_trx_30d > 400000 && riskGradeOfflineScore < 500) {
                return "REJECT;Cumulative Monthly Pulsa > 400000;HighTransactionAmount";
            } else if (sum_pulsa_trx_30d > 2000000 && riskGradeOfflineScore >= 500) {
                return "REJECT;Cumulative Monthly Pulsa > 2mio for high offline score;HighTransactionAmount";
            }
        } 
        
        if (transactionAmount > 500000) {
            return "REJECT;Pulsa transaction amount > 500k;HighTransactionAmount";
        }
    }

    if ((is_blibli_pln_transaction) && (riskGrade == 'A-') && (transactionAmount > 5000000)) {
        return "REJECT;PLN transaction amount > 5 Mio;HighTransactionAmount";
    } else if ((is_blibli_pln_transaction) && (riskGrade != 'A-') && (riskGrade != 'A+') && (transactionAmount > 2000000)) {
        return "REJECT;PLN transaction amount > 2 Mio;HighTransactionAmount";
    }

}
/********************************************************/ 
/************************* TIKET ***********************/
/********************************************************/

if (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME') {
/* turn this off as there are no more cases where there are no liveness test on Tiket
    if (
    (creditLimitAccountScheme == 'TIKET_WHITELABEL_SCHEME')
    && (identity_score < 480)
    && (transactionAmount >= 1000000) 
    && (adjusted_limit_utilization > 0.8) 
    && (sumTotalPayment <= 0) 
    ) {
        if ((hour >= 9 && hour < 17) && (day != 'SATURDAY') && (day != 'SUNDAY')) {
            return "SUSPICIOUS;Suspect Fraud Tiket;SuspectFraud";
        } else {
            return "REJECT;Suspect Fraud Tiket New Account Maxout Low Identity;LowTransactionScore";
        }
} */
    if (itemNames.contains('Villa Alnisa By Nganu')) {
        return "REJECT;Fraud merchant;FraudMerchant"; /*Irvin Request - Fraud gestun*/
    }

    if (tiket_blibli_transaction_model_ab_test == 'BLIBLI_TIKET_TRX_NEW_MODEL'){
        if (hasNonLimitActiveCashLoanContract) {
            if ((!is_silverlist) /* non silverlist */
                        || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467)) /* silverlist A7 non offline */
                        || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
            ) {
                if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score < 370)) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score < 380)) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
            }
        }
        
        
        /* ------------[Offline Rule] Offline origination and not transacting in offline store-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)) {
            /* ------------ALDI offline->non offline, no payment, and max out within 30d (Fraud prevention)-------------*/
            if (
                (offline_item_names == 'Offline Transaction') /*ALDI*/
                && (sumTotalPayment <= 0) /*No payment*/
                && (adjusted_limit_utilization >= 0.7) /*Max out*/
                && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 720) /*Within 30d*/
            ) {
                return 'BLOCK;Offline to Online No Payment and Max Out Within 30d;OfflineAttemptMaxoutOnline';
            }
        }
            /* ------------[Offline Rule] Offline origination and not transacting in offline store with no payment history (Prevent Secondary Online Max Out)-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false) ) {
            if (adjusted_limit_utilization >=0.5 && sumTotalPayment < 500000 && total_limit_usage >= 8000000) {
                return 'REJECT;Offline Origination Attempt to Maxout Secondary Online;OfflineAttemptMaxoutSecondaryOnline';
            }
        }

        if (trx_score < 325 && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
            return "BLOCK;Blibli or Tiket transaction score < 325;LowTransactionScore";
        } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
            return "BLOCK;offline score < 380;LowOfflineScore";
        } 
    } else {
        if (hasNonLimitActiveCashLoanContract) {
            if ((!is_silverlist) /* non silverlist */
                        || ((is_silverlist) && (is_offline_transaction == false) && (riskGradeOfflineScore >= 454) && (riskGradeOfflineScore <= 467)) /* silverlist A7 non offline */
                        || ((is_silverlist) && (riskGradeOfflineScore < 454)) /* silverlist below A7 non offline */
            ) {
                if ((stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score < 450)) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                } else if (!(stringUtils.contains(riskGrade.toUpperCase(), 'A')) && (trx_score < 460)) {
                    return "REJECT;User Has Non Limit Active Cash Loan Contract;UserHasActiveCashLoan";
                }
            }
        }
        
        
        /* ------------[Offline Rule] Offline origination and not transacting in offline store-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false)) {
            /* ------------ALDI offline->non offline, no payment, and max out within 30d (Fraud prevention)-------------*/
            if (
                (offline_item_names == 'Offline Transaction') /*ALDI*/
                && (sumTotalPayment <= 0) /*No payment*/
                && (adjusted_limit_utilization >= 0.7) /*Max out*/
                && (max_diff_transaction_creation_to_submit >= 0) && (max_diff_transaction_creation_to_submit <= 720) /*Within 30d*/
            ) {
                return 'BLOCK;Offline to Online No Payment and Max Out Within 30d;OfflineAttemptMaxoutOnline';
            }
        }
            /* ------------[Offline Rule] Offline origination and not transacting in offline store with no payment history (Prevent Secondary Online Max Out)-------------*/
        if ((is_offline_origination == true) && (is_offline_transaction == false) && (is_insurance_merchant == false) ) {
            if (adjusted_limit_utilization >=0.5 && sumTotalPayment < 500000 && total_limit_usage >= 8000000) {
                return 'REJECT;Offline Origination Attempt to Maxout Secondary Online;OfflineAttemptMaxoutSecondaryOnline';
            }
        }

        if (trx_score < 390 && !(stringUtils.contains(riskGrade.toUpperCase(), 'A'))) {
            return "BLOCK;Blibli or Tiket transaction score < 390;LowTransactionScore";
        } else if ((riskGradeOfflineScore > 0) && (riskGradeOfflineScore < 380)) {
            return "BLOCK;offline score < 380;LowOfflineScore";
        } 
    }
}

if (
    creditLimitAccountScheme == "LINK_AJA_WHITELABEL_SCHEME" ||
    creditLimitAccountScheme == "TIKET_WHITELABEL_SCHEME" ||
    creditLimitAccountScheme == "BLIBLI_WHITELABEL_SCHEME" || 
    creditLimitAccountScheme == "BUKALAPAK_WHITELABEL_SCHEME" ||
    creditLimitAccountScheme == "MITRA_BLIBLI_WHITELABEL_SCHEME"
) {
    return "NORMAL;Whitelabel Scheme";
}

return "NORMAL;Safe Transaction";