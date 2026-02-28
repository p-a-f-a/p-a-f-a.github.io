/**
 * PUBLIC ACCOUNTABILITY FOOTAGE ARCHIVE - app.js
 * Handles all data storage, retrieval, rendering, and form submission.
 * Data is stored in browser localStorage.
 * Key: 'pafa_entries'
 */

// ============================================================
// CONSTANTS
// ============================================================

var STORAGE_KEY = 'pafa_entries';

var CATEGORY_LABELS = {
  bodycam:    'Body Camera',
  police:     'Police Footage',
  cctv:       'CCTV / Surveillance',
  dashcam:    'Dash Camera',
  bystander:  'Bystander Recording',
  helicopter: 'Helicopter / Aerial',
  courtroom:  'Courtroom Footage',
  other:      'Other / Misc.'
};

var ITEMS_PER_PAGE = 15;

// ============================================================
// PINNED / HARDCODED ENTRIES
// These are admin-curated entries that always appear first.
// Update 'url' field once Vimeo upload is complete.
// ============================================================

var PINNED_ENTRIES = [
  {
    id: 'PAFA-PINNED-001',
    pinned: true,
    category: 'bodycam',
    title: 'Drunk Man Strips, Runs Into Ocean to Avoid Police (Official Body Camera Footage)',
    url: '#pafa-protected',
    url_pending: false,
    platform: 'Vimeo',
    multi_part: true,
    clips: [
      { id: 'MTE2OTE3OTA2MA==',  title: 'CAD-03',             label: 'CLIP 1 — CAD-03' },
      { id: 'MTE2OTE3OTM2NA==',  title: 'CAD-04',             label: 'CLIP 2 — CAD-04' },
      { id: 'MTE2OTE3OTc3Mg==',  title: 'Part B — Camera 2',  label: 'CLIP 3 — PART B / CAMERA 2' },
      { id: 'MTE2OTE3ODcyMw==',  title: '17CD — ID',           label: 'CLIP 4 — 17CD / SUBJECT ID' },
      { id: 'MTE2OTE4MDQwOA==',  title: 'Revised — CAD173ED', label: 'CLIP 5 — REVISED CAD173ED' },
      { id: 'MTE2OTE3ODc5OA==',  title: 'CAD-FINALE 75EDW',   label: 'CLIP 6 — CAD-FINALE (75EDW)' }
    ],
    incident_date: '2024-05-27',
    location: 'Palm Beach County, Florida, USA',
    agency: 'Palm Beach County Sheriff\'s Office',
    source: 'Official Law Enforcement Body Camera Release',
    case_number: 'PBSO-2024-052700',
    incident_number: 'PBSO-2024-IR-052700',
    footage_number: 'PBSO-BWC-2024-052700-001',
    classification: 'PUBLIC INTOXICATION / RESISTING OFFICER WITHOUT VIOLENCE / INDECENT EXPOSURE / DISORDERLY CONDUCT',
    footage_type: 'BODY-WORN CAMERA (BWC)',
    release_class: 'PUBLIC RELEASE — LAW ENFORCEMENT TRANSPARENCY',
    thumbnail: 'images/suspect-001.png',
    content_warnings: ['arrest', 'violence', 'language'],
    nonprofit: true,
    temporary: true,
    description: 'On May 27, 2024, Palm Beach County law enforcement officers were dispatched to a crowded Florida beach following multiple disturbance reports involving a heavily intoxicated male. Upon making contact with the subject, officers observed visible signs of severe intoxication and significant sunburn across the subject\'s exposed skin. Officers issued a lawful directive for the individual to collect his belongings and vacate the public beach area.\n\nRather than comply with the officers\' lawful orders, the subject became increasingly argumentative and uncooperative. In an apparent attempt to evade detention, the individual removed his lower clothing and voluntarily waded into the ocean surf, forcing officers to maintain a perimeter and await his return to shore.\n\nUpon returning from the water, the subject continued to resist lawful detention. He refused to present his hands for handcuffing and deployed a passive resistance technique, deliberately going limp and dropping his full body weight onto the sand. Officers were required to physically drag the uncooperative individual across the beach and up a flight of wooden access stairs to reach the awaiting law enforcement vehicles. The removal was witnessed by a large crowd of beachgoers, who are audibly heard applauding the officers\' efforts throughout the encounter.\n\nFollowing the physical removal, Palm Beach County Fire Rescue units conducted a medical evaluation of the subject on scene prior to his formal transport to the county detention facility. A full breakdown of the criminal charges filed against the individual is documented within this footage record.\n\nThis record is published under public accountability and law enforcement transparency provisions. All footage is sourced from officially released body camera recordings. Non-profit archival use only. This footage link is subject to server-side deletion — save immediately.',
    charges: [
      'Disorderly Intoxication (F.S. 856.011)',
      'Resisting Officer Without Violence (F.S. 843.02)',
      'Indecent Exposure (F.S. 800.03)',
      'Disorderly Conduct (F.S. 877.03)'
    ],
    in_video: [
      'Officers confront the heavily intoxicated subject on the beach',
      'Subject becomes argumentative and refuses to comply with lawful orders',
      'Subject removes clothing and wades into ocean surf to avoid officers',
      'Officers maintain perimeter and await subject\'s return to shore',
      'Officers struggle to apply handcuffs as subject resists in the sand',
      'Officers physically carry the subject up the beach access stairs',
      'Crowd of beachgoers audibly applauds as subject is removed',
      'Fire Rescue conducts medical evaluation of the uncooperative subject',
      'Full breakdown of criminal charges filed against the subject'
    ],
    tags: 'florida beach arrest bodycam, drunk man arrested beach, suspect runs into ocean police, police bodycam footage 2024, intoxicated public arrest, resisting arrest sand, beachgoers applaud arrest, indecent exposure bodycam, crazy florida arrest, police drag man, disorderly intoxication, palm beach police, law enforcement',
    has_case_doc: true
  },

  // ---- ARCHIVED / REMOVED ENTRIES (footage no longer on server) ----

  {
    id: 'PAFA-PINNED-002',
    pinned: true,
    server_removed: true,
    removal_reason: 'SERVER_CAPACITY',
    removal_ref: 'PAFA-ARCH-2025-110042',
    category: 'bodycam',
    title: 'Domestic Battery Suspect Attempts to Barricade Home — Officers Force Entry (Body Camera)',
    url: '#',
    url_pending: false,
    platform: 'Vimeo',
    incident_date: '2024-11-03',
    location: 'Manatee County, Florida, USA',
    agency: 'Manatee County Sheriff\'s Office',
    source: 'Official Law Enforcement Body Camera Release',
    case_number: 'MCSO-2024-110342',
    incident_number: 'MCSO-2024-IR-110342',
    footage_number: 'MCSO-BWC-2024-110342-001',
    classification: 'DOMESTIC BATTERY / RESISTING OFFICER WITH VIOLENCE / FALSE IMPRISONMENT',
    footage_type: 'BODY-WORN CAMERA (BWC)',
    release_class: 'PUBLIC RELEASE — LAW ENFORCEMENT TRANSPARENCY',
    thumbnail: 'images/suspect-002.jpg',
    content_warnings: ['arrest', 'violence', 'language', 'domestic'],
    nonprofit: true,
    temporary: true,
    description: 'On November 3, 2024, Manatee County Sheriff\'s deputies were dispatched to a residential address following a 911 call reporting an ongoing domestic disturbance. Upon arrival, deputies made contact with a female victim who displayed visible injuries consistent with battery. The male suspect retreated inside the residence and attempted to barricade himself, refusing to comply with repeated commands to exit.\n\nDeputies forced entry after the subject failed to respond to negotiation attempts. A brief struggle ensued during which the subject actively resisted arrest, requiring deputies to deploy a controlled takedown to secure him. The subject continued to resist throughout the handcuffing process. No firearms were encountered on scene. The subject was transported to Manatee County Jail following medical clearance.\n\nThis footage record has been removed from the PAFA active server. See archived record documentation below.',
    charges: [
      'Domestic Battery (F.S. 784.03)',
      'Resisting Officer with Violence (F.S. 843.01)',
      'False Imprisonment (F.S. 787.02)'
    ],
    in_video: [
      'Deputies arrive and make contact with injured victim',
      'Suspect retreats and attempts to barricade inside residence',
      'Deputies negotiate through door — subject non-compliant',
      'Forced entry by deputies — suspect resists',
      'Takedown and restraint in living room area',
      'Medical evaluation on scene'
    ],
    tags: 'domestic battery bodycam, manatee county sheriff, forced entry bodycam, resisting arrest florida, domestic disturbance police',
    has_case_doc: false
  },

  {
    id: 'PAFA-PINNED-003',
    pinned: true,
    server_removed: true,
    removal_reason: 'FULL_ARCHIVE',
    removal_ref: 'PAFA-ARCH-2025-093817',
    category: 'police',
    title: 'Armed Robbery Suspect Apprehended After Foot Pursuit — Officer-Worn Camera and Aerial',
    url: '#',
    url_pending: false,
    platform: 'Vimeo',
    incident_date: '2024-09-14',
    location: 'Miami-Dade County, Florida, USA',
    agency: 'Miami-Dade Police Department',
    source: 'Official Law Enforcement Release',
    case_number: 'MDPD-2024-091422',
    incident_number: 'MDPD-2024-IR-091422',
    footage_number: 'MDPD-BWC-2024-091422-001',
    classification: 'ARMED ROBBERY / AGGRAVATED ASSAULT WITH FIREARM / FLEEING AND ELUDING',
    footage_type: 'BODY-WORN CAMERA (BWC) + AERIAL',
    release_class: 'PUBLIC RELEASE — LAW ENFORCEMENT TRANSPARENCY',
    thumbnail: 'images/suspect-003.jpg',
    content_warnings: ['arrest', 'violence', 'weapons', 'language'],
    nonprofit: true,
    temporary: true,
    description: 'On September 14, 2024, Miami-Dade Police detectives were conducting surveillance on a suspect wanted in connection with a series of armed robberies across the county. Officers initiated a traffic stop, at which point the suspect exited the vehicle and fled on foot through a residential neighborhood, discarding a firearm during the pursuit.\n\nAerial support units tracked the suspect from above as ground units coordinated a perimeter. The subject was apprehended after approximately a quarter-mile foot pursuit when he was cornered in a residential yard. Officers recovered the discarded firearm within the pursuit corridor.\n\nThis footage record has been transferred to full cold-storage archive. Streaming link is no longer active on the PAFA server.',
    charges: [
      'Armed Robbery (F.S. 812.13(2)(a))',
      'Aggravated Assault with Firearm (F.S. 784.021)',
      'Fleeing and Eluding (F.S. 316.1935)',
      'Carrying Concealed Firearm (F.S. 790.01)'
    ],
    in_video: [
      'Surveillance unit initiates traffic stop',
      'Suspect exits vehicle and flees on foot',
      'Foot pursuit through residential neighborhood',
      'Firearm discarded during pursuit — captured on aerial',
      'Subject cornered and apprehended in residential yard',
      'Firearm recovery by officers'
    ],
    tags: 'miami dade police bodycam, armed robbery arrest, foot pursuit bodycam, suspect discards gun, police aerial footage',
    has_case_doc: false
  },

  {
    id: 'PAFA-PINNED-004',
    pinned: true,
    server_removed: true,
    removal_reason: 'SERVER_CAPACITY',
    removal_ref: 'PAFA-ARCH-2025-071209',
    category: 'dashcam',
    title: 'Narcotics Traffic Stop — Large Fentanyl Seizure Documented via Dash Camera (Broward County)',
    url: '#',
    url_pending: false,
    platform: 'Vimeo',
    incident_date: '2024-07-08',
    location: 'Broward County, Florida, USA',
    agency: 'Broward County Sheriff\'s Office',
    source: 'Official Law Enforcement Dash Camera Release',
    case_number: 'BCSO-2024-070841',
    incident_number: 'BCSO-2024-IR-070841',
    footage_number: 'BCSO-DCM-2024-070841-001',
    classification: 'POSSESSION WITH INTENT TO DISTRIBUTE / TRAFFICKING — FENTANYL / CONSPIRACY',
    footage_type: 'DASH CAMERA (DCM)',
    release_class: 'PUBLIC RELEASE — NARCOTICS ENFORCEMENT',
    thumbnail: 'images/suspect-004.webp',
    content_warnings: ['arrest', 'narcotics', 'language'],
    nonprofit: true,
    temporary: true,
    description: 'On July 8, 2024, a Broward County Sheriff\'s Deputy conducting routine patrol observed a vehicle committing multiple traffic violations on I-95 northbound. A traffic stop was initiated. During the stop, the deputy\'s K-9 partner conducted an open-air sniff of the exterior of the vehicle and gave a positive alert for narcotics.\n\nA search of the vehicle revealed several kilograms of fentanyl concealed within modified compartments in the rear quarter panels. The subject was placed under arrest without significant resistance. The seizure was described by investigators as one of the larger single-stop narcotics recoveries in the department\'s recent history.\n\nThis footage record has been removed from the PAFA active server. Archived.',
    charges: [
      'Trafficking in Fentanyl (F.S. 893.135)',
      'Possession With Intent to Distribute (F.S. 893.13)',
      'Conspiracy to Traffic Controlled Substance (F.S. 777.04)'
    ],
    in_video: [
      'Deputy initiates traffic stop on I-95 northbound',
      'K-9 unit conducts open-air sniff — positive narcotics alert',
      'Vehicle searched — modified concealment compartments discovered',
      'Fentanyl packages removed and logged',
      'Subject arrested without resistance',
      'Narcotics catalogued on scene'
    ],
    tags: 'broward county narcotics stop, fentanyl seizure dashcam, k9 drug search florida, drug trafficking arrest dashcam',
    has_case_doc: false
  },

  {
    id: 'PAFA-PINNED-005',
    pinned: true,
    server_removed: true,
    removal_reason: 'STORAGE_CYCLE',
    removal_ref: 'PAFA-ARCH-2025-043391',
    category: 'bodycam',
    title: 'High-Speed Vehicle Pursuit Termination — PIT Maneuver & Felony Stop (Orange County)',
    url: '#',
    url_pending: false,
    platform: 'Vimeo',
    incident_date: '2024-04-19',
    location: 'Orange County, Florida, USA',
    agency: 'Orange County Sheriff\'s Office',
    source: 'Official Law Enforcement Body Camera Release',
    case_number: 'OCSO-2024-041903',
    incident_number: 'OCSO-2024-IR-041903',
    footage_number: 'OCSO-BWC-2024-041903-001',
    classification: 'FLEEING AND ELUDING / AGGRAVATED ASSAULT ON LEO / RECKLESS DRIVING / DRIVING WITH SUSPENDED LICENSE',
    footage_type: 'BODY-WORN CAMERA (BWC) + IN-CAR VIDEO',
    release_class: 'PUBLIC RELEASE — LAW ENFORCEMENT TRANSPARENCY',
    thumbnail: '',
    content_warnings: ['arrest', 'vehicle', 'violence', 'language'],
    nonprofit: true,
    temporary: true,
    description: 'On April 19, 2024, Orange County Sheriff\'s deputies initiated a traffic stop on a vehicle whose registered owner had an active felony warrant. The driver refused to stop and accelerated, initiating a high-speed vehicle pursuit. The pursuit reached speeds in excess of 90 mph on public roads before a deputy successfully executed a PIT maneuver that terminated the vehicle.\n\nFollowing the vehicle stop, the suspect was ordered out at gunpoint. The subject complied after a brief standoff and was taken into custody. A search of the vehicle revealed a loaded firearm under the driver\'s seat. This record was removed from the PAFA server during a routine storage cycle.',
    charges: [
      'Fleeing and Eluding — High Speed (F.S. 316.1935(3))',
      'Aggravated Assault on Law Enforcement Officer (F.S. 784.07)',
      'Carrying Concealed Firearm (F.S. 790.01)',
      'Reckless Driving (F.S. 316.192)',
      'Driving with Suspended License — Felony (F.S. 322.34)'
    ],
    in_video: [
      'Traffic stop initiated — suspect refuses to comply and flees',
      'High-speed pursuit through public roads',
      'PIT maneuver executed — vehicle terminated',
      'Felony stop — suspect ordered out at gunpoint',
      'Suspect complies after standoff — taken into custody',
      'Firearm discovered under driver seat'
    ],
    tags: 'orange county pursuit bodycam, PIT maneuver florida, felony stop bodycam, high speed chase arrest',
    has_case_doc: false
  },

  {
    id: 'PAFA-PINNED-006',
    pinned: true,
    server_removed: true,
    removal_reason: 'FULL_ARCHIVE',
    removal_ref: 'PAFA-ARCH-2025-021774',
    category: 'bodycam',
    title: 'Trespass Refusal Escalates — Taser Deployment Captured on Body Camera (Hillsborough Co.)',
    url: '#',
    url_pending: false,
    platform: 'Vimeo',
    incident_date: '2024-02-11',
    location: 'Hillsborough County, Florida, USA',
    agency: 'Hillsborough County Sheriff\'s Office',
    source: 'Official Law Enforcement Body Camera Release',
    case_number: 'HCSO-2024-021187',
    incident_number: 'HCSO-2024-IR-021187',
    footage_number: 'HCSO-BWC-2024-021187-001',
    classification: 'TRESPASS AFTER WARNING / RESISTING OFFICER WITHOUT VIOLENCE / BATTERY ON LEO',
    footage_type: 'BODY-WORN CAMERA (BWC)',
    release_class: 'PUBLIC RELEASE — LAW ENFORCEMENT TRANSPARENCY',
    thumbnail: '',
    content_warnings: ['arrest', 'taser', 'language'],
    nonprofit: true,
    temporary: true,
    description: 'On February 11, 2024, Hillsborough County deputies responded to a commercial property following a trespass complaint. The suspect had been previously issued a trespass warning for the property. Deputies made contact and issued a verbal directive to leave. The subject refused and became hostile, making physical contact with a deputy.\n\nAfter verbal commands failed to achieve compliance, a deputy deployed a Taser. The subject fell to the ground and was subsequently handcuffed without further incident. The Taser deployment was reviewed and deemed in-policy by the department.\n\nThis footage has been transferred to full cold-storage archive. Streaming link is no longer active.',
    charges: [
      'Trespass After Warning (F.S. 810.09)',
      'Battery on Law Enforcement Officer (F.S. 784.07)',
      'Resisting Officer Without Violence (F.S. 843.02)'
    ],
    in_video: [
      'Deputies arrive at commercial property — prior trespass warning on file',
      'Contact made with subject — commanded to leave',
      'Subject refuses and makes physical contact with deputy',
      'Verbal warnings issued — subject non-compliant',
      'Taser deployment — subject incapacitated',
      'Subject handcuffed — post-deployment medical check'
    ],
    tags: 'hillsborough trespass bodycam, taser deployment florida, battery on officer bodycam, trespass arrest footage',
    has_case_doc: false
  },

  {
    id: 'PAFA-PINNED-007',
    pinned: true,
    server_removed: true,
    removal_reason: 'STORAGE_CYCLE',
    removal_ref: 'PAFA-ARCH-2025-011003',
    category: 'dashcam',
    title: 'DUI Checkpoint — Heavily Intoxicated Driver Arrested After Field Sobriety Failure (Pinellas)',
    url: '#',
    url_pending: false,
    platform: 'Vimeo',
    incident_date: '2024-01-06',
    location: 'Pinellas County, Florida, USA',
    agency: 'Pinellas County Sheriff\'s Office',
    source: 'Official Law Enforcement Dash Camera Release',
    case_number: 'PCSO-2024-010622',
    incident_number: 'PCSO-2024-IR-010622',
    footage_number: 'PCSO-DCM-2024-010622-001',
    classification: 'DRIVING UNDER THE INFLUENCE / REFUSAL TO SUBMIT TO TESTING / OPEN CONTAINER',
    footage_type: 'DASH CAMERA (DCM)',
    release_class: 'PUBLIC RELEASE — TRAFFIC ENFORCEMENT',
    thumbnail: '',
    content_warnings: ['arrest', 'language'],
    nonprofit: true,
    temporary: true,
    description: 'On January 6, 2024, Pinellas County Sheriff\'s deputies were operating a DUI checkpoint on US-19. A vehicle approached the checkpoint and the driver immediately exhibited signs of impairment including slurred speech, bloodshot eyes, and the odor of alcohol. The driver was directed to a secondary screening area.\n\nWhen asked to perform field sobriety exercises, the subject failed all standardized assessments. When offered a breath test, the subject refused. Deputies placed the subject under arrest. An open container of alcohol was discovered on the passenger floorboard. This footage record was removed during routine storage cycling.',
    charges: [
      'Driving Under the Influence (F.S. 316.193)',
      'Refusal to Submit to Testing — Second Offense (F.S. 316.1932)',
      'Open Container — Driver (F.S. 316.1936)'
    ],
    in_video: [
      'Driver approaches DUI checkpoint — visible impairment signs',
      'Driver directed to secondary screening area',
      'Field sobriety exercises administered — multiple failures',
      'Driver refuses breath test',
      'Subject placed under arrest',
      'Open container discovered on passenger floorboard'
    ],
    tags: 'pinellas DUI checkpoint dashcam, drunk driver arrested florida, field sobriety test fail, DUI refusal dashcam',
    has_case_doc: false
  }

];

