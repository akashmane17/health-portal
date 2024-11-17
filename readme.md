# Assignment

Health consulting platform where doctors prescribe guidance and necessory instructions to patients.

## Features

(All users)

- Sign In
- Sing Up
- Home

(Doctor)

- View Prescriptions
- Add/Edit Prescriptions
- Get Pdf Prescriptions

(Patient)

- View Consultations
- Add Consultations to doctor
- Get Pdf Prescripted by doctor
  (Generated PDF are stored on server inside folder name "docs")

(Admin)

- Can create more admin users

## Backend Routes

(Auth Routes)

- api/auth/signup POST
- api/auth/signin POST
- api/auth/logged-in-user GET
- api/auth//logout POST

(Doctor Routes)

- api/doctors/all GET (Get all doctors)
- api/doctors/:id GET (Get doctor by id)
- api/doctors/consultation POST (Post consultation)
- api/doctors/consultation/:id GET (Get consultation by Id)
- api/doctors/prescription/:id PUT (Add or Edit prescription)
- api/doctors/prescription/:consultationId GET (Get prescription by consultationId)

(Patients Routes)

- api/doctors/consultation/:id GET (Get consultation by PatientId)
- api/patients/all GET (Get all patients)
- api/patients/:id GET (Get patients by id)
