import { useEffect, useState } from 'react';
import { Button, MenuItem, Select, InputLabel, FormControl, Drawer, Box } from '@mui/material';
import { fetchOrders, fetchSpecimens, fetchSourceDescriptions, fetchPatients, fetchLocations, postRecord, fetchRecords } from '../utils/axios';
import { Order, Specimen, SourceDescription, Patient, Location, Record } from '../types/api';
import { SelectChangeEvent } from '@mui/material/Select';

interface DynamicFormProps {
  onAddRecord: (record: Record) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ onAddRecord }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [specimens, setSpecimens] = useState<Specimen[]>([]);
  const [sourceDescriptions, setSourceDescriptions] = useState<SourceDescription[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | ''>('');
  const [selectedSpecimen, setSelectedSpecimen] = useState<string | ''>('');
  const [selectedSourceDescription, setSelectedSourceDescription] = useState<string | ''>('');
  const [selectedPatient, setSelectedPatient] = useState<string | ''>('');
  const [selectedLocation, setSelectedLocation] = useState<string | ''>('');
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const loadSpecimens = async () => {
      try {
        const fetchedSpecimens = await fetchSpecimens();
        setSpecimens(fetchedSpecimens);
      } catch (error) {
        console.error("Error fetching specimens:", error);
      }
    };

    const loadSourceDescriptions = async () => {
      try {
        const fetchedSourceDescriptions = await fetchSourceDescriptions();
        setSourceDescriptions(fetchedSourceDescriptions);
      } catch (error) {
        console.error("Error fetching source descriptions:", error);
      }
    };

    const loadLocations = async () => {
      try {
        const fetchedLocations = await fetchLocations();
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const loadPatients = async () => {
      try {
        const fetchedPatients = await fetchPatients();
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    loadOrders();
    loadSpecimens();
    loadSourceDescriptions();
    loadLocations();
    loadPatients();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string | ''>>) => (event: SelectChangeEvent<string | ''>) => {
    const value = event.target.value as string | '';
    setter(value);
  };

  const [rows, setRows] = useState<Record[]>([]);

  const handleAdd = async () => {
    if (selectedOrder && selectedSpecimen && selectedSourceDescription && selectedPatient && selectedLocation) {
      const newRecord: Record = {
        id: 0, // Assuming ID is auto-generated
        orderCode: orders.find(o => o.order_code === selectedOrder)?.order_code ?? 'Unknown',
        orderName: orders.find(o => o.order_code === selectedOrder)?.order_name ?? 'Unknown',
        orderLOINCCode: orders.find(o => o.order_code === selectedOrder)?.order_loinc_code ?? 'Unknown',
        loincName: orders.find(o => o.order_code === selectedOrder)?.loinc_name ?? 'Unknown',
        orderLOINCDescription: orders.find(o => o.order_code === selectedOrder)?.order_loinc_description ?? 'Unknown',
        specimenID: specimens.find(s => s.specimen_id === selectedSpecimen)?.specimen_id ?? 'Unknown',
        specimenType: specimens.find(s => s.specimen_id === selectedSpecimen)?.specimen_type ?? 'Unknown',
        specimenTypeSNOMEDCode: specimens.find(s => s.specimen_id === selectedSpecimen)?.specimen_type_snomed_code ?? 'Unknown',
        sourceDescription: sourceDescriptions.find(s => s.source_description === selectedSourceDescription)?.source_description ?? 'Unknown',
        specimenSource: sourceDescriptions.find(s => s.source_description === selectedSourceDescription)?.specimen_source ?? 'Unknown',
        sourceSNOMEDCode: sourceDescriptions.find(s => s.source_description === selectedSourceDescription)?.source_snomed_code ?? 'Unknown',
        patientID: patients.find(p => p.patient_id === selectedPatient)?.patient_id ?? 'Unknown',
        patientFirstName: patients.find(p => p.patient_id === selectedPatient)?.first_name ?? 'Unknown',
        patientMiddleName: patients.find(p => p.patient_id === selectedPatient)?.middle_name ?? 'Unknown',
        patientLastName: patients.find(p => p.patient_id === selectedPatient)?.last_name ?? 'Unknown',
        patientGender: patients.find(p => p.patient_id === selectedPatient)?.gender ?? 'Unknown',
        dob: patients.find(p => p.patient_id === selectedPatient)?.dob ?? 'Unknown',
        addressLine1: patients.find(p => p.patient_id === selectedPatient)?.address_line1 ?? 'Unknown',
        addressLine2: patients.find(p => p.patient_id === selectedPatient)?.address_line2 ?? 'Unknown',
        city: patients.find(p => p.patient_id === selectedPatient)?.city ?? 'Unknown',
        state: patients.find(p => p.patient_id === selectedPatient)?.state ?? 'Unknown',
        zip: patients.find(p => p.patient_id === selectedPatient)?.zip ?? 'Unknown',
        email: patients.find(p => p.patient_id === selectedPatient)?.email ?? 'Unknown',
        phoneNumber: patients.find(p => p.patient_id === selectedPatient)?.phone_number ?? 'Unknown',
        race: patients.find(p => p.patient_id === selectedPatient)?.race ?? 'Unknown',
        ethnicity: patients.find(p => p.patient_id === selectedPatient)?.ethnicity ?? 'Unknown',
        entry: 'default', // Adjust as needed
        env: 'default', // Adjust as needed
        extractFlag: 'default', // Adjust as needed
      };

      try {
        await postRecord(newRecord); // Save the new record to the backend
        onAddRecord(newRecord); // Pass the new record to the parent component

        // Refresh the Data Grid by fetching the updated data
        const updatedRecords = await fetchRecords();
        setRows(updatedRecords);

        // Optionally clear selections
        setSelectedOrder('');
        setSelectedSpecimen('');
        setSelectedSourceDescription('');
        setSelectedPatient('');
        setSelectedLocation('');
      } catch (error) {
        console.error("Error adding record:", error);
      }
    } else {
      console.error("All fields must be selected");
    }
  };

  const handleDiscard = () => {
    setSelectedOrder('');
    setSelectedSpecimen('');
    setSelectedSourceDescription('');
    setSelectedPatient('');
    setSelectedLocation('');
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ width: 400 }}
      >
        <Box sx={{ width: 400, padding: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Order</InputLabel>
            <Select
              value={selectedOrder}
              onChange={handleChange(setSelectedOrder)}
            >
              {orders.map(order => (
                <MenuItem key={order.order_code} value={order.order_code}>{order.order_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Specimen</InputLabel>
            <Select
              value={selectedSpecimen}
              onChange={handleChange(setSelectedSpecimen)}
            >
              {specimens.map(specimen => (
                <MenuItem key={specimen.specimen_id} value={specimen.specimen_id}>{specimen.specimen_type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Source Description</InputLabel>
            <Select
              value={selectedSourceDescription}
              onChange={handleChange(setSelectedSourceDescription)}
            >
              {sourceDescriptions.map(sourceDescription => (
                <MenuItem key={sourceDescription.source_description} value={sourceDescription.source_description}>{sourceDescription.source_description}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Patient</InputLabel>
            <Select
              value={selectedPatient}
              onChange={handleChange(setSelectedPatient)}
            >
              {patients.map(patient => (
                <MenuItem key={patient.patient_id} value={patient.patient_id}>{`${patient.first_name} ${patient.last_name}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Location</InputLabel>
            <Select
              value={selectedLocation}
              onChange={handleChange(setSelectedLocation)}
            >
              {locations.map(location => (
                <MenuItem key={location.location_id} value={location.location_id}>{location.district}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
          <Button variant="outlined" color="secondary" onClick={handleDiscard}>Discard</Button>
        </Box>
      </Drawer>
    </>
  );
};

export default DynamicForm;