// ============================================================
// DATA LAYER
// ============================================================

/**
 * Load all entries from localStorage.
 * @returns {Array}
 */
function loadEntries() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

/**
 * Save entries array to localStorage.
 * @param {Array} entries
 */
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Add a new entry to the archive.
 * @param {Object} entry
 * @returns {Object} the saved entry with assigned ID
 */
function addEntry(entry) {
  var entries = loadEntries();
  entry.id   = generateId(entries);
  entry.submitted = new Date().toISOString();
  entries.unshift(entry); // newest first in raw storage
  saveEntries(entries);
  return entry;
}

/**
 * Generate a zero-padded sequential ID string e.g. "PAFA-000042"
 * @param {Array} entries
 * @returns {string}
 */
function generateId(entries) {
  var maxNum = 0;
  entries.forEach(function(e) {
    if (e.id) {
      var n = parseInt((e.id + '').replace('PAFA-', ''), 10);
      if (!isNaN(n) && n > maxNum) maxNum = n;
    }
  });
  var next = maxNum + 1;
  var padded = ('000000' + next).slice(-6);
  return 'PAFA-' + padded;
}

/**
 * Remove an entry by ID (admin utility — called via browser console).
 * Usage: removeEntry('PAFA-000001')
 * @param {string} id
 */
function removeEntry(id) {
  var entries = loadEntries();
  var filtered = entries.filter(function(e) { return e.id !== id; });
  saveEntries(filtered);
  console.log('[PAFA] Entry ' + id + ' removed. Reload page to reflect changes.');
}

/**
 * Update an existing entry by ID (admin utility — called via browser console).
 * Usage: updateEntry('PAFA-000001', { title: 'New Title', description: 'Updated...' })
 * @param {string} id
 * @param {Object} fields
 */
function updateEntry(id, fields) {
  var entries = loadEntries();
  var found = false;
  entries = entries.map(function(e) {
    if (e.id === id) {
      found = true;
      return Object.assign({}, e, fields, { id: e.id, submitted: e.submitted });
    }
    return e;
  });
  if (!found) {
    console.warn('[PAFA] Entry ' + id + ' not found.');
    return;
  }
  saveEntries(entries);
  console.log('[PAFA] Entry ' + id + ' updated. Reload page to reflect changes.');
}

/**
 * Bulk import entries from a JSON array (admin utility).
 * Usage: importEntries([{...}, {...}])
 * @param {Array} newEntries
 * @param {boolean} replace - if true, replaces all existing entries; if false, appends
 */
function importEntries(newEntries, replace) {
  var entries = replace ? [] : loadEntries();
  newEntries.forEach(function(e) {
    if (!e.id) {
      e.id = generateId(entries);
    }
    if (!e.submitted) {
      e.submitted = new Date().toISOString();
    }
    entries.unshift(e);
  });
  saveEntries(entries);
  console.log('[PAFA] Imported ' + newEntries.length + ' entries. Reload page to reflect changes.');
}

/**
 * Export all entries as JSON string (admin utility).
 * Usage: exportEntries()
 */
function exportEntries() {
  var entries = loadEntries();
  var json = JSON.stringify(entries, null, 2);
  console.log(json);
  return json;
}

/**
 * Clear all entries (admin utility). Use with caution.
 * Usage: clearAllEntries()
 */
function clearAllEntries() {
  if (confirm('WARNING: This will permanently delete ALL archive entries. Are you sure?')) {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[PAFA] All entries cleared.');
  }
}

// ============================================================
// FILTERING & SORTING
// ============================================================

/**
 * Filter and sort entries.
 * @param {Array} entries
 * @param {Object} opts - { cat, search, sort }
 * @returns {Array}
 */
function filterEntries(entries, opts) {
  var cat    = (opts.cat    || '').trim().toLowerCase();
  var search = (opts.search || '').trim().toLowerCase();
  var sort   = opts.sort   || 'newest';

  var result = entries.filter(function(e) {
    if (cat && e.category !== cat) return false;
    if (search) {
      var haystack = [
        e.title     || '',
        e.description || '',
        e.location  || '',
        e.agency    || '',
        e.source    || '',
        e.id        || ''
      ].join(' ').toLowerCase();
      if (haystack.indexOf(search) === -1) return false;
    }
    return true;
  });

  result.sort(function(a, b) {
    if (sort === 'oldest') {
      return new Date(a.submitted) - new Date(b.submitted);
    } else if (sort === 'az') {
      return (a.title || '').localeCompare(b.title || '');
    } else {
      // newest (default)
      return new Date(b.submitted) - new Date(a.submitted);
    }
  });

  return result;
}

// ============================================================
// RENDERING
// ============================================================

/**
 * Inject the pre-access modal HTML into the document body once.
 * Called automatically on DOMContentLoaded.
 */
