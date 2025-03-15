import axios from "axios";
import { useEffect, useState } from "react";
import EditQuestionForm from "./EditQuestion";

const BACKEND_URL =
  "https://b865-2405-4802-811e-11a0-875-581e-b53-2910.ngrok-free.app";

export default function QuestionDashboard() {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    skinType: "",
    answers: [
      { answerText: "", score: 0 },
      { answerText: "", score: 0 },
      { answerText: "", score: 0 },
      { answerText: "", score: 0 },
    ],
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/quiz/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const transformedQuestions = response.data.map((q) => ({
        id: q.id,
        question: q.questionText,
        skinType: q.skinType,
        options: q.answers.map((a) => a.answerText),
      }));
      setQuestions(transformedQuestions);
    } catch (err) {
      setError("Failed to fetch questions: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    setQuestionToDelete(id);
    setIsDeleteDialogOpen(true);
    setDropdownOpen(null);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${BACKEND_URL}/api/quiz/questions/${questionToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions(questions.filter((q) => q.id !== questionToDelete));
      setIsDeleteDialogOpen(false);
      setQuestionToDelete(null);
    } catch (err) {
      setError("Failed to delete question: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setIsEditDialogOpen(true);
    setDropdownOpen(null);
  };

  const saveEditedQuestion = async (editedQuestion) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const requestBody = {
        questionText: editedQuestion.question,
        skinType: editedQuestion.skinType,
        answers: editedQuestion.options.map((opt, index) => ({
          answerText: opt,
          score: index,
        })),
      };
      const response = await axios.put(
        `${BACKEND_URL}/api/quiz/questions/${editedQuestion.id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedQuestion = {
        id: response.data.id,
        question: response.data.questionText,
        skinType: response.data.skinType,
        options: response.data.answers.map((a) => a.answerText),
      };
      setQuestions(
        questions.map((q) => (q.id === editedQuestion.id ? updatedQuestion : q))
      );
      setIsEditDialogOpen(false);
      setEditingQuestion(null);
    } catch (err) {
      setError("Failed to update question: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = async () => {
    if (
      newQuestion.questionText &&
      newQuestion.skinType &&
      newQuestion.answers.every((ans) => ans.answerText.trim() !== "")
    ) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const requestBody = {
          questionText: newQuestion.questionText,
          skinType: newQuestion.skinType,
          answers: newQuestion.answers,
        };
        const response = await axios.post(
          `${BACKEND_URL}/api/quiz/questions`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const addedQuestion = {
          id: response.data.id,
          question: response.data.questionText,
          skinType: response.data.skinType,
          options: response.data.answers.map((a) => a.answerText),
        };
        setQuestions([...questions, addedQuestion]);
        setIsAddDialogOpen(false);
        setNewQuestion({
          questionText: "",
          skinType: "",
          answers: [
            { answerText: "", score: 0 },
            { answerText: "", score: 0 },
            { answerText: "", score: 0 },
            { answerText: "", score: 0 },
          ],
        });
      } catch (err) {
        setError("Failed to add question: " + err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please fill in all fields!");
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleOptionChange = (index, field, value) => {
    const updatedAnswers = [...newQuestion.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };
    setNewQuestion({ ...newQuestion, answers: updatedAnswers });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        {isLoading && <div className="text-center">Loading...</div>}
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 flex items-center"
              onClick={() => setIsAddDialogOpen(true)}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Question
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    {/* Ẩn cột Skin Type */}
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skin Type
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number of Options
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {questions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No questions found.
                      </td>
                    </tr>
                  ) : (
                    questions.map((question) => (
                      <tr key={question.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {question.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[300px] truncate">
                          {question.question}
                        </td>
                        {/* Ẩn cột Skin Type */}
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {question.skinType}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {question.options.length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="relative">
                            <button
                              className="text-gray-400 hover:text-gray-500 h-8 w-8 p-0"
                              onClick={() => toggleDropdown(question.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mx-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                />
                              </svg>
                            </button>
                            {dropdownOpen === question.id && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div className="py-1">
                                  <div className="px-4 py-2 text-xs text-gray-500">
                                    Actions
                                  </div>
                                  <hr />
                                  <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    onClick={() => handleEdit(question)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                    onClick={() => handleDelete(question.id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Question Modal */}
          {isAddDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-medium">Add New Question</h3>
                  <p className="text-sm text-gray-500">
                    Fill in the details for the skin type question.
                  </p>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Question
                    </label>
                    <input
                      type="text"
                      value={newQuestion.questionText}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          questionText: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter question"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Skin Type
                    </label>
                    <select
                      value={newQuestion.skinType}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          skinType: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select skin type</option>
                      <option value="OILY">Oily</option>
                      <option value="DRY">Dry</option>
                      <option value="SENSITIVE">Sensitive</option>
                      <option value="COMBINATION">Combination</option>
                      <option value="NORMAL">Normal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Answers
                    </label>
                    {newQuestion.answers.map((answer, index) => (
                      <div key={index} className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={answer.answerText}
                          onChange={(e) =>
                            handleOptionChange(
                              index,
                              "answerText",
                              e.target.value
                            )
                          }
                          className="w-3/4 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder={`Answer ${index + 1}`}
                        />
                        <input
                          type="number"
                          value={answer.score}
                          onChange={(e) =>
                            handleOptionChange(
                              index,
                              "score",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-1/4 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Score"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 flex justify-end space-x-2 border-t">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                    onClick={handleAddQuestion}
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Question Dialog */}
          {isEditDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-medium">Edit Question</h3>
                  <p className="text-sm text-gray-500">
                    Edit the details for the skin type question.
                  </p>
                </div>
                {editingQuestion && (
                  <EditQuestionForm
                    question={editingQuestion}
                    onSave={saveEditedQuestion}
                    onCancel={() => setIsEditDialogOpen(false)}
                  />
                )}
              </div>
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          {isDeleteDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-medium">Confirm Delete</h3>
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this question? This action
                    cannot be undone.
                  </p>
                </div>
                <div className="px-6 py-4 flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 rounded-md text-sm font-medium text-white hover:bg-red-700"
                    onClick={confirmDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
