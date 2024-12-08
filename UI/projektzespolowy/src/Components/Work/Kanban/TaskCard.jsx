import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CiEdit, CiCircleRemove, CiCircleInfo } from "react-icons/ci";
import TaskEditModal from './TaskEditModal';

const TaskCard = ({ item, index, onRemove, onTaskUpdated }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const isOverdue = new Date(item.dueDate) < new Date();

    return (
        <>
            <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                {(provided) => (
                    <div
                        className={`task ${isOverdue ? 'task-overdue' : ''}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className="task-header">
                            <p>{item.id}</p>
                            <div className="task-icons">
                                <CiCircleInfo onClick={() => console.log(`Detail ${item.id}`)} />
                                <CiEdit onClick={handleEditClick} />
                                <CiCircleRemove onClick={() => onRemove(item.id)} />
                            </div>
                        </div>
                        <div className="task-information">
                            <p>{item.title}</p>
                            <p>{item.summary}</p>
                            <div className="task-information-secondary-details">
                                <p>
                                    <span>
                                        {new Date(item.dueDate).toLocaleDateString('en-us', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
            <TaskEditModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                taskId={item.id}
                onTaskUpdated={onTaskUpdated}
            />
        </>
    );
};

export default TaskCard;
