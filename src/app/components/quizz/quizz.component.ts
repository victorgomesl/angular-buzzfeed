import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {

  tittle:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answersSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number =0

  finished:boolean = false



  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.tittle = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}
