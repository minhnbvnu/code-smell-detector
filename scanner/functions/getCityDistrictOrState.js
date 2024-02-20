function getCityDistrictOrState(patients, patientId) {
    return patients[patientId].city
        ? patients[patientId].city
        : (patients[patientId].district ? patients[patientId].district : (patients[patientId].state?patients[patientId].state:"No State"));
}