export interface Order {
    order_code: string;
    order_name: string;
    order_loinc_code: string;
    loinc_name: string;
    order_loinc_description: string;
  }
  
  export interface Specimen {
    specimen_id: string;
    specimen_type: string;
    specimen_type_snomed_code: string;
  }
  
  export interface SourceDescription {
    source_description: string;
    specimen_source: string;
    source_snomed_code: string;
  }
  
  export interface Patient {
    patient_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    gender: string;
    dob: string;  // Assuming date is in a string format (e.g., "YYYY-MM-DD")
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone_number: string;
    race: string;
    ethnicity: string;
  }
  
  export interface Location {
    location_id: string;
    district: string;
    test_location: string;
  }
  
  export interface OtherDetails {
    entry_id: string;
    env: string;
    extract_flag: string;
  }
  
  export interface Record {
    id: number;
    orderCode: string;
    orderName: string;
    orderLOINCCode: string;
    loincName: string;
    orderLOINCDescription: string;
    specimenID: string;
    specimenType: string;
    specimenTypeSNOMEDCode: string;
    sourceDescription: string;
    specimenSource: string;
    sourceSNOMEDCode: string;
    patientID: string;
    patientFirstName: string;
    patientMiddleName: string;
    patientLastName: string;
    patientGender: string;
    dob: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phoneNumber: string;
    race: string;
    ethnicity: string;
    entry: string;
    env: string;
    extractFlag: string;
  }  