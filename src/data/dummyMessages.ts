import type { ChatMessage } from "@/types/chat";

export const dummyChatMessages: ChatMessage[] = [
  {
    id: "dummy-chat-1",
    message: "Hey everyone! How's the sauna today?",
    type: "chat",
    timestamp: new Date("2024-02-20T10:00:00"),
    user: {
      name: "SaunaLover",
      avatar: "",
      experience: "Expert"
    }
  },
  {
    id: "dummy-chat-2",
    message: "Just had an amazing session at Helsinki Sauna!",
    type: "chat",
    timestamp: new Date("2024-02-20T10:30:00"),
    user: {
      name: "SaunaEnthusiast",
      avatar: "",
      experience: "Intermediate"
    }
  },
  {
    id: "dummy-chat-3",
    message: "The community here is so welcoming!",
    type: "chat",
    timestamp: new Date("2024-02-20T11:00:00"),
    user: {
      name: "NewSaunaFriend",
      avatar: "",
      experience: "Beginner"
    }
  },
  {
    id: "dummy-chat-4",
    message: "Anyone tried the new sauna in downtown?",
    type: "chat",
    timestamp: new Date("2024-02-20T11:30:00"),
    user: {
      name: "CityExplorer",
      avatar: "",
      experience: "Intermediate"
    }
  },
  {
    id: "dummy-chat-5",
    message: "Love the traditional löyly techniques shared here!",
    type: "chat",
    timestamp: new Date("2024-02-20T12:00:00"),
    user: {
      name: "TraditionKeeper",
      avatar: "",
      experience: "Expert"
    }
  }
];

export const dummyTipMessages: ChatMessage[] = [
  {
    id: "dummy-tip-1",
    message: "Remember to stay hydrated during your sauna sessions!",
    type: "tip",
    timestamp: new Date("2024-02-20T10:05:00"),
    user: {
      name: "WellnessGuru",
      avatar: "",
      experience: "Expert"
    }
  },
  {
    id: "dummy-tip-2",
    message: "The optimal temperature for a traditional Finnish sauna is between 80-100°C",
    type: "tip",
    timestamp: new Date("2024-02-20T10:15:00"),
    user: {
      name: "SaunaMaster",
      avatar: "",
      experience: "Expert"
    }
  },
  {
    id: "dummy-tip-3",
    message: "Always take a shower before entering the sauna - it's proper etiquette!",
    type: "tip",
    timestamp: new Date("2024-02-20T10:45:00"),
    user: {
      name: "EtiquetteExpert",
      avatar: "",
      experience: "Expert"
    }
  },
  {
    id: "dummy-tip-4",
    message: "For beginners, start with 10-15 minutes sessions and gradually increase",
    type: "tip",
    timestamp: new Date("2024-02-20T11:15:00"),
    user: {
      name: "SaunaCoach",
      avatar: "",
      experience: "Expert"
    }
  },
  {
    id: "dummy-tip-5",
    message: "Cool down gradually between sessions - don't shock your body",
    type: "tip",
    timestamp: new Date("2024-02-20T11:45:00"),
    user: {
      name: "WellnessAdvocate",
      avatar: "",
      experience: "Expert"
    }
  }
];

export const dummyRequestMessages: ChatMessage[] = [
  {
    id: "dummy-request-1",
    message: "Looking for a sauna buddy this evening at Helsinki Sauna Club",
    type: "request",
    timestamp: new Date("2024-02-20T10:10:00"),
    user: {
      name: "SaunaNewbie",
      avatar: "",
      experience: "Beginner"
    }
  },
  {
    id: "dummy-request-2",
    message: "Anyone interested in a morning sauna session tomorrow?",
    type: "request",
    timestamp: new Date("2024-02-20T10:20:00"),
    user: {
      name: "EarlySaunabird",
      avatar: "",
      experience: "Intermediate"
    }
  },
  {
    id: "dummy-request-3",
    message: "Looking for experienced sauna enthusiasts to share techniques",
    type: "request",
    timestamp: new Date("2024-02-20T10:50:00"),
    user: {
      name: "LearningLover",
      avatar: "",
      experience: "Beginner"
    }
  },
  {
    id: "dummy-request-4",
    message: "Weekend sauna group forming - join us!",
    type: "request",
    timestamp: new Date("2024-02-20T11:20:00"),
    user: {
      name: "WeekendWarrior",
      avatar: "",
      experience: "Intermediate"
    }
  },
  {
    id: "dummy-request-5",
    message: "Seeking sauna meditation group partners",
    type: "request",
    timestamp: new Date("2024-02-20T11:50:00"),
    user: {
      name: "ZenSeeker",
      avatar: "",
      experience: "Expert"
    }
  }
];

export const allDummyMessages = [
  ...dummyChatMessages,
  ...dummyTipMessages,
  ...dummyRequestMessages
];