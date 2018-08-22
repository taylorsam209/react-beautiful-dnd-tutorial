import React, { Component } from "react";
import ReactDOM from "react-dom";
import initialData from "./initial-data";
import Column from "./column";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  state = initialData;

  onDragEnd = result => {
    // reorder our column
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

    const column = this.state.columns(source.droppablId || 'column-1');

    //Array.from makes a copy of the array, so we don't mutate state
    const newTaskIds = Array.from(column.taskIds)

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