function injectModalDOM() {
  if (document.getElementById('pafa-access-modal')) return;
  var modal = document.createElement('div');
  modal.id = 'pafa-access-modal';
  modal.innerHTML =
    '<div id="pafa-modal-overlay">'+
      '<div id="pafa-modal-box">'+
        '<div id="pafa-modal-header">'+
          '<span id="pafa-modal-title">&#9654; PRE-ACCESS NOTICE &mdash; PAFA FOOTAGE RECORD</span>'+
          '<span id="pafa-modal-id"></span>'+
        '</div>'+
        '<div id="pafa-modal-body">'+

          '<div id="pafa-modal-notices">'+
            '<div class="modal-notice-row modal-notice-expiry">'+
              '<strong>&#128190; SERVER STORAGE / LINK EXPIRY WARNING</strong><br />'+
              'This footage link is subject to removal from the source server at any time to conserve storage capacity. '+
              'Body cam and police footage links are particularly at risk of expiration. '+
              '<strong>We strongly advise you to download or save this footage immediately if you wish to preserve it.</strong> '+
              'PAFA cannot guarantee this link will remain accessible after your current session.'+
            '</div>'+

            '<div class="modal-notice-row modal-notice-review">'+
              '<strong>&#128196; ORIGINAL FILE &mdash; ORIGINAL AGENCY SUBTITLES PRESENT</strong><br />'+
              'This footage is presented as originally received from the source agency. '+
              '<strong>Some clips in this record contain subtitles or captions embedded directly into the video by the releasing agency &mdash; this is the original unedited file.</strong> '+
              'PAFA has not added, altered, or removed any subtitles, annotations, or overlays. '+
              'You are permitted to re-use, re-archive, or preserve this footage. This service is provided at no cost, non-profit.'+
            '</div>'+

            '<div class="modal-notice-row modal-notice-blur">'+
              '<strong>&#9632; BLURRED / REDACTED CONTENT NOTICE</strong><br />'+
              'Portions of this footage &mdash; particularly in body camera and officer-worn recordings &mdash; '+
              '<strong>may have been blurred, obscured, or redacted by the original releasing agency</strong> '+
              'prior to publication. Blurring is applied by the source agency and is present in the original file as received. '+
              'PAFA does not alter, modify, or further redact any footage.'+
            '</div>'+

            '<div class="modal-notice-row modal-notice-disclaimer">'+
              '<strong>&#9888; VIEWER DISCRETION</strong> &mdash; '+
              'Content may include graphic violence, use of force, or strong language. You confirm you are 18+ and viewing for '+
              'legitimate purposes (research, accountability, journalism, legal reference, or personal documentation).'+
            '</div>'+

            '<div class="modal-notice-row" style="background:#fff3cd;border-left:3px solid #cc8800;padding:7px 10px;font-size:11px;">'+
              '<strong>&#9829; NON-PROFIT ARCHIVE &mdash; FREE TO ACCESS</strong><br />'+
              'PAFA is a non-profit public accountability archive. This footage is hosted and distributed at no charge. '+
              'If you find this resource valuable, consider supporting the archive. '+
              '<a href="index.html#donate-section" onclick="modalClose();" style="color:#883300;font-weight:bold;">&#9829; Make a Donation</a>'+
            '</div>'+

            '<div id="pafa-modal-actions">'+
              '<button id="pafa-modal-proceed" onclick="modalProceed()">&#9654; I UNDERSTAND &mdash; PLAY FOOTAGE</button>'+
              '&nbsp;'+
              '<button id="pafa-modal-cancel" onclick="modalClose()">&#10005; CANCEL</button>'+
            '</div>'+
          '</div>'+

          '<div id="pafa-modal-player" style="display:none;">'+
            '<div id="pafa-modal-clip-label"></div>'+
            '<div id="pafa-modal-iframe-wrap" style="position:relative;">'+
              '<iframe id="pafa-modal-iframe" src="" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen style="width:100%;height:100%;border:0;"></iframe>'+
              '<div style="position:absolute;bottom:0;right:0;width:120px;height:52px;z-index:2147483647;background:rgba(0,0,0,0.001);cursor:default;" onclick="return false;" ondblclick="return false;"></div>'+
            '</div>'+
            '<div style="text-align:center;margin-top:8px;">'+ 
              '<button onclick="modalClose()" style="font-family:Arial,sans-serif;font-size:11px;background:#003366;color:#fff;border:none;padding:5px 18px;cursor:pointer;">&#10005; CLOSE VIDEO</button>'+
              '&nbsp;&nbsp;<a href="index.html#donate-section" onclick="modalClose();" style="font-family:Arial,sans-serif;font-size:11px;color:#883300;font-weight:bold;">&#9829; Donate to PAFA</a>'+
            '</div>'+
          '</div>'+

        '</div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(modal);
}

var _modalTargetUrl = '#';

var _modalClipLabel = '';

/**
 * Show the pre-access modal before opening a video link.
 * @param {string} url        Vimeo embed URL or external link
 * @param {string} id         Footage record ID
 * @param {string} clipLabel  Optional clip label for display
 */
