import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import './kanban.css';
import { handleOnDragEnd, handleTaskUpdated } from './KanbanFunctions';

const KanbanBoard = ({ columns = {}, setColumns = () => {}, onRemoveTask }) => {
    return (
        <DragDropContext
            onDragEnd={(result) => handleOnDragEnd(result, columns, setColumns)}
        >
            <div className="tasks-column">
                {Object.entries(columns).map(([columnId, column]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                        {(provided) => (
                            <div
                                className="tasks-list"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <div className="title">{column.title}</div>
                                {column.items?.map((item, index) => (
                                    <TaskCard
                                        key={item.id || index}
                                        item={item}
                                        index={index}
                                        onRemove={onRemoveTask}
                                        onTaskUpdated={(updatedTask) =>
                                            handleTaskUpdated(updatedTask, columns, setColumns)
                                        }
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
