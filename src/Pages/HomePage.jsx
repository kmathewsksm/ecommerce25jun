import React from "react";

export function HomePage() {
  return (
    <Row>
      <Col md={3} className="categoriessidepanel">
        <h3></h3>
        <hr />
        <Button variant="primary" onClick={handleAddNewTask} className="mb-3">
          <FaPlus /> Add New Task
        </Button>
        <TaskList
          tasks={tasks}
          onSelectTask={handleSelectedTask}
          onDeleteTask={handleDeleteCurrentTask}
        />
      </Col>
      <Col md={9} className="taskDetails">
        {selectedTask ? (
          <TaskDetails task={selectedTask} onSaveTask={handleSaveCurrentTask} />
        ) : (
          <div>No item selected</div>
        )}
      </Col>
    </Row>
  );
}