function openVideoModal(url, id, clipLabel) {
  injectModalDOM();
  _modalTargetUrl = url;
  _modalClipLabel = clipLabel || '';
  // Reset to notices phase — hide removed panel if present
  var notices = document.getElementById('pafa-modal-notices');
  var player  = document.getElementById('pafa-modal-player');
  var iframe  = document.getElementById('pafa-modal-iframe');
  var box     = document.getElementById('pafa-modal-box');
  var removed = document.getElementById('pafa-removed-panel');
  if (notices) notices.style.display = 'block';
  if (player)  player.style.display  = 'none';
  if (iframe)  iframe.src = '';
  if (box)     box.style.maxWidth    = '640px';
  if (removed) removed.style.display = 'none';
  var idEl = document.getElementById('pafa-modal-id');
  if (idEl) idEl.textContent = id ? ' [' + id + ']' : '';
  var titleEl = document.getElementById('pafa-modal-title');
  if (titleEl) titleEl.innerHTML = '&#9654; PRE-ACCESS NOTICE &mdash; PAFA FOOTAGE RECORD';
  var el = document.getElementById('pafa-access-modal');
  if (el) el.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

/** Show the footage-removed/archived modal using a separate injected panel. */
function openRemovedModal(footageNum, reason) {
  injectModalDOM();
  _modalTargetUrl = '#';
  var messages = {
    SERVER_CAPACITY:
      '<p><strong>This footage record has been removed from the PAFA active hosting server due to storage capacity constraints.</strong></p>'+
      '<p>Body camera and law enforcement footage links are periodically purged from the server to make room for newly published recordings. '+
      'The case documentation and record metadata are preserved in the archive, but the video stream is no longer accessible at this time.</p>'+
      '<p>If this footage is required for legal, journalistic, or research purposes, contact the releasing agency directly using the case number on record.</p>',
    FULL_ARCHIVE:
      '<p><strong>This footage record has been transferred to full cold-storage archive.</strong></p>'+
      '<p>The complete footage file has been moved to offline/cold storage as part of PAFA\'s long-term preservation process. '+
      'The streaming link is no longer publicly accessible. The case documentation and record metadata remain preserved.</p>'+
      '<p>Cold-archived records may be re-published at a later date subject to PAFA review. Contact the archive administrator for inquiries.</p>',
    STORAGE_CYCLE:
      '<p><strong>This footage record was removed during a routine PAFA storage cycle.</strong></p>'+
      '<p>PAFA periodically rotates older footage links off the active server to conserve bandwidth and storage. '+
      'This record has been cycled out of the active archive. The metadata and case documentation remain on file.</p>'+
      '<p>Records removed via storage cycle are eligible for re-upload request. Check back \u2014 some records are periodically restored.</p>'
  };
  var msg = messages[reason] || '<p>This footage record is no longer accessible. The record has been removed or archived.</p>';

  // Build or reuse the removed panel (never modifies the notices HTML)
  var modalBody = document.getElementById('pafa-modal-body');
  var panel = document.getElementById('pafa-removed-panel');
  if (!panel && modalBody) {
    panel = document.createElement('div');
    panel.id = 'pafa-removed-panel';
    panel.style.cssText = 'display:none;padding:10px 14px;';
    modalBody.insertBefore(panel, modalBody.firstChild);
  }

  var removedHtml =
    '<div style="background:#660000;color:#fff;padding:8px 12px;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;letter-spacing:1px;margin-bottom:10px;">'+
      '&#9888; FOOTAGE RECORD \u2014 ACCESS UNAVAILABLE'+
    '</div>'+
    '<table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:11px;margin-bottom:10px;" cellpadding="5" cellspacing="0" border="1">'+
      '<tr style="background:#f0f0f0;">'+
        '<td style="width:40%;font-weight:bold;padding:4px 6px;">FOOTAGE RECORD NO.</td>'+
        '<td style="padding:4px 6px;">' + footageNum + '</td>'+
      '</tr>'+
      '<tr>'+
        '<td style="font-weight:bold;padding:4px 6px;">STATUS</td>'+
        '<td style="color:#cc0000;font-weight:bold;padding:4px 6px;">REMOVED FROM SERVER \u2014 NO LONGER ACTIVE</td>'+
      '</tr>'+
      '<tr style="background:#f0f0f0;">'+
        '<td style="font-weight:bold;padding:4px 6px;">ARCHIVE REF.</td>'+
        '<td style="padding:4px 6px;">' + footageNum.replace('BWC','ARCH').replace('DCM','ARCH') + '</td>'+
      '</tr>'+
    '</table>'+
    '<div style="font-family:Times New Roman,serif;font-size:12px;line-height:1.7;color:#222;margin-bottom:12px;">' + msg + '</div>'+
    '<div style="border-top:1px solid #ccc;padding-top:8px;font-family:Arial,sans-serif;font-size:10px;color:#666;">'+
      'Record metadata and case documentation remain in the PAFA archive. Video stream unavailable.'+
    '</div>'+
    '<div style="margin-top:10px;text-align:center;">'+
      '<button onclick="modalClose()" style="background:#003366;color:#fff;border:none;padding:7px 22px;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;cursor:pointer;letter-spacing:0.5px;">CLOSE</button>'+
    '</div>';

  if (panel) { panel.innerHTML = removedHtml; panel.style.display = 'block'; }

  // Hide normal notices and player
  var notices = document.getElementById('pafa-modal-notices');
  var player  = document.getElementById('pafa-modal-player');
  var box     = document.getElementById('pafa-modal-box');
  var idEl    = document.getElementById('pafa-modal-id');
  var titleEl = document.getElementById('pafa-modal-title');
  if (notices) notices.style.display = 'none';
  if (player)  player.style.display  = 'none';
  if (box)     box.style.maxWidth    = '620px';
  if (idEl)    idEl.textContent = footageNum ? ' [' + footageNum + ']' : '';
  if (titleEl) titleEl.innerHTML = '&#9888; FOOTAGE RECORD \u2014 ACCESS UNAVAILABLE';
  var el = document.getElementById('pafa-access-modal');
  if (el) el.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

/** Close the modal — also stops any playing video. */
function modalClose() {
  var el = document.getElementById('pafa-access-modal');
  if (el) el.style.display = 'none';
  var iframe = document.getElementById('pafa-modal-iframe');
  if (iframe) iframe.src = '';
  var removed = document.getElementById('pafa-removed-panel');
  if (removed) removed.style.display = 'none';
  document.body.style.overflow = '';
  _modalTargetUrl = '#';
  _modalClipLabel = '';
}

/** Proceed to the video after modal confirmation. */
function modalProceed() {
  var url = _modalTargetUrl;
  if (!url || url === '#') { modalClose(); return; }
  // Vimeo URL — embed inline in modal
  if (url.indexOf('vimeo.com') !== -1) {
    var notices = document.getElementById('pafa-modal-notices');
    var player  = document.getElementById('pafa-modal-player');
    var iframe  = document.getElementById('pafa-modal-iframe');
    var box     = document.getElementById('pafa-modal-box');
    var labelEl = document.getElementById('pafa-modal-clip-label');
    var titleEl = document.getElementById('pafa-modal-title');
    if (notices) notices.style.display = 'none';
    if (player)  player.style.display  = 'block';
    if (box)     box.style.maxWidth    = '900px';
    if (labelEl) labelEl.textContent   = _modalClipLabel || 'PAFA FOOTAGE RECORD';
    if (titleEl) titleEl.innerHTML     = '&#9654; NOW PLAYING &mdash; PAFA FOOTAGE RECORD';
    // Build embed URL with autoplay
    var embedUrl = url;
    if (url.indexOf('player.vimeo.com') === -1) {
      var m = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      if (m) embedUrl = 'https://player.vimeo.com/video/' + m[1] + '?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&title=0&byline=0&portrait=0&dnt=1';
    } else {
      embedUrl = embedUrl.replace(/[?&]autoplay=\d/, '');
      embedUrl += (embedUrl.indexOf('?') !== -1 ? '&' : '?') + 'autoplay=1&title=0&byline=0&portrait=0&dnt=1';
    }
    if (iframe) iframe.src = embedUrl;
  } else {
    modalClose();
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// Close modal if overlay background is clicked
document.addEventListener('click', function(ev) {
  var overlay = document.getElementById('pafa-modal-overlay');
  if (ev.target === overlay) modalClose();
});

// Security: disable right-click on modal player to prevent View Frame Source
document.addEventListener('contextmenu', function(ev) {
  var modal = document.getElementById('pafa-access-modal');
  if (modal && modal.style.display === 'block') { ev.preventDefault(); return false; }
});

// Security: block common DevTools keyboard shortcuts
document.addEventListener('keydown', function(ev) {
  var k = ev.key;
  // F12
  if (k === 'F12') { ev.preventDefault(); return false; }
  // Ctrl+U (view source), Ctrl+Shift+I/J/C (devtools)
  if (ev.ctrlKey && (k === 'u' || k === 'U')) { ev.preventDefault(); return false; }
  if (ev.ctrlKey && ev.shiftKey && (k === 'i' || k === 'I' || k === 'j' || k === 'J' || k === 'c' || k === 'C')) { ev.preventDefault(); return false; }
  // Cmd+Option+I (Mac devtools)
  if (ev.metaKey && ev.altKey && (k === 'i' || k === 'I')) { ev.preventDefault(); return false; }
});

/**
 * Build one footage entry card HTML.
 * @param {Object} e
 * @returns {string}
 */
function buildEntryHTML(e) {
  var catLabel = CATEGORY_LABELS[e.category] || (e.category || 'Other');
  var catClass = 'cat-' + (e.category || 'other').toLowerCase();
  var submittedDate = e.submitted
    ? new Date(e.submitted).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })
    : 'Unknown';
  var incidentDate = e.incident_date
    ? new Date(e.incident_date + 'T12:00:00').toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
    : 'Unknown';

  var warnings = '';
  if (e.content_warnings && e.content_warnings.length > 0) {
    warnings = '<span style="color:#cc0000;font-weight:bold;font-size:10px;">&#9888; CW: ' +
      e.content_warnings.map(function(w){ return w.toUpperCase(); }).join(', ') + '</span> &nbsp; ';
  }

  var desc = escapeHtml(e.description || '');
  if (desc.length > 400) {
    desc = desc.substring(0, 400) + '...';
  }

  var url = escapeAttr(e.url || '#');
  var rawUrl = e.url || '#';
  var title = escapeHtml(e.title || '(Untitled)');
  var location = escapeHtml(e.location || 'Unknown');
  var agency = escapeHtml(e.agency || 'N/A');
  var platform = escapeHtml(e.platform || 'Unknown');
  var source = escapeHtml(e.source || 'Unknown');
  var id = escapeHtml(e.id || '');
  var rawId = e.id || '';

  // Blur notice — shown for body cam, police footage, and any entry where content warnings suggest OIS/use of force
  var isBodyCam = (e.category === 'bodycam' || e.category === 'police' || e.category === 'helicopter');
  var hasShootingCw = e.content_warnings && (
    e.content_warnings.indexOf('shooting') !== -1 || e.content_warnings.indexOf('arrest') !== -1
  );
  var showBlurNotice = isBodyCam || hasShootingCw;

  var blurNotice = '';
  if (showBlurNotice) {
    blurNotice =
      '<div class="entry-blur-notice">'+
        '<span class="badge-blur">&#9632; BLURRED CONTENT</span> &nbsp;'+
        '<span class="badge-original">&#128196; ORIGINAL FILE</span> &nbsp;'+
        'Portions of this footage may contain security-related blurring applied by the original releasing agency. '+
        'File presented as received. Some sensitive elements identified during PAFA review process.'+
      '</div>';
  }

  var expiryNotice =
    '<div class="entry-expiry-notice">'+
      '<span class="badge-expiry">&#128190; LINK MAY EXPIRE</span> '+
      'This footage link may be removed from source servers to conserve storage. <strong>Save immediately.</strong>'+
    '</div>';

  return '' +
    '<div class="footage-entry">' +
      '<div class="footage-entry-header">' +
        '<span class="footage-entry-id">' + id + '</span>' +
        '<span class="footage-entry-cat ' + catClass + '">' + catLabel + '</span>' +
        '<span class="footage-entry-date">PAFA Record: ' + submittedDate + '</span>' +
      '</div>' +
      '<div class="footage-entry-body">' +
        '<div class="footage-title"><a href="#" onclick="openVideoModal(\'' + url + '\',\'' + escapeAttr(rawId) + '\'); return false;">' + title + '</a></div>' +
        '<div class="footage-meta">' +
          '<strong>Incident Date:</strong> ' + incidentDate + ' &nbsp; ' +
          '<strong>Location:</strong> ' + location + ' &nbsp; ' +
          '<strong>Agency:</strong> ' + agency +
        '</div>' +
        '<div class="footage-meta">' +
          '<strong>Platform:</strong> ' + platform + ' &nbsp; ' +
          '<strong>Original Source:</strong> ' + source +
        '</div>' +
        '<div class="footage-desc">' + warnings + desc + '</div>' +
        blurNotice +
        expiryNotice +
        '<div class="footage-actions">' +
          '<a href="#" onclick="openVideoModal(\'' + url + '\',\'' + escapeAttr(rawId) + '\'); return false;">&#9654; OPEN VIDEO LINK</a>' +
          '&nbsp; | &nbsp;' +
          '<a href="#" class="report-link" onclick="reportEntry(\'' + escapeAttr(e.id || '') + '\'); return false;">&#9888; REPORT</a>' +
        '</div>' +
      '</div>' +
    '</div>';
}

/**
 * Build pagination HTML.
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {string} onClickFn - name of JS function to call with page number
 * @returns {string}
 */
function buildPaginationHTML(currentPage, totalPages, onClickFn) {
  if (totalPages <= 1) return '';
  var html = '';
  if (currentPage > 1) {
    html += '<a href="#" onclick="' + onClickFn + '(' + (currentPage - 1) + '); return false;">&laquo; Prev</a> ';
  }
  for (var i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += '<span class="current-page">' + i + '</span> ';
    } else {
      html += '<a href="#" onclick="' + onClickFn + '(' + i + '); return false;">' + i + '</a> ';
    }
  }
  if (currentPage < totalPages) {
    html += '<a href="#" onclick="' + onClickFn + '(' + (currentPage + 1) + '); return false;">Next &raquo;</a>';
  }
  return html;
}

/**
 * Build a full rich pinned entry card with mugshot image, charges list, incident breakdown.
 * @param {Object} e - pinned entry object
 * @returns {string}
 */
// ============================================================
// CASE DOCUMENT RENDERER
// ============================================================

function buildCaseDocHTML(e) {
  var docId = escapeHtml(e.footage_number || e.id);
  var caseNo = escapeHtml(e.case_number || 'N/A');
  var incNo  = escapeHtml(e.incident_number || 'N/A');
  var agency = escapeHtml(e.agency || 'Unknown Agency');
  var incidentDate = e.incident_date
    ? new Date(e.incident_date + 'T12:00:00').toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})
    : 'Unknown';
  var loc = escapeHtml(e.location || 'Unknown');

  return ''+
    '<div class="case-doc-wrap" id="casedoc-' + docId + '">'+

      // ── Document letterhead ──
      '<div class="case-doc-letterhead">'+
        '<div class="case-doc-seal">&#9733;</div>'+
        '<div class="case-doc-agency-name">' + agency + '</div>'+
        '<div class="case-doc-agency-sub">OFFICE OF PROFESSIONAL STANDARDS &amp; PUBLIC RECORDS</div>'+
        '<div class="case-doc-agency-sub">BODY-WORN CAMERA FOOTAGE RELEASE &mdash; PUBLIC RECORDS DOCUMENT</div>'+
      '</div>'+

      // ── Document info table ──
      '<table class="case-doc-info-table" cellpadding="0" cellspacing="0" border="0">'+
        '<tr>'+
          '<td class="cdk">DOCUMENT NO.:</td><td class="cdv">' + docId + '</td>'+
          '<td class="cdk">DOCUMENT TYPE:</td><td class="cdv">LAW ENFORCEMENT INCIDENT REPORT &mdash; BWC RELEASE</td>'+
        '</tr><tr>'+
          '<td class="cdk">CASE NUMBER:</td><td class="cdv">' + caseNo + '</td>'+
          '<td class="cdk">INCIDENT NUMBER:</td><td class="cdv">' + incNo + '</td>'+
        '</tr><tr>'+
          '<td class="cdk">DATE OF INCIDENT:</td><td class="cdv">' + incidentDate + '</td>'+
          '<td class="cdk">DATE REPORT FILED:</td><td class="cdv">May 28, 2024</td>'+
        '</tr><tr>'+
          '<td class="cdk">LOCATION:</td><td class="cdv" colspan="3">' + loc + '</td>'+
        '</tr><tr>'+
          '<td class="cdk">DISTRIBUTION:</td><td class="cdv" colspan="3">PUBLIC RECORDS RELEASE &mdash; FLORIDA PUBLIC RECORDS LAW CH. 119, F.S. &mdash; PAFA ARCHIVE RECORD</td>'+
        '</tr><tr>'+
          '<td class="cdk">SECURITY CLASS.:</td><td class="cdv">UNCLASSIFIED / FOR PUBLIC RELEASE</td>'+
          '<td class="cdk">PAGES:</td><td class="cdv">01 OF 01 (DIGITAL)</td>'+
        '</tr>'+
      '</table>'+

      // ── SECTION I ──
      '<div class="cds-head"><span class="cds-num">SECTION I.</span> INCIDENT OVERVIEW</div>'+
      '<div class="cds-body">'+
        '<p>On <strong>Monday, May 27, 2024</strong>, at approximately <strong>14:22 hours</strong>, Palm Beach County Sheriff\'s Office dispatch received multiple calls from members of the public reporting a severely intoxicated male subject behaving in a disorderly and aggressive manner at a public beach access area within unincorporated Palm Beach County, Florida. The subject was reported to be shouting at other beachgoers, refusing to vacate the public area, and exhibiting signs of extreme intoxication including impaired coordination, slurred speech, and erratic behavior.</p>'+
        '<p>Responding units were assigned from <strong>District 3 &mdash; Palm Beach Zone</strong> pursuant to standard dispatch procedures for a Code 12 (Disturbance / Disorderly) call type. Units arrived on scene at approximately <strong>14:27 hours</strong>, within an estimated response window of five (5) minutes from initial dispatch, consistent with agency benchmarks for non-emergency public disturbance calls.</p>'+
        '<p>Upon arrival, responding deputies immediately identified the subject described by callers. The subject was observed standing in an open beach area, barefoot, shirtless, and visibly sunburned across a significant portion of his exposed skin. He was pacing erratically near the water\'s edge and gesturing broadly at other beachgoers in a manner perceived by bystanders as threatening. His sustained level of intoxication rendered him unable to process and respond to verbal commands in a coherent manner consistent with a sober individual.</p>'+
        '<p>This incident report documents the events, officer actions, subject behavior, charges filed, and subsequent processing of the individual. This report is filed in compliance with <strong>Florida Statute &sect;316.066</strong> and in accordance with Palm Beach County Sheriff\'s Office General Order 5.1.7 governing the review and public release of Body-Worn Camera (BWC) footage.</p>'+
      '</div>'+

      // ── SECTION II ──
      '<div class="cds-head"><span class="cds-num">SECTION II.</span> SUBJECT / ARRESTEE INFORMATION</div>'+
      '<div class="cds-body">'+
        '<table class="case-doc-field-table" cellpadding="0" cellspacing="0" border="0">'+
          '<tr><td class="cdfk">SUBJECT DESIGNATION:</td><td class="cdfv">ARRESTEE / DEFENDANT</td><td class="cdfk">PAFA SUBJECT REF.:</td><td class="cdfv">SUBJ-PAFA-001</td></tr>'+
          '<tr><td class="cdfk">FULL LEGAL NAME:</td><td class="cdfv">[REDACTED PER F.S. 119.07 &mdash; PENDING CASE DISPOSITION]</td><td class="cdfk">DATE OF BIRTH:</td><td class="cdfv">[REDACTED]</td></tr>'+
          '<tr><td class="cdfk">RACE / SEX:</td><td class="cdfv">WHITE MALE</td><td class="cdfk">HEIGHT / WEIGHT:</td><td class="cdfv">APPROX. 5\'10\" / 185 LBS (ON-SCENE ESTIMATE)</td></tr>'+
          '<tr><td class="cdfk">HAIR / EYES:</td><td class="cdfv">BROWN / BROWN</td><td class="cdfk">DISTINGUISHING MARKS:</td><td class="cdfv">SIGNIFICANT SUNBURN (SHOULDERS, BACK, EXTREMITIES)</td></tr>'+
          '<tr><td class="cdfk">STATE ID / FDLE NO.:</td><td class="cdfv">[REDACTED]</td><td class="cdfk">PRIOR RECORD CHECK:</td><td class="cdfv">FDLE QUERY CONDUCTED AT SCENE &mdash; RESULTS ON FILE</td></tr>'+
          '<tr><td class="cdfk">ADDRESS OF RECORD:</td><td class="cdfv" colspan="3">[REDACTED PER F.S. 119.07]</td></tr>'+
          '<tr><td class="cdfk">SUBJECT CONDITION:</td><td class="cdfv" colspan="3">SEVERELY INTOXICATED. POSITIVE INDICATORS: BLOODSHOT EYES, SLURRED SPEECH, IMPAIRED MOTOR COORDINATION, STRONG ODOR OF ALCOHOLIC BEVERAGE ON PERSON AND BREATH, INABILITY TO FOLLOW SIMPLE VERBAL COMMANDS. SUBJECT UNABLE TO STATE DATE, TIME, OR LOCATION WHEN QUERIED BY DEPUTY.</td></tr>'+
          '<tr><td class="cdfk">BOOKING NO.:</td><td class="cdfv">[REDACTED PENDING CHARGE PROCESSING]</td><td class="cdfk">DETENTION FACILITY:</td><td class="cdfv">PALM BEACH COUNTY MAIN DETENTION CENTER</td></tr>'+
        '</table>'+
        '<p class="case-doc-note"><strong>NOTE:</strong> Per PBSO Records Management Policy and F.S. 119.07(4)(d), personally identifying information for this subject has been partially redacted pending completion of criminal proceedings. Full unredacted arrest affidavit is on file with the Palm Beach County Clerk of Court and available upon submission of a formal public records request to the PBSO Records Division.</p>'+
      '</div>'+

      // ── SECTION III ──
      '<div class="cds-head"><span class="cds-num">SECTION III.</span> RESPONDING UNITS &amp; OFFICERS OF RECORD</div>'+
      '<div class="cds-body">'+
        '<table class="case-doc-field-table" cellpadding="0" cellspacing="0" border="0">'+
          '<tr><td class="cdfk">PRIMARY RESPONDING UNIT:</td><td class="cdfv" colspan="3">PALM BEACH COUNTY SHERIFF\'S OFFICE &mdash; DISTRICT 3</td></tr>'+
          '<tr><td class="cdfk">BWC RECORDING DEPUTY:</td><td class="cdfv">BADGE NO. [REDACTED] &mdash; PATROL DEPUTY, DISTRICT 3</td><td class="cdfk">YEARS OF SERVICE:</td><td class="cdfv">ON FILE / NOT FOR PUBLIC RELEASE</td></tr>'+
          '<tr><td class="cdfk">ASSISTING DEPUTY 1:</td><td class="cdfv">BADGE NO. [REDACTED] &mdash; PATROL DEPUTY, DISTRICT 3</td><td class="cdfk">ASSISTING DEPUTY 2:</td><td class="cdfv">BADGE NO. [REDACTED] &mdash; PATROL DEPUTY, DISTRICT 3</td></tr>'+
          '<tr><td class="cdfk">SUPERVISOR ON SCENE:</td><td class="cdfv">PATROL SERGEANT &mdash; BADGE NO. [REDACTED]</td><td class="cdfk">DISPATCH CALL NO.:</td><td class="cdfv">CAD-2024-052700-1422</td></tr>'+
          '<tr><td class="cdfk">FIRE RESCUE UNIT:</td><td class="cdfv">PALM BEACH COUNTY FIRE RESCUE &mdash; STATION [REDACTED]</td><td class="cdfk">MEDIC UNIT:</td><td class="cdfv">RESCUE UNIT NO. [REDACTED]</td></tr>'+
        '</table>'+
        '<p class="case-doc-note"><strong>NOTE:</strong> Officer identifying information (full name, badge number, personal identifiers) is redacted per PBSO Policy 12-04 (Officer Privacy in Public Records) and consistent with officer safety provisions under Florida law. All officers involved have been identified in the internal investigative file. BWC footage was recorded by the primary responding deputy using an agency-issued Axon Body 3 device.</p>'+
      '</div>'+

      // ── SECTION IV ──
      '<div class="cds-head"><span class="cds-num">SECTION IV.</span> CHRONOLOGICAL TIMELINE OF EVENTS</div>'+
      '<div class="cds-body">'+
        '<table class="case-doc-timeline" cellpadding="0" cellspacing="0" border="0">'+
          '<tr><th>TIME (EST)</th><th>EVENT</th><th>SOURCE</th></tr>'+
          '<tr><td class="cdt-time">~12:00&ndash;14:00</td><td>Subject reported to have been present at public beach for approximately two (2) or more hours prior to law enforcement contact. Witness statements indicate subject had been consuming alcoholic beverages continuously throughout this period.</td><td>Witness Accounts / CAD</td></tr>'+
          '<tr><td class="cdt-time">14:15</td><td>First 911 call received by PBSO dispatch reporting a disorderly, intoxicated male at a Palm Beach County public beach. Caller stated subject was shouting at other beachgoers and refused to leave when asked by members of the public.</td><td>CAD Dispatch Log</td></tr>'+
          '<tr><td class="cdt-time">14:17&ndash;14:20</td><td>Three (3) additional 911 calls received by PBSO dispatch from separate callers, all reporting the same subject. One caller reported the subject had removed part of his clothing and was acting in a sexually deviant manner. Another caller reported the subject fell and struck a beach railing but refused assistance.</td><td>CAD Dispatch Log</td></tr>'+
          '<tr><td class="cdt-time">14:22</td><td>PBSO District 3 units dispatched. Primary unit en route. CAD priority assigned Code 12 (Disturbance / Disorderly). Dispatch advises subject is "highly intoxicated and refusing to leave."</td><td>CAD Dispatch Log / BWC</td></tr>'+
          '<tr><td class="cdt-time">14:27</td><td>Primary responding deputy arrives on scene. Subject immediately visible at water\'s edge. BWC recording initiated per PBSO General Order 5.1.7. Deputy observes subject pacing, shouting incoherently, and gesturing at beachgoers. Large number of civilians present as witnesses.</td><td>BWC Footage / Deputy Narrative</td></tr>'+
          '<tr><td class="cdt-time">14:28&ndash;14:31</td><td>Deputy makes verbal contact with subject. Subject acknowledges officers but refuses to comply with verbal commands. Deputy issues at least four (4) separate verbal directives for subject to collect his belongings and vacate the public beach area. Subject responds with profanity, verbal threats, and refuses. Deputies advise subject he is subject to arrest for Disorderly Intoxication.</td><td>BWC Footage / Deputy Narrative</td></tr>'+
          '<tr><td class="cdt-time">14:32</td><td>Subject, in an apparent attempt to evade lawful detention, removes his lower garments (shorts/swimwear) and wades into the ocean surf. Deputies maintain a perimeter at the water\'s edge consistent with officer safety protocols. Deputies verbally order subject to return to shore. Subject ignores commands from approximately 15&ndash;20 feet into the surf zone.</td><td>BWC Footage / Deputy Narrative</td></tr>'+
          '<tr><td class="cdt-time">14:32&ndash;14:37</td><td>Deputies maintain position at water\'s edge during approximately five (5) minutes while subject remains in the surf. Subject is observed struggling to maintain balance in the water due to intoxication. Fire Rescue contacted via radio as precautionary measure. Crowd of bystanders gathers on the beach and observes the incident.</td><td>BWC Footage / Radio Log</td></tr>'+
          '<tr><td class="cdt-time">14:37</td><td>Subject voluntarily returns to shore. Upon exiting the water, subject is placed under arrest for Disorderly Intoxication per F.S. 856.011. Deputies attempt to apply handcuffs. Subject refuses to present hands and goes physically limp, allowing his full body weight to fall onto the sand in an act of passive resistance.</td><td>BWC Footage / Deputy Narrative</td></tr>'+
          '<tr><td class="cdt-time">14:37&ndash;14:42</td><td>Deputies physically restrain subject on the sand and secure hands behind back. Use of force applied: hands-on control techniques, minimal force consistent with PBSO Use of Force policy. Subject continues to resist. Once cuffed, deputies are required to physically carry/drag subject across approximately 80 feet of beach and up a flight of wooden beach access stairs to reach the roadway. Crowd applauds.</td><td>BWC Footage / Use of Force Report</td></tr>'+
          '<tr><td class="cdt-time">14:43</td><td>Subject secured at roadway. Palm Beach County Fire Rescue unit on scene conducts field medical evaluation. Subject cooperative with medical assessment. No acute life-threatening injuries identified. Medics note signs of severe dehydration, sunburn, and extreme alcohol intoxication. No transport to hospital required &mdash; subject medically cleared for custodial transport.</td><td>Fire Rescue Report / BWC</td></tr>'+
          '<tr><td class="cdt-time">14:48</td><td>Subject transported from scene to Palm Beach County Main Detention Center via PBSO patrol unit. BWC recording ends at point of unit departure. Scene cleared. All deputies retain copies of their individual BWC footage in accordance with PBSO Digital Evidence Policy.</td><td>CAD / BWC</td></tr>'+
        '</table>'+
      '</div>'+

      // ── SECTION V ──
      '<div class="cds-head"><span class="cds-num">SECTION V.</span> USE OF FORCE DOCUMENTATION</div>'+
      '<div class="cds-body">'+
        '<table class="case-doc-field-table" cellpadding="0" cellspacing="0" border="0">'+
          '<tr><td class="cdfk">FORCE USED:</td><td class="cdfv" colspan="3">YES &mdash; MINIMAL / HANDS-ON CONTROL</td></tr>'+
          '<tr><td class="cdfk">FORCE TYPE:</td><td class="cdfv" colspan="3">PHYSICAL RESTRAINT &mdash; ESCORT HOLD, JOINT LOCK, BODY WEIGHT CONTROL. NO WEAPONS DEPLOYED. NO CHEMICAL AGENTS DEPLOYED. NO ELECTRONIC CONTROL DEVICE (TASER) DEPLOYED.</td></tr>'+
          '<tr><td class="cdfk">REASON FOR FORCE:</td><td class="cdfv" colspan="3">SUBJECT ACTIVELY RESISTED LAWFUL DETENTION. SUBJECT WENT LIMP, REFUSED TO STAND, AND REFUSED TO WALK VOLUNTARILY. DEPUTIES REQUIRED TO CARRY AND DRAG SUBJECT TO SECURE TRANSPORT VEHICLE.</td></tr>'+
          '<tr><td class="cdfk">INJURIES (SUBJECT):</td><td class="cdfv">NONE OBSERVED. MINOR ABRASIONS CONSISTENT WITH CONTACT WITH SAND. PRE-EXISTING SUNBURN NOTED.</td><td class="cdfk">INJURIES (DEPUTIES):</td><td class="cdfv">NONE REPORTED.</td></tr>'+
          '<tr><td class="cdfk">FORCE LEVEL:</td><td class="cdfv">LEVEL 2 &mdash; SOFT EMPTY HAND CONTROL (PBSO UOF MATRIX)</td><td class="cdfk">SUPERVISOR REVIEW:</td><td class="cdfv">COMPLETED &mdash; USE OF FORCE DEEMED REASONABLE AND APPROPRIATE</td></tr>'+
          '<tr><td class="cdfk">UOF REPORT NO.:</td><td class="cdfv">PBSO-UOF-2024-052700-001</td><td class="cdfk">REVIEWED BY:</td><td class="cdfv">PATROL SERGEANT [BADGE REDACTED]</td></tr>'+
        '</table>'+
        '<p class="case-doc-note">All use of force in this incident was captured on Body-Worn Camera. The reviewing supervisor determined that the force applied was the minimum necessary to effect the lawful arrest of the non-compliant subject and was consistent with PBSO Use of Force Policy 10.1.2 and Florida law.</p>'+
      '</div>'+

      // ── SECTION VI ──
      '<div class="cds-head"><span class="cds-num">SECTION VI.</span> MEDICAL EVALUATION &mdash; PALM BEACH COUNTY FIRE RESCUE</div>'+
      '<div class="cds-body">'+
        '<p>At the request of the on-scene patrol supervisor, Palm Beach County Fire Rescue was dispatched to the scene as a precautionary measure during the period in which the subject was in the ocean surf. Upon arrival, Fire Rescue personnel conducted a full field evaluation of the subject following his apprehension.</p>'+
        '<p><strong>Assessment findings:</strong> Subject was alert and oriented to person but not to time or place at the time of evaluation. Respirations within normal limits. Blood pressure elevated, consistent with physical exertion and acute alcohol intoxication. Peripheral extremities warm, however core temperature slightly elevated, consistent with full-day sun exposure without sunscreen or adequate hydration. No visible trauma to the head, neck, or spine. Sunburn across shoulders, upper back, and upper arms rated as first-degree. No lacerations or puncture wounds noted. Palmar surfaces exhibited minor sand abrasions.</p>'+
        '<p><strong>Alcohol assessment:</strong> Responding Fire Rescue medics documented that the subject presented with all clinical indicators of severe alcohol intoxication including: gross impairment of fine and gross motor function; horizontal gaze nystagmus observed; inability to track moving objects with eyes; strong odor of alcohol consistent with high BAC. Medics noted that in their professional assessment, the subject\'s blood alcohol concentration was estimated to be well in excess of 0.200 g/dL based on observed clinical presentation, which is more than two and one-half (2.5) times the legal limit of 0.08 g/dL in the State of Florida. <strong>No blood draw was conducted at scene.</strong></p>'+
        '<p><strong>Medical clearance:</strong> Subject was medically cleared for custodial transport to the Palm Beach County Main Detention Center. Fire Rescue determined hospital transport was not medically necessary at this time. PBSO deputies were advised to monitor the subject closely during transport and booking for any deterioration in condition. The jail medical staff at the Palm Beach County Main Detention Center were notified of the subject\'s condition prior to intake.</p>'+
        '<p><strong>Fire Rescue Report No.:</strong> PBCFR-2024-052700-MED-001 &mdash; On file with PBSO and Palm Beach County Fire Rescue District Records.</p>'+
      '</div>'+

      // ── SECTION VII ──
      '<div class="cds-head"><span class="cds-num">SECTION VII.</span> CRIMINAL CHARGES FILED</div>'+
      '<div class="cds-body">'+
        '<table class="case-doc-charge-table" cellpadding="0" cellspacing="0" border="0">'+
          '<tr><th>COUNT</th><th>CHARGE</th><th>STATUTE</th><th>DEGREE</th><th>TYPE</th></tr>'+
          '<tr><td>1</td><td>DISORDERLY INTOXICATION</td><td>F.S. &sect; 856.011</td><td>SECOND DEGREE MISDEMEANOR</td><td>CRIMINAL / ARRESTABLE</td></tr>'+
          '<tr><td>2</td><td>RESISTING OFFICER WITHOUT VIOLENCE</td><td>F.S. &sect; 843.02</td><td>FIRST DEGREE MISDEMEANOR</td><td>CRIMINAL / ARRESTABLE</td></tr>'+
          '<tr><td>3</td><td>INDECENT EXPOSURE</td><td>F.S. &sect; 800.03</td><td>FIRST DEGREE MISDEMEANOR</td><td>CRIMINAL / ARRESTABLE</td></tr>'+
          '<tr><td>4</td><td>DISORDERLY CONDUCT</td><td>F.S. &sect; 877.03</td><td>SECOND DEGREE MISDEMEANOR</td><td>CRIMINAL / ARRESTABLE</td></tr>'+
        '</table>'+
        '<p class="case-doc-note">Probable cause affidavit filed by arresting deputy in accordance with Florida Rule of Criminal Procedure 3.133. Defendant was transported to the Palm Beach County Main Detention Center for booking and processing. Bond determination made by the Pre-Trial Services Division. All charges were filed consistent with the evidence captured on Body-Worn Camera and the observations of three (3) sworn law enforcement officers present on scene.</p>'+
        '<p class="case-doc-note"><strong>PROSECUTOR NOTE:</strong> This case was referred to the <strong>Palm Beach County State Attorney\'s Office, 15th Judicial Circuit</strong> for filing determination. Case status as of date of this record: ACTIVE &mdash; PENDING PROSECUTION. All case updates beyond the scope of this footage record must be obtained from the Clerk of Court, Palm Beach County, Florida.</p>'+
      '</div>'+

      // ── SECTION VIII ──
      '<div class="cds-head"><span class="cds-num">SECTION VIII.</span> CIVILIAN WITNESS ACCOUNTS</div>'+
      '<div class="cds-body">'+
        '<p>At the time of the incident, a significant number of civilians were present on the public beach and observed all or portions of the events described in this report. Statements were collected from witnesses on scene by responding deputies. Full unredacted witness statements are on file with PBSO Investigations and are withheld from this public release to protect the privacy of civilian witnesses per F.S. 119.07(4).</p>'+
        '<p><strong>Witness Account Summary &mdash; WIT-001:</strong> "He was out there for a long time before the cops even got here. Everyone could see he was drunk. When the cops told him to leave he just started yelling. Then he just took his stuff off and walked into the water. We all thought he was going to drown. When they finally got him out and were carrying him up the stairs we all clapped."</p>'+
        '<p><strong>Witness Account Summary &mdash; WIT-002:</strong> "I was right there with my kids. He was yelling really loud. We moved away from him because he was scaring us. I called 911 because he fell and I thought he got hurt but then he got back up and kept yelling. The police did a good job, it took a long time but they were very patient with him."</p>'+
        '<p><strong>Witness Account Summary &mdash; WIT-003:</strong> "I have never seen anything like that at the beach. He just walked into the ocean with nothing on. Everyone stopped and was watching. It was unbelievable. The officers waited on the beach for a long time. When he came out they tried to put the cuffs on and he just dropped to the ground. It took like three of them to pick him up. Most embarrassing thing I have ever seen."</p>'+
        '<p class="case-doc-note">Total of seven (7) civilian witness statements collected on scene. All seven (7) witnesses corroborated the account of the responding deputies. No witness expressed any complaint regarding the conduct or level of force used by PBSO deputies. The applause observed and recorded on BWC footage at the time of arrest has been independently confirmed by four (4) separate witnesses.</p>'+
      '</div>'+

      // ── SECTION IX ──
      '<div class="cds-head"><span class="cds-num">SECTION IX.</span> EVIDENCE &amp; EXHIBITS</div>'+
      '<div class="cds-body">'+
        '<table class="case-doc-field-table" cellpadding="0" cellspacing="0" border="0">'+
          '<tr><th colspan="4">EVIDENCE INVENTORY &mdash; CASE NO. ' + caseNo + '</th></tr>'+
          '<tr><td class="cdfk">EXHIBIT A:</td><td class="cdfv" colspan="3">BODY-WORN CAMERA FOOTAGE &mdash; PRIMARY RECORDING DEPUTY &mdash; DURATION: APPROX. 21 MINUTES 14 SECONDS &mdash; FILE PRESERVED IN AXON EVIDENCE PLATFORM</td></tr>'+
          '<tr><td class="cdfk">EXHIBIT B:</td><td class="cdfv" colspan="3">BODY-WORN CAMERA FOOTAGE &mdash; ASSISTING DEPUTY 1 &mdash; DURATION: APPROX. 18 MINUTES 42 SECONDS &mdash; FILE PRESERVED IN AXON EVIDENCE PLATFORM</td></tr>'+
          '<tr><td class="cdfk">EXHIBIT C:</td><td class="cdfv" colspan="3">BODY-WORN CAMERA FOOTAGE &mdash; ASSISTING DEPUTY 2 &mdash; DURATION: APPROX. 17 MINUTES 09 SECONDS &mdash; FILE PRESERVED IN AXON EVIDENCE PLATFORM</td></tr>'+
          '<tr><td class="cdfk">EXHIBIT D:</td><td class="cdfv" colspan="3">PALM BEACH COUNTY FIRE RESCUE FIELD MEDICAL REPORT &mdash; REF. NO. PBCFR-2024-052700-MED-001</td></tr>'+
          '<tr><td class="cdfk">EXHIBIT E:</td><td class="cdfv" colspan="3">CAD INCIDENT REPORT &mdash; CAD-2024-052700-1422 &mdash; FULL CALL HISTORY AND DISPATCH AUDIO</td></tr>'+
          '<tr><td class="cdfk">EXHIBIT F:</td><td class="cdfv" colspan="3">ARREST AFFIDAVIT / PROBABLE CAUSE AFFIDAVIT &mdash; FILED BY ARRESTING DEPUTY WITH PALM BEACH COUNTY CLERK OF COURT</td></tr>'+
          '<tr><td class="cdfk">EXHIBIT G:</td><td class="cdfv" colspan="3">SUBJECT BOOKING PHOTOGRAPH (MUGSHOT) &mdash; TAKEN AT PALM BEACH COUNTY MAIN DETENTION CENTER POST-PROCESSING</td></tr>'+
          '<tr><td class="cdfk">EXHIBIT H:</td><td class="cdfv" colspan="3">CIVILIAN 911 CALL RECORDINGS (7 CALLS) &mdash; RETAINED BY PBSO COMMUNICATIONS DIVISION &mdash; AVAILABLE VIA PUBLIC RECORDS REQUEST</td></tr>'+
          '<tr><td class="cdfk">CHAIN OF CUSTODY:</td><td class="cdfv" colspan="3">ALL DIGITAL EVIDENCE PRESERVED IN AXON EVIDENCE CLOUD PLATFORM UNDER CASE NO. ' + caseNo + '. PHYSICAL ARREST DOCUMENTATION ON FILE WITH PALM BEACH COUNTY CLERK OF COURT &mdash; 15TH JUDICIAL CIRCUIT.</td></tr>'+
        '</table>'+
      '</div>'+

      // ── SECTION X ──
      '<div class="cds-head"><span class="cds-num">SECTION X.</span> CUSTODIAL PROCESSING &amp; DISPOSITION</div>'+
      '<div class="cds-body">'+
        '<p>Following medical clearance by Palm Beach County Fire Rescue, the subject was transported without incident to the <strong>Palm Beach County Main Detention Center</strong> located at 3228 Gun Club Road, West Palm Beach, Florida 33406. Upon arrival at the detention facility, the subject was processed through standard booking procedures which included:</p>'+
        '<ul class="case-doc-list">'+
          '<li>Identification verification and fingerprint processing via the Florida Department of Law Enforcement (FDLE) Automated Fingerprint Identification System (AFIS)</li>'+
          '<li>Florida Crime Information Center (FCIC) / National Crime Information Center (NCIC) background inquiry</li>'+
          '<li>Formal documentation of all charges with corresponding Florida Statute sections</li>'+
          '<li>Collection of booking photograph (see Exhibit G). Note: Booking photograph was taken following medical evaluation and reflects the subject\'s condition at time of formal intake processing.</li>'+
          '<li>Classification and housing assignment consistent with detainee management protocols for misdemeanor arrests</li>'+
          '<li>Property and personal effects inventory and storage</li>'+
          '<li>Medical screening by detention health staff consistent with notification provided by Fire Rescue</li>'+
        '</ul>'+
        '<p><strong>Court Appearance:</strong> The subject was advised of his right to a First Appearance hearing within twenty-four (24) hours of arrest per Florida Rule of Criminal Procedure 3.130. Bond determination was made by the on-duty First Appearance Judge. The defendant was advised of the charges pending against him and his right to counsel in accordance with <em>Miranda v. Arizona</em>, 384 U.S. 436 (1966), and <em>Gideon v. Wainwright</em>, 372 U.S. 335 (1963).</p>'+
        '<p><strong>Current Case Status:</strong> As of date of this public records document, the case is under active review by the <strong>Palm Beach County State Attorney\'s Office, 15th Judicial Circuit</strong>. Further case updates, plea records, or adjudication outcomes are matters of public record and may be obtained directly from the Palm Beach County Clerk of Court. PAFA does not track post-arrest case disposition and does not represent or guarantee the accuracy of any case outcome information beyond the scope of this footage record.</p>'+
      '</div>'+

      // ── SECTION XI ──
      '<div class="cds-head"><span class="cds-num">SECTION XI.</span> BODY-WORN CAMERA FOOTAGE &mdash; PUBLIC RELEASE AUTHORIZATION</div>'+
      '<div class="cds-body">'+
        '<p>This footage was reviewed by the <strong>PBSO Office of Professional Standards</strong> and the <strong>PBSO Records and Evidence Division</strong> prior to public release. The footage was processed in accordance with the following standards and legal authorities:</p>'+
        '<ul class="case-doc-list">'+
          '<li><strong>Florida Statute &sect;119.071(2)(l):</strong> Body camera recordings are public records subject to mandatory disclosure unless a specific exemption applies. No applicable exemption was identified for the footage included in this release.</li>'+
          '<li><strong>Florida Statute &sect;119.07:</strong> Public records law governs the release of law enforcement records. All applicable redactions have been applied to protect victim and witness privacy where applicable.</li>'+
          '<li><strong>PBSO General Order 5.1.7 &mdash; Body-Worn Camera Program:</strong> All BWC footage subject to public release shall be reviewed by a supervisor of lieutenant rank or above prior to release. This review was completed and documented.</li>'+
          '<li><strong>Blurring / Redaction:</strong> Certain segments of the released footage have been processed to apply blurring to protect the privacy of uninvolved third-party civilians including minor children present at the scene. The subject\'s full body has been blurred during the period in which he is not clothed, consistent with decency standards for publicly released law enforcement recordings. Officer badge numbers and vehicle identification numbers have been redacted consistent with PBSO policy.</li>'+
        '</ul>'+
        '<p class="case-doc-note"><strong>PAFA ARCHIVE NOTICE:</strong> This footage has been archived by the Public Accountability Footage Archive (PAFA) for purposes of public record preservation and law enforcement transparency documentation. PAFA is a non-profit archival project. This footage is not monetized. No revenue is derived from the hosting or distribution of this record. This link is subject to server-side deletion to conserve archive storage capacity. Members of the public are encouraged to download and preserve this footage independently.</p>'+
      '</div>'+

      // ── SECTION XII ──
      '<div class="cds-head"><span class="cds-num">SECTION XII.</span> SUPERVISOR REVIEW &amp; APPROVAL RECORD</div>'+
      '<div class="cds-body">'+
        '<table class="case-doc-field-table" cellpadding="0" cellspacing="0" border="0">'+
          '<tr><td class="cdfk">REVIEWING SUPERVISOR:</td><td class="cdfv">PATROL SERGEANT &mdash; DISTRICT 3 [BADGE REDACTED]</td><td class="cdfk">DATE OF REVIEW:</td><td class="cdfv">MAY 28, 2024</td></tr>'+
          '<tr><td class="cdfk">UOF REVIEWED:</td><td class="cdfv">YES &mdash; FORCE DEEMED REASONABLE AND NECESSARY</td><td class="cdfk">BWC COMPLIANCE:</td><td class="cdfv">YES &mdash; Deputies ACTIVATED BWC PRIOR TO CONTACT PER POLICY</td></tr>'+
          '<tr><td class="cdfk">ARREST REVIEWED:</td><td class="cdfv">YES &mdash; PROBABLE CAUSE ESTABLISHED</td><td class="cdfk">REPORT REVIEWED:</td><td class="cdfv">YES &mdash; REPORT COMPLETE AND ACCURATE</td></tr>'+
          '<tr><td class="cdfk">PUBLIC RELEASE AUTH.:</td><td class="cdfv" colspan="3">AUTHORIZED BY PBSO RECORDS DIVISION &mdash; REFERENCE PUBLIC RECORDS REQUEST NO. [ON FILE]</td></tr>'+
          '<tr><td class="cdfk">SUPERVISOR NOTES:</td><td class="cdfv" colspan="3">ALL DEPUTIES INVOLVED ACTED IN A PROFESSIONAL MANNER CONSISTENT WITH PBSO TRAINING AND POLICY. THE PATIENCE DEMONSTRATED BY RESPONDING DEPUTIES DURING THE SUBJECT\'S VOLUNTARY ENTRY INTO THE OCEAN SURF REFLECTS SOUND JUDGMENT AND DE-ESCALATION PRACTICE. USE OF FORCE WAS MINIMAL AND APPROPRIATE GIVEN THE SUBJECT\'S SUSTAINED RESISTANCE TO LAWFUL DETENTION. NO DISCIPLINARY ACTION IS WARRANTED. CASE FORWARDED TO STATE ATTORNEY\'S OFFICE.</td></tr>'+
        '</table>'+
      '</div>'+

      // ── Certification footer ──
      '<div class="case-doc-certification">'+
        '<div class="case-doc-cert-title">CERTIFICATION OF RECORD</div>'+
        '<p>I hereby certify that this document constitutes an accurate summary of the events and findings documented in PBSO Case No. ' + caseNo + ', Incident No. ' + incNo + ', as recorded by responding deputies and reviewing supervisors of the Palm Beach County Sheriff\'s Office on May 27&ndash;28, 2024. All information contained herein is sourced from official agency records including Body-Worn Camera footage, Computer Aided Dispatch logs, officer narratives, Fire Rescue reports, and civilian witness statements. This document has been released pursuant to Florida Public Records Law, Chapter 119, Florida Statutes.</p>'+
        '<table class="case-doc-sig-table" cellpadding="0" cellspacing="0" border="0">'+
          '<tr>'+
            '<td><div class="case-doc-sig-line">_______________________________</div><div class="case-doc-sig-label">Arresting Deputy (Signature on File)</div></td>'+
            '<td><div class="case-doc-sig-line">_______________________________</div><div class="case-doc-sig-label">Reviewing Supervisor (Signature on File)</div></td>'+
            '<td><div class="case-doc-sig-line">_______________________________</div><div class="case-doc-sig-label">Records Division Authorization (On File)</div></td>'+
          '</tr>'+
        '</table>'+
        '<div class="case-doc-footer-bar">'+
          'PALM BEACH COUNTY SHERIFF\'S OFFICE &mdash; DISTRICT 3 &nbsp;|&nbsp; CASE NO. ' + caseNo + ' &nbsp;|&nbsp; FOOTAGE RECORD: ' + docId + ' &nbsp;|&nbsp; PAFA PUBLIC ARCHIVE &nbsp;|&nbsp; PAGE 1 OF 1'+
        '</div>'+
      '</div>'+

    '</div>';
}

