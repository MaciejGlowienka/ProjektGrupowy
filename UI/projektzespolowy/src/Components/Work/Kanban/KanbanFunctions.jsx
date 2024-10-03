//************************ handleOnDragEnd ************************

export const handleOnDragEnd = (result, columns, setColumns) => {
    
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId)
        moveToDifferentPlace(source, destination, columns, setColumns);
    else 
        moveToDifferentColumn(source, destination, columns, setColumns);
  };

  function moveToDifferentColumn(source, destination, columns, setColumns){
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  }

  function moveToDifferentPlace(source, destination, columns, setColumns){
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];

    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }

  //************************ 