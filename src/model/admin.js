const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  Password: {
    type: String,
    required: false,
  },
  Username: {
    type: String,
    required: false,
  },
  Fire: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },
  Speed: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },

  Boundry: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },
  Intrusion: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },
  Lane: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },

  Crowd: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },

  Safety: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },
  ANPR: {
    SMS: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: Boolean,
      default: false,
    },
    Buzzer: {
      type: Boolean,
      default: false,
    },
  },
  active_usecases: {
    Fire: {
      type: Boolean,
      default: false,
    },
    Speed: {
      type: Boolean,
      default: false,
    },
    Boundry: {
      type: Boolean,
      default: false,
    },
    Intrusion: {
      type: Boolean,
      default: false,
    },
    Crowd: {
      type: Boolean,
      default: false,
    },
    Safety: {
      type: Boolean,
      default: false,
    },
    lane_voilations: {
      type: Boolean,
      default: false,
    },
  },
  client_id: {
    type: String,
  },
  Email: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "admin",
  },
  login_log: {
    last_login: {
      date: String, // Array of dates
      time: String, // Array of times
    },

    current_login: {
      date: String,
      time: String,
    },
  },
});

const AdminModel =
  mongoose.models.admins || mongoose.model("admins", AdminSchema);

module.exports = AdminModel;