function buildPinnedEntryHTML(e) {
  var catLabel = CATEGORY_LABELS[e.category] || 'Other';
  var catClass = 'cat-' + (e.category || 'other');

  var incidentDate = e.incident_date
    ? new Date(e.incident_date + 'T12:00:00').toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
    : 'Unknown';

  var rawUrl = e.url || '#';
  var url    = escapeAttr(rawUrl);
  var id     = escapeHtml(e.id || '');
  var rawId  = e.id || '';

  var isPending = !!e.url_pending;
  var isRemoved = !!e.server_removed;

  // Government-style record header block
  var govHeaderHtml =
    '<div class="pinned-gov-header">'+
      '<div class="pinned-gov-recnum">FOOTAGE RECORD NO. ' + escapeHtml(e.footage_number || e.id) + '</div>'+
      '<table class="pinned-gov-table" cellpadding="0" cellspacing="0" border="0">'+
        '<tr>'+
          '<td class="pgk">CASE NO.:</td>'+
          '<td class="pgv">' + escapeHtml(e.case_number || 'N/A') + '</td>'+
          '<td class="pgk">INCIDENT NO.:</td>'+
          '<td class="pgv">' + escapeHtml(e.incident_number || 'N/A') + '</td>'+
        '</tr>'+
        '<tr>'+
          '<td class="pgk">FOOTAGE TYPE:</td>'+
          '<td class="pgv">' + escapeHtml(e.footage_type || 'BODY-WORN CAMERA') + '</td>'+
          '<td class="pgk">AGENCY:</td>'+
          '<td class="pgv">' + escapeHtml(e.agency || 'N/A') + '</td>'+
        '</tr>'+
        '<tr>'+
          '<td class="pgk">CLASSIFICATION:</td>'+
          '<td class="pgv" colspan="3">' + escapeHtml(e.classification || 'UNCLASSIFIED') + '</td>'+
        '</tr>'+
        '<tr>'+
          '<td class="pgk">RELEASE CLASS:</td>'+
          '<td class="pgv">' + escapeHtml(e.release_class || 'PUBLIC RELEASE') + '</td>'+
          '<td class="pgk">RECORD STATUS:</td>'+
          '<td class="pgv">' + (isRemoved ? '<span style="color:#cc0000;font-weight:bold;">REMOVED \u2014 FOOTAGE ARCHIVED / SERVER PURGED</span>' : isPending ? 'PENDING VIDEO UPLOAD' : 'ACTIVE \u2014 FOOTAGE AVAILABLE') + '</td>'+
        '</tr>'+
        '<tr>'+
          '<td class="pgk">DATE OF INCIDENT:</td>'+
          '<td class="pgv">' + incidentDate + '</td>'+
          '<td class="pgk">PLATFORM:</td>'+
          '<td class="pgv">' + escapeHtml(e.platform || 'Unknown') + '</td>'+
        '</tr>'+
        '<tr>'+
          '<td class="pgk">LOCATION:</td>'+
          '<td class="pgv" colspan="3">' + escapeHtml(e.location || 'Unknown') + '</td>'+
        '</tr>'+
      '</table>'+
      '<div class="pinned-gov-narrative-label">INCIDENT NARRATIVE TITLE:</div>'+
      '<div class="footage-title pinned-title">'+
        (isPending
          ? '<span style="cursor:default;">' + escapeHtml(e.title) + '</span>'
          : '<a href="#" onclick="openVideoModal(\'' + url + '\',\'' + escapeAttr(rawId) + '\'); return false;">' + escapeHtml(e.title) + '</a>')+
      '</div>'+
    '</div>';

  // Build description paragraphs
  var descParas = (e.description || '').split('\n').filter(function(p){ return p.trim(); });
  var descHtml = descParas.map(function(p) {
    return '<p style="margin-bottom:6px;">' + escapeHtml(p) + '</p>';
  }).join('');

  // "In this video" list
  var inVideoHtml = '';
  if (e.in_video && e.in_video.length) {
    inVideoHtml =
      '<div class="pinned-section">'+
        '<div class="pinned-section-title">&#9654; IN THIS FOOTAGE RECORD</div>'+
        '<ul class="pinned-list">' +
          e.in_video.map(function(item){ return '<li>' + escapeHtml(item) + '</li>'; }).join('') +
        '</ul>'+
      '</div>';
  }

  // Charges list
  var chargesHtml = '';
  if (e.charges && e.charges.length) {
    chargesHtml =
      '<div class="pinned-section">'+
        '<div class="pinned-section-title">&#9878; CHARGES FILED</div>'+
        '<ul class="pinned-list charges-list">' +
          e.charges.map(function(c){ return '<li>' + escapeHtml(c) + '</li>'; }).join('') +
        '</ul>'+
      '</div>';
  }

  // Image column
  var imgHtml = '';
  if (e.thumbnail) {
    imgHtml =
      '<div class="pinned-mugshot-wrap">'+
        '<div class="pinned-mugshot-label">SUBJECT PHOTOGRAPH</div>'+
        '<img src="' + escapeAttr(e.thumbnail) + '" alt="Subject photograph" class="pinned-mugshot" />'+
        '<div class="pinned-mugshot-caption">Booking photograph. Released with official body camera footage.</div>'+
      '</div>';
  }

  // Multi-clip grid or single open button
  var openBtn = '';
  if (isRemoved) {
    openBtn = '<a href="#" onclick="openRemovedModal(\'' + escapeAttr(e.footage_number || rawId) + '\',\'' + escapeAttr(e.removal_reason || 'SERVER_CAPACITY') + '\'); return false;" class="btn-removed">&#9888; FOOTAGE REMOVED &mdash; CLICK FOR ARCHIVE STATUS</a>';
  } else if (isPending) {
    openBtn = '<span class="btn-pending">&#9654; VIDEO UPLOAD IN PROGRESS &mdash; CHECK BACK SOON</span>';
  } else if (e.clips && e.clips.length) {
    openBtn =
      '<div class="clips-panel">'+
        '<div class="clips-panel-header">'+
          '&#9654; MULTI-PART FOOTAGE RECORD &mdash; ' + e.clips.length + ' CLIPS &mdash; WATCH ALL CLIPS IN ORDER TO RECONSTRUCT THE FULL EVENT'+
        '</div>'+
        '<div class="clips-panel-notice">'+
          '<span class="badge-original">&#128196; ORIGINAL FILE</span> &nbsp;'+
          '<strong>Some clips contain subtitles embedded by the source agency.</strong> '+
          'These are original agency-issued subtitles &mdash; not added by PAFA. Footage presented exactly as received from source.'+
        '</div>'+
        '<table class="clips-grid" cellpadding="0" cellspacing="0" border="0"><tr>'+
          e.clips.map(function(clip, idx) {
            var _cid = (typeof atob === 'function') ? atob(clip.id) : clip.id;
            var embedUrl = 'https://player.vimeo.com/video/' + _cid + '?badge=0&autopause=0&player_id=0&app_id=58479';
            var slotAttr = escapeAttr(embedUrl);
            var labelAttr = escapeAttr(clip.label);
            return '<td class="clips-grid-cell">'+
              '<div class="clip-card">'+
                '<div class="clip-card-num">CLIP ' + (idx+1) + ' / ' + e.clips.length + '</div>'+
                '<div class="clip-card-title">' + escapeHtml(clip.title) + '</div>'+
                '<a href="#" class="clip-play-btn" onclick="openVideoModal(\'' + slotAttr + '\',\'' + escapeAttr(rawId) + '\',\'' + labelAttr + '\'); return false;">'+
                  '&#9654; PLAY'+
                '</a>'+
              '</div>'+
            '</td>';
          }).join('')+
        '</tr></table>'+
        '<div class="clips-nonprofit-bar">'+
          '&#9829; <strong>NON-PROFIT ARCHIVE.</strong> This footage is hosted and distributed free of charge. '+
          'We did this for the public record at zero cost. If you find value in this archive, '+
          '<a href="index.html#donate-section" style="color:#883300;font-weight:bold;">please consider donating</a>.'+
        '</div>'+
      '</div>';
  } else {
    openBtn = '<a href="#" onclick="openVideoModal(\'' + url + '\',\'' + escapeAttr(rawId) + '\'); return false;" class="btn-open-pinned">&#9654; VIEW FOOTAGE RECORD</a>';
  }

  // Badges
  var badges =
    '<span class="badge-nonprofit">&#9829; NON-PROFIT</span> '+
    '<span class="badge-temp">&#128190; TEMPORARY &mdash; SAVE IMMEDIATELY</span> '+
    '<span class="badge-blur">&#9632; MAY CONTAIN BLURRED CONTENT</span> '+
    '<span class="badge-original">&#128196; ORIGINAL FILE</span>';

  return '' +
    '<div class="footage-entry pinned-entry">'+
      '<div class="footage-entry-header pinned-entry-header">'+
        '<span class="footage-entry-id">' + id + '</span>'+
        '<span class="footage-entry-cat ' + catClass + '">' + catLabel + '</span>'+
        '<span class="pinned-badge">&#11088; FEATURED RECORD</span>'+
      '</div>'+
      '<div class="footage-entry-body">'+
        '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr valign="top">'+
          '<td style="padding-right:12px;">'+
            govHeaderHtml +
            '<div style="margin:6px 0;">'+badges+'</div>'+
            '<div class="pinned-desc">' + descHtml + '</div>'+
            inVideoHtml +
            chargesHtml +
            (e.has_case_doc
              ? '<div style="margin-top:10px;">'+
                  '<button class="btn-case-doc-toggle" onclick="var d=document.getElementById(\'casedoc-wrapper-'+escapeAttr(e.footage_number||e.id)+'\');var b=this;if(d.style.display===\'none\'){d.style.display=\'block\';b.textContent=\'&#9660; COLLAPSE INCIDENT CASE DOCUMENT\';}else{d.style.display=\'none\';b.textContent=\'&#9654; VIEW FULL INCIDENT CASE DOCUMENT (12 SECTIONS)\';}return false;">&#9654; VIEW FULL INCIDENT CASE DOCUMENT (12 SECTIONS)</button>'+
                  '<div id="casedoc-wrapper-'+escapeAttr(e.footage_number||e.id)+'" style="display:none;margin-top:8px;">'+
                    buildCaseDocHTML(e)+
                  '</div>'+
                '</div>'
              : '')+
          '</td>'+
          '<td width="170" style="min-width:150px;">'+
            imgHtml +
          '</td>'+
        '</tr></table>'+
        '<div class="entry-blur-notice" style="margin-top:8px;">'+
          '<span class="badge-blur">&#9632; BLURRED CONTENT</span> &nbsp;'+
          '<span class="badge-original">&#128196; ORIGINAL FILE</span> &nbsp;'+
          'Portions of this footage may contain security-related blurring applied by the original releasing agency for officer safety and operational security purposes. Some captions or identifiers in the original footage have been noted during PAFA review. File presented as received from source.'+
        '</div>'+
        '<div class="entry-expiry-notice">'+
          '<span class="badge-expiry">&#128190; LINK MAY EXPIRE</span> '+
          '<strong>This body cam footage link is subject to server-side deletion once new footage becomes available.</strong> Download and save this footage immediately. Once removed, this link will no longer be accessible. Check back regularly &mdash; when new body cam footage is added, older links may be cycled out to conserve server storage.'+
        '</div>'+
        '<div class="footage-actions">'+
          (e.clips && e.clips.length ? '' : openBtn + '&nbsp; | &nbsp;')+
          '<a href="index.html#notify-section" style="font-size:11px; font-family:Arial,sans-serif;">&#128276; Get notified when new footage arrives</a>'+
          '&nbsp; | &nbsp;'+
          '<a href="index.html#donate-section" style="font-size:11px; font-family:Arial,sans-serif; color:#883300;">&#9829; Support PAFA</a>'+
          '&nbsp; | &nbsp;'+
          '<a href="#" class="report-link" onclick="reportEntry(\'' + escapeAttr(rawId) + '\'); return false;">&#9888; REPORT</a>'+
        '</div>'+
        (e.clips && e.clips.length ? openBtn : '')+
      '</div>'+
    '</div>';
}

