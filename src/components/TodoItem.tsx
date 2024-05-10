/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classs';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from './TodoContext';

type Props = {
  todo: Todo;
  isLoading: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, isLoading }) => {
  const { title, completed, id } = todo;
  const { deleteTodo, updateTodo } = useContext(TodoContext);
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    switch (newTitle.trim()) {
      case '':
        deleteTodo(id)
          .finally(() => setIsEditing(false));

        break;

      case title:
        handleEditCancel();
        break;

      case newTitle:
      default:
        updateTodo({
          ...todo, title: newTitle.trim(),
        })
          .finally(() => setIsEditing(false));
    }
  };

  const handleStatusChange = () => {
    updateTodo({ ...todo, completed: !completed });
  };

  return (
    <div
      data-cy="Todo"
      class={cn('todo', { completed }, { editing: isEditing })}
      key={id}
    >
      <label
        class="todo__status-label"
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          class="todo__status"
          checked={completed}
          onChange={handleStatusChange}
        />
      </label>

      {isEditing
        ? (
          <form onSubmit={handleEditSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              class="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onBlur={handleEditSubmit}
              onKeyUp={(e) => e.key === 'Escape' && handleEditCancel()}
              ref={inputRef}
            />
          </form>
        )
        : (
          <>
            <span
              data-cy="TodoTitle"
              class="todo__title"
              onDoubleClick={() => setIsEditing(true)}
            >
              {title}
            </span>
            <button
              type="button"
              class="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(id)}
            >
              ×
            </button>
          </>
        )}

      <div
        data-cy="TodoLoader"
        class={cn(
          'modal overlay',
          { 'is-active': isLoading || id === 0 },
        )}
      >
        <div class="modal-background has-background-white-ter" />
        <div class="loader" />
      </div>
    </div>
  );
};
