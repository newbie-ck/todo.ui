import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="hero">
        <div class="hero-content">
            <h1>Welcome to Todo List Application</h1>
            <p>Stay organized and keep track of tasks with ease.</p>
            <a routerLink="/todos" class="btn">Start Managing Tasks</a>
        </div>
    </section>
  `,
  styles: [
    `
      #hero {
        background-color: #007bff;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        text-align: center;
        padding: 0 20px;
      }

      #hero .hero-content h1 {
        font-size: 3.5em;
      }

      #hero .hero-content p {
        font-size: 1.4em;
        margin-bottom: 20px;
      }

      #hero .btn {
        background-color: #fff;
        color: #007bff;
        padding: 12px 25px;
        font-size: 1.2em;
        border-radius: 5px;
        transition: background-color 0.3s;
      }

      #hero .btn:hover {
        background-color: #0056b3;
        color: #fff;
      }
    `
  ]
})
export class HomeComponent {

}