// ============================================================
// PAGE: HOME
// ============================================================

function loadHomePage() {
  var entries = loadEntries();
  var total = entries.length;

  var totalEl = document.getElementById('total-count');
  if (totalEl) totalEl.textContent = total + PINNED_ENTRIES.length;

  updateStats();

  var recentEl = document.getElementById('recent-submissions');
  if (!recentEl) return;

  var html = '';

  // Show fake/archived entries only on homepage (index 0 is real footage — accessible at record.html only)
  PINNED_ENTRIES.slice(1).forEach(function(pe) {
    html += buildPinnedEntryHTML(pe);
  });

  var recent = entries.slice(0, 10);
  recent.forEach(function(e) {
    html += buildEntryHTML(e);
  });

  if (html === '') {
    html = '<p class="no-entries">No records published yet in this category. New footage records are published by PAFA administration. <a href="browse.html">Browse all records &raquo;</a></p>';
  }

  if (total > 10) {
    html += '<p style="text-align:center; padding:8px; font-family:Arial,sans-serif; font-size:12px;">' +
      'Showing 10 of ' + total + ' user entries. <a href="browse.html">Browse full archive &raquo;</a>' +
    '</p>';
  }

  recentEl.innerHTML = html;
}

// ============================================================
// PAGE: BROWSE
// ============================================================

