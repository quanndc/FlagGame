import firestore from '@react-native-firebase/firestore';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export const createRank = (uid, data) => {
  return firestore()
  .collection('Rank')
  .doc(uid)
  .set(data, { merge: true });
}

export const updateRank = (uid, data) => {
  return firestore()
  .collection('Rank')
  .doc(uid)
  .update(data);
}

export const getRankById = async (uid) => {
  return await firestore()
  .collection('Rank')
  .doc(uid)
  .get();
}


export const createUser = (uid, data) => {
  return firestore()
    .collection('Users')
    .doc(uid)
    .set(data, { merge: true });
}

export const getUserById = async (uid) => {
  return await firestore()
    .collection('Users')
    .doc(uid)
    .get();
}

export const updateScore = (uid, data) => {
  return firestore()
    .collection('Users')
    .doc(uid)
    .update(data);
}

export const getAllUsers = async () => {
  return await firestore()
    .collection('Users')
    .get();
}

export const getScore = async (uid) => {
  return await firestore()
    .collection('Users')
    .doc(uid)
    .get();

}

export const createQuiz = (currentQuizId, title, description) => {
  return firestore().collection('Quizz').doc(currentQuizId).set({
    title,
    description,
  });
};

// Create new question for current quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firestore()
    .collection('Quizz')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question);
};

// Get All Quizzes
export const getQuizzes = async () => {
  return await firestore().collection('Quizz').get();
};

// Get Quiz Details by id
export const getQuizById = async currentQuizId => {
  return await firestore().collection('Quizz').doc(currentQuizId).get();
};


const numberOfUsers = 10;
    const randomIndex = Math.floor(Math.random() * numberOfUsers);
// Get Questions by currentQuizId
export const getQuestionsByQuizId = async currentQuizId => {
  return await firestore()
    .collection('Quizz')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
};



// Get All Quizzes
export const getQuizzes_2 = async () => {
  return await firestore().collection('Quizz_2').get();
};

// Get Quiz Details by id
export const getQuizById_2 = async currentQuizId => {
  return await firestore().collection('Quizz_2').doc(currentQuizId).get();
};


// const numberOfUsers = 10;
    // const randomIndex = Math.floor(Math.random() * numberOfUsers);
// Get Questions by currentQuizId
export const getQuestionsByQuizId_2 = async currentQuizId => {
  return await firestore()
    .collection('Quizz_2')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
};