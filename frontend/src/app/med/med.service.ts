import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Development_environment } from '../../environments/environment.development';
import { AddMedResType, AddReviewResponse, BooleanResponse, MedByIDResType, MedNameType, Medication, Review } from '../typesGolbal';

@Injectable({
  providedIn: 'root'
})
export class MedService {
 #http = inject(HttpClient) 


 AddMedication(Med :FormData){
  return this.#http.post<AddMedResType>(Development_environment.url + '/medications', Med)
 }

 UpdateMedication(Med :FormData, MedId: string){
  return this.#http.put<BooleanResponse>(Development_environment.url + '/medications/' + MedId, Med)
 }

 getMedByLetter(letter: string){
  return this.#http.get<MedNameType>(Development_environment.url + '/medications?first_letter=' + letter)
 }

 Validate_name(check_name: string){
  return this.#http.get<BooleanResponse>(Development_environment.url + '/medications/checkname/' + check_name)
 }

 getMedByID(MedId: string){
  return this.#http.get<MedByIDResType>(Development_environment.url + '/medications/' + MedId)
 }
 
 deleteMed(MedId: string){
  return this.#http.delete<BooleanResponse>(Development_environment.url + '/medications/' + MedId)
 }
 
 AddReview(Review: {review: string; rating: number;}, MedId: string ){
  return this.#http.post<AddReviewResponse>(Development_environment.url + '/medications/' + MedId +"/reviews", Review)
 }
// PUT /medications/:medication_id/reviews/:review_id
UpdateReview(Review: {review: string; rating: number;}, MedId: string, review_id: string ){
  return this.#http.put<AddReviewResponse>(Development_environment.url + '/medications/' + MedId +"/reviews/" + review_id, Review)
 }
 GetReview(MedId: string ){
  return this.#http.get<AddReviewResponse>(Development_environment.url + '/medications/' + MedId +"/reviews")
 }
 
 deleteReview(MedId: string, review_id: string){
  return this.#http.delete<BooleanResponse>(Development_environment.url + '/medications/' + MedId + '/reviews/' + review_id)
 }
}
