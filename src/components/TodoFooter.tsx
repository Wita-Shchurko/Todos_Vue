import cn from 'classs';
import { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodoContext } from './TodoContext';

export const TodoFooter: React.FC = () => {
  const {
    todos,
    filter,
    setFilter,
    deleteTodo,
  } = useContext(TodoContext);

  const activeTodoCount = todos.filter(todo => !todo.completed).length;
  const activeTodoCountMsg
    = `${activeTodoCount} ${activeTodoCount === 1 ? 'item' : 'items'} left`;

  const hasCompletedTodos = todos.some(todo => todo.completed);

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    const promises = completedTodos.map(todo => deleteTodo(todo.id));

    Promise.allSettled(promises);
  };

  if (!todos.length) {
    return <></>;
  }

  return (
    <footer class="todoapp__footer" data-cy="Footer">
      <span class="todo-count" data-cy="TodosCounter">
        {activeTodoCountMsg}
      </span>

      <nav class="filter" data-cy="Filter">
        <a
          href="#/"
          class={
            cn('filter__link', { selected: filter === Filter.ALL })
          }
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          class={
            cn('filter__link', { selected: filter === Filter.ACTIVE })
          }
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          class={
            cn('filter__link', { selected: filter === Filter.COMPLETED })
          }
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        class="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>

    </footer>
  );
};
