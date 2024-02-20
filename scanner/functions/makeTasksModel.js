function makeTasksModel() {
  return {
    model: {
      entity: uuid(),
      version: "1",
      service: "taskapp",
    },
    attributes: {
      task: {
        type: "string",
        // default: () => uuid(),
      },
      project: {
        type: "string",
        required: true,
      },
      employee: {
        type: "string",
      },
      description: {
        type: "string",
      },
      points: {
        type: "number",
      },
      type: {
        type: ["story", "defect", "epic"],
      },
      comments: {
        type: "any",
      },
    },
    indexes: {
      task: {
        pk: {
          field: "pk",
          composite: ["task"],
        },
        sk: {
          field: "sk",
          composite: ["project", "employee"],
        },
      },
      projects: {
        index: "gsi1pk-gsi1sk-index",
        pk: {
          field: "gsi1pk",
          composite: ["project"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["employee", "task"],
        },
      },
      assigned: {
        collection: "assignments",
        index: "gsi2pk-gsi2sk-index",
        pk: {
          field: "gsi2pk",
          composite: ["employee"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["project", "points"],
        },
      },
    },
  };
}