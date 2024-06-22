export type Image = { filename: string, originalname: string, _id?: string; }
export type Review = { review: string, rating: number, by: { user_id: string, fullname: string }, date: number, _id?: string; }
export type Owner = { user_id: string, fullname: string, email: string }
export type Medication = {
    _id?: string;
    name: string,
    first_letter: string,
    generic_name: string,
    medication_class: string,
    availability: string,
    image: Image,
    added_by: Owner,
    reviews: Review[]
}

export type MedNameType = {
    success: boolean,
    data: { _id: string, name: string }[]
}

export type MedByIDResType = {
    success: boolean,
    data: Medication
}

export type AddMedResType = {
    success: boolean,
    data: Medication
}
export type MedPostType = { name: string, generic_name: string, medication_class: string, availability: string }
export const MedicationInit = {
    _id: '',
    name: '',
    first_letter: '',
    generic_name: '',
    medication_class: '',
    availability: '',
    image: { filename: '', originalname: '', _id: '' },
    added_by: { user_id: '', fullname: '', email: '' },
    reviews: [{ review: '', rating: 0, by: { user_id: '', fullname: '' }, date: 0 }]
}

export type AddReviewResponse = { "success": boolean, "data": string }

export type BooleanResponse = { "success": boolean, "data": boolean }


 