import React, { Component } from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  state = initialData;

  onDragEnd = result => {
    // reorder our column
    console.log('result', result)
    const {destination, source, draggableId} = result;
    //if there is no destination, do nothing
    if(!destination) {
        return;
    }
    
    //if User drop item back to its original place, do nothing
    if(destination.droppablId === source.droppablId &&
    destination.index === source.index){
        return;
    }

    const column = this.state.columns[source.droppableId];
    

    //Array.from makes a copy of the array, so we don't mutate state
    const newTaskIds = Array.from(column.taskIds)
    //Remove 1 item from array at source index
    newTaskIds.splice(source.index, 1);
    //Add 1 item to array starting at destination index, putting in draggableId, the specific item
    newTaskIds.splice(destination.index, 0, draggableId);

    console.log('NEW tASK ARRAY', newTaskIds)

    const newColumn = {
        ...column,
        taskIds: newTaskIds
    }

    const newState = {
        ...this.state,
        columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn
        }
    }

    console.log('newstate', newState)

    this.setState(newState)
  }

  render() {
    console.log(this.state);
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      
      >
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
          // return column.title
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
