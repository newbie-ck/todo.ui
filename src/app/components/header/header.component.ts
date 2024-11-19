import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <span routerLink="/">{{ title() }}</span>
        <ul>
          <li routerLink="/todos">Todos</li>
        </ul>
      </nav>
    </header>
  `,
  styles: [
    `
      header {
        display: flex;
        padding-inline: 1rem;
        padding-block: 0.5rem;
        background-color: #0c4c7d;
        color: #fff;
        align-items: center;
        justify-content: space-between;

        nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          ul {
            list-style: none;

            li {
              cursor: pointer;
              &:hover {
                color: #777;
              }
            }
          }
        }
      }
    `
  ]
})
export class HeaderComponent {
  title = signal('Todo List Application')
}
