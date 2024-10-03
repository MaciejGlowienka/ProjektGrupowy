import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import "./kanban.css"
import {handleOnDragEnd} from "./KanbanFunctions"

const KanbanBoard = ({columns, setColumns}) => {
  return (
    <DragDropContext
      onDragEnd={(result) => handleOnDragEnd(result, columns, setColumns)}
    >
      <div className='tasks-container'>
        <div className='tasks-column'>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div className='tasks-list'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className='title'>{column.title}</div>
                    {column.items?.map((item, index) => (
                      <TaskCard key={item} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