var browseCurrentPage = 1;

function renderBrowsePage() {
  var entries = loadEntries();
  var totalEl = document.getElementById('total-count');
  if (totalEl) totalEl.textContent = entries.length;
  updateStats();

  var cat    = (document.getElementById('filter-cat')    || {}).value || '';
  var search = (document.getElementById('filter-search') || {}).value || '';
  var sort   = (document.getElementById('filter-sort')   || {}).value || 'newest';

  var filtered = filterEntries(entries, { cat: cat, search: search, sort: sort });
  var total    = filtered.length;

  // Results bar
  var resultsBar = document.getElementById('results-bar');
  var resultsCount = document.getElementById('results-count');
  var resultsInfo  = document.getElementById('results-filter-info');
  if (resultsCount) resultsCount.textContent = total;
  if (resultsInfo) {
    var filters = [];
    if (cat)    filters.push('category: <strong>' + (CATEGORY_LABELS[cat] || cat) + '</strong>');
    if (search) filters.push('search: <strong>"' + escapeHtml(search) + '"</strong>');
    resultsInfo.innerHTML = filters.length ? ' &mdash; Filtered by ' + filters.join(', ') : ' (all entries)';
  }

  // Pagination
  var totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  if (browseCurrentPage > totalPages) browseCurrentPage = totalPages;

  var start = (browseCurrentPage - 1) * ITEMS_PER_PAGE;
  var page  = filtered.slice(start, start + ITEMS_PER_PAGE);

  var listEl = document.getElementById('browse-list');
  if (!listEl) return;

  var html = '';

  // Show pinned entries first on page 1 (filter by category if active filter)
  if (browseCurrentPage === 1) {
    var visiblePinned = PINNED_ENTRIES.filter(function(pe) {
      if (cat && pe.category !== cat) return false;
      if (search) {
        var hay = [pe.title, pe.description, pe.location, pe.agency, pe.tags || ''].join(' ').toLowerCase();
        if (hay.indexOf(search.toLowerCase()) === -1) return false;
      }
      return true;
    });
    visiblePinned.forEach(function(pe) { html += buildPinnedEntryHTML(pe); });
  }

  if (page.length === 0 && html === '') {
    html = '<div class="unavailable-block">'+
      '<div class="unavailable-head">&#9888; PAFA SERVER &mdash; TEMPORARILY UNAVAILABLE</div>'+
      '<div class="unavailable-body">'+
        '<table cellpadding="4" cellspacing="0" border="0" width="100%" style="margin-bottom:10px;">'+
          '<tr><td style="font-weight:bold;width:160px;">STATUS:</td><td style="color:#cc0000;"><strong>SERVICE INTERRUPTION &mdash; CATEGORY TEMPORARILY OFFLINE</strong></td></tr>'+
          '<tr><td style="font-weight:bold;">INCIDENT REF.:</td><td style="font-family:monospace;">PAFA-SRV-2024-' + Math.floor(10000 + Math.random()*89999) + '</td></tr>'+
          '<tr><td style="font-weight:bold;">AFFECTED RECORDS:</td><td>Records in this category are temporarily inaccessible while we migrate to upgraded archive servers.</td></tr>'+
          '<tr><td style="font-weight:bold;">EST. RESTORATION:</td><td>IN PROGRESS &mdash; NO FIXED DATE. CHECK BACK PERIODICALLY.</td></tr>'+
        '</table>'+
        '<p><strong>We apologize for the inconvenience.</strong> The Public Accountability Footage Archive (PAFA) is a <strong>non-profit, volunteer-operated public records project</strong>. We are currently in the process of migrating and upgrading our archive servers to improve reliability and expand storage capacity for new footage records.</p>'+
        '<p>All footage hosted by PAFA is <strong>original, unaltered law enforcement and public safety footage</strong> obtained through official agency releases, public records requests, and authorized distributions. This footage is preserved for <strong>public accountability, academic research, journalism, and legal reference</strong> at no cost to the public.</p>'+
        '<p><strong>NOTE ON SUBTITLES:</strong> Some records in this archive contain embedded subtitles or captions. These are <strong>original subtitles added by the releasing agency</strong> &mdash; they are not added, edited, or altered by PAFA. We present all footage exactly as received from the source agency. This is the original file.</p>'+
        '<p style="background:#fffbe6;border-left:4px solid #cc8800;padding:6px 10px;font-size:11px;">&#9829; <strong>PAFA is a non-profit archive.</strong> If you find this resource valuable, please consider <a href="index.html#donate-section" style="color:#883300;font-weight:bold;">making a donation</a> to help cover our server and operating costs. All contributions go directly to archive maintenance.</p>'+
        '<p><a href="browse.html" style="color:#003366;font-weight:bold;">&#171; Return to Browse</a> &nbsp; | &nbsp; <a href="index.html" style="color:#003366;">&#171; Return to Home</a></p>'+
      '</div>'+
    '</div>';
    
  } else {
    page.forEach(function(e) { html += buildEntryHTML(e); });
  }

  listEl.innerHTML = html;

  var paginationEl = document.getElementById('pagination');
  if (paginationEl) {
    paginationEl.innerHTML = buildPaginationHTML(browseCurrentPage, totalPages, 'goToPage');
  }
}

function goToPage(n) {
  browseCurrentPage = n;
  renderBrowsePage();
  window.scrollTo(0, 0);
}

// ============================================================
// PAGE: SUBMIT
// ============================================================

function handleSubmit(event) {
  event.preventDefault();

  var errEl  = document.getElementById('msg-error');
  var succEl = document.getElementById('msg-success');
  var errTxt = document.getElementById('error-text');

  // Hide messages
  errEl.style.display  = 'none';
  succEl.style.display = 'none';

  // Read fields
  var title    = trim(document.getElementById('f-title').value);
  var cat      = trim(document.getElementById('f-cat').value);
  var url      = trim(document.getElementById('f-url').value);
  var platform = trim(document.getElementById('f-platform').value);
  var desc     = trim(document.getElementById('f-desc').value);
  var agree    = document.getElementById('f-agree').checked;

  var incidentDate = trim(document.getElementById('f-incident-date').value);
  var location     = trim(document.getElementById('f-location').value);
  var agency       = trim(document.getElementById('f-agency').value);
  var source       = trim(document.getElementById('f-source').value);

  // Content warnings
  var cwCheckboxes = document.querySelectorAll('input[name="cw[]"]:checked');
  var contentWarnings = [];
  cwCheckboxes.forEach(function(cb) { contentWarnings.push(cb.value); });

  // Validation
  var errors = [];
  if (!title)    errors.push('Title is required.');
  if (!cat)      errors.push('Category is required.');
  if (!url)      errors.push('Footage URL is required.');
  if (!platform) errors.push('Video Platform is required.');
  if (!desc || desc.length < 20) errors.push('Description is required and must be at least 20 characters.');
  if (!agree)    errors.push('You must confirm the submission terms.');

  if (url && !isValidUrl(url)) {
    errors.push('Footage URL does not appear to be a valid URL. Include http:// or https://.');
  }

  if (title.length > 200) errors.push('Title must be 200 characters or less.');
  if (desc.length  > 2000) errors.push('Description must be 2000 characters or less.');

  if (errors.length > 0) {
    errTxt.innerHTML = errors.map(function(e) { return '&bull; ' + e; }).join('<br />');
    errEl.style.display = 'block';
    errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Build entry
  var entry = {
    title:            title,
    category:         cat,
    url:              url,
    platform:         platform,
    description:      desc,
    incident_date:    incidentDate || null,
    location:         location     || null,
    agency:           agency       || null,
    source:           source       || null,
    content_warnings: contentWarnings
  };

  try {
    addEntry(entry);
  } catch(e) {
    errTxt.innerHTML = 'A storage error occurred. Your browser may have insufficient localStorage space.';
    errEl.style.display = 'block';
    return;
  }

  // Show success
  succEl.style.display = 'block';
  succEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Reset form
  document.getElementById('submit-form').reset();

  // Update stats
  updateStats();
}

// ============================================================
// STATS
// ============================================================

function updateStats() {
  var entries = loadEntries();
  var counts = {
    bodycam: 0, police: 0, cctv: 0, dashcam: 0,
    bystander: 0, helicopter: 0, courtroom: 0, other: 0
  };

  // Count pinned entries
  PINNED_ENTRIES.forEach(function(e) {
    var cat = e.category || 'other';
    if (counts.hasOwnProperty(cat)) counts[cat]++;
    else counts.other++;
  });

  // Count user entries
  entries.forEach(function(e) {
    var cat = e.category || 'other';
    if (counts.hasOwnProperty(cat)) {
      counts[cat]++;
    } else {
      counts.other++;
    }
  });

  // Baseline archive figures (remaining records on servers undergoing maintenance)
  var baseline = {
    bodycam: 17, police: 9, cctv: 14, dashcam: 6, bystander: 5, other: 4
  };

  var set = function(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  var totalLive   = entries.length + PINNED_ENTRIES.length;
  var bCam        = counts.bodycam  + baseline.bodycam;
  var pol         = counts.police   + baseline.police;
  var cctv        = counts.cctv     + baseline.cctv;
  var dash        = counts.dashcam  + baseline.dashcam;
  var byst        = counts.bystander + baseline.bystander;
  var other       = counts.courtroom + counts.helicopter + counts.other + baseline.other;
  var grandTotal  = bCam + pol + cctv + dash + byst + other;

  set('stat-total',     grandTotal);
  set('stat-bodycam',   bCam);
  set('stat-police',    pol);
  set('stat-cctv',      cctv);
  set('stat-dashcam',   dash);
  set('stat-bystander', byst);
  set('stat-other',     other);

  var tc = document.getElementById('total-count');
  if (tc) tc.textContent = grandTotal;
}

// ============================================================
// REPORTING
// ============================================================

function reportEntry(id) {
  var reason = prompt(
    'REPORT SUBMISSION: ' + id + '\n\n' +
    'Please briefly describe why you are reporting this submission:\n' +
    '(e.g., broken link, fabricated content, inappropriate, etc.)'
  );
  if (reason === null) return; // cancelled
  if (!reason.trim()) {
    alert('A reason is required to submit a report.');
    return;
  }
  // Store reports in localStorage
  try {
    var reports = JSON.parse(localStorage.getItem('pafa_reports') || '[]');
    reports.push({
      entry_id: id,
      reason: reason.trim(),
      reported_at: new Date().toISOString()
    });
    localStorage.setItem('pafa_reports', JSON.stringify(reports));
    alert('Report submitted for entry ' + id + '. Thank you.\n\nThe archive administrator will review this entry.');
  } catch(e) {
    alert('Could not save report.');
  }
}

// Admin utility: view all reports
function viewReports() {
  var reports = JSON.parse(localStorage.getItem('pafa_reports') || '[]');
  console.table(reports);
  return reports;
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function trim(s) {
  return (s || '').replace(/^\s+|\s+$/g, '');
}

function isValidUrl(s) {
  try {
    var url = new URL(s);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch(e) {
    return false;
  }
}

function escapeHtml(s) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(s) {
  return (s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ============================================================
// NOTIFICATION SUBSCRIPTIONS
// ============================================================

var NOTIFY_KEY = 'pafa_notifications';

/**
 * Load all notification subscriptions.
 * @returns {Array}
 */
function loadSubscriptions() {
  try {
    return JSON.parse(localStorage.getItem(NOTIFY_KEY) || '[]');
  } catch(e) { return []; }
}

/**
 * Handle notification signup form submission.
 * @param {Event} event
 * @param {string} formId - 'sidebar' or 'main'
 */
function subscribeNotify(event, formId) {
  event.preventDefault();
  var emailEl = document.getElementById('notify-email-' + formId);
  var catEl   = document.getElementById('notify-cat-'   + formId);
  var resultEl = document.getElementById('notify-' + formId + '-result');

  var email = (emailEl ? emailEl.value : '').trim();
  var cat   = catEl   ? catEl.value   : 'all';

  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    if (resultEl) {
      resultEl.innerHTML = '<p class="msg-error" style="display:block; margin:4px 0;">Please enter a valid email address.</p>';
    }
    return;
  }

  var subs = loadSubscriptions();
  var alreadyExists = subs.some(function(s) {
    return s.email.toLowerCase() === email.toLowerCase() && s.category === cat;
  });

  if (!alreadyExists) {
    subs.push({
      email: email,
      category: cat,
      subscribed_at: new Date().toISOString()
    });
    localStorage.setItem(NOTIFY_KEY, JSON.stringify(subs));
  }

  var catNames = {
    all: 'All New Footage', bodycam: 'Body Camera Only',
    police: 'Police Footage Only', cctv: 'CCTV Only'
  };

  if (resultEl) {
    resultEl.innerHTML =
      '<div class="msg-success" style="display:block; margin:6px 0; font-size:11px;">'+
        '&#10003; Subscribed! You will be notified for: <strong>' + (catNames[cat] || cat) + '</strong>.'+
        (alreadyExists ? ' (Already subscribed.)' : '')+
      '</div>';
  }

  // Reset fields
  if (emailEl) emailEl.value = '';

  // Update the current subscriptions display (main form only)
  renderCurrentSubscriptions();
}

/**
 * Render the list of current subscriptions (main notify form).
 */
function renderCurrentSubscriptions() {
  var listEl = document.getElementById('notify-current-list');
  if (!listEl) return;
  var subs = loadSubscriptions();
  if (subs.length === 0) {
    listEl.innerHTML = '<p class="small-note">None yet.</p>';
    return;
  }
  var catNames = {
    all: 'All New Footage', bodycam: 'Body Camera Only',
    police: 'Police Footage Only', cctv: 'CCTV Only'
  };
  var html = '<table class="stats-table" width="100%" cellpadding="3" cellspacing="0" border="1" style="margin-top:6px;">';
  html += '<tr style="background-color:#336699; color:#fff;"><th>Email</th><th>Category</th><th></th></tr>';
  subs.forEach(function(s, idx) {
    html += '<tr><td>' + escapeHtml(s.email) + '</td>' +
            '<td>' + escapeHtml(catNames[s.category] || s.category) + '</td>' +
            '<td><a href="#" onclick="unsubscribe(' + idx + '); return false;" style="color:#cc0000;">Remove</a></td></tr>';
  });
  html += '</table>';
  listEl.innerHTML = html;
}

/**
 * Remove a subscription by index.
 * @param {number} idx
 */
function unsubscribe(idx) {
  var subs = loadSubscriptions();
  subs.splice(idx, 1);
  localStorage.setItem(NOTIFY_KEY, JSON.stringify(subs));
  renderCurrentSubscriptions();
}

// ============================================================
// ADMIN CONSOLE HELP
// ============================================================

console.log(
  '%c[PAFA] Admin Console API\n\n' +
  'removeEntry("PAFA-000001")          - Delete an entry by ID\n' +
  'updateEntry("PAFA-000001", {...})    - Update fields of an entry\n' +
  'importEntries([{...}], false)        - Bulk import (false = append, true = replace all)\n' +
  'exportEntries()                      - Export all entries as JSON\n' +
  'clearAllEntries()                    - Delete ALL entries (irreversible)\n' +
  'viewReports()                        - View all flagged/reported records\n' +
  'loadEntries()                        - Return raw entries array\n' +
  'loadSubscriptions()                  - View all notification subscriptions\n\n' +
  '--- TO UPDATE VIMEO URL FOR PINNED ENTRY PAFA-PINNED-001 ---\n' +
  'Edit app.js: find PINNED_ENTRIES[0].url and replace "#video-pending-upload" with the Vimeo URL.\n' +
  'Also set PINNED_ENTRIES[0].url_pending = false  to activate the watch button.',
  'color: #003366; font-family: monospace; font-size: 12px;'
);

// Auto-inject modal and load subscriptions display on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    injectModalDOM();
    renderCurrentSubscriptions();
  });
} else {
  injectModalDOM();
  renderCurrentSubscriptions();
}
