import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import SimpleSelfAssessment from "@/components/SimpleSelfAssessment";

// Define distinct assessments with question sets
const assessments = {
  stress: {
    title: "Stress Level Check",
    description: "A quick assessment to gauge your current stress levels.",
    questions: [
      { id: "q1", text: "Do you feel overwhelmed by your daily responsibilities?" },
      { id: "q2", text: "Do you experience frequent headaches or tension?" },
      { id: "q3", text: "Do you feel irritable or on edge?" },
      { id: "q4", text: "Do you have difficulty relaxing?" },
      { id: "q5", text: "Do you feel that you are under constant pressure?" },
      { id: "q6", text: "Do you struggle to balance work and personal life?" },
      { id: "q7", text: "Do you feel that your stress is affecting your relationships?" }
    ],
    time: "3 min"
  },
  anxiety: {
    title: "Anxiety Screening",
    description: "Recognize signs of general anxiety and related disorders.",
    questions: [
      { id: "q1", text: "Do you feel nervous or anxious most of the time?" },
      { id: "q2", text: "Do you worry excessively about everyday situations?" },
      { id: "q3", text: "Do you experience physical symptoms like sweating or trembling?" },
      { id: "q4", text: "Do you have difficulty controlling your worrying?" },
      { id: "q5", text: "Do you avoid certain situations due to fear?" },
      { id: "q6", text: "Do you find it hard to relax?" },
      { id: "q7", text: "Do you experience panic attacks?" },
      { id: "q8", text: "Do you worry about being judged by others?" },
      { id: "q9", text: "Do you have trouble sleeping due to anxiety?" },
      { id: "q10", text: "Do you feel that your anxiety interferes with your daily activities?" }
    ],
    time: "5 min"
  },
  depression: {
    title: "Depression Screening",
    description: "Check for symptoms of depression and mood disorders.",
    questions: [
      { id: "q1", text: "Little interest or pleasure in doing things?" },
      { id: "q2", text: "Feeling down, depressed, or hopeless?" },
      { id: "q3", text: "Trouble falling or staying asleep, or sleeping too much?" },
      { id: "q4", text: "Feeling tired or having little energy?" },
      { id: "q5", text: "Poor appetite or overeating?" },
      { id: "q6", text: "Feeling bad about yourself - or that you're a failure or have let yourself or your family down?" },
      { id: "q7", text: "Trouble concentrating on things, such as reading the newspaper or watching television?" },
      { id: "q8", text: "Moving or speaking so slowly that others notice, or being unusually fidgety?" },
      { id: "q9", text: "Thoughts that you would be better off dead, or of hurting yourself?" }
    ],
    time: "4 min"
  },
  sleep: {
    title: "Sleep Quality Assessment",
    description: "Evaluate your sleep patterns and identify issues.",
    questions: [
      { id: "q1", text: "Do you have difficulty falling asleep?" },
      { id: "q2", text: "Do you wake up frequently during the night?" },
      { id: "q3", text: "Do you feel tired even after a full night's sleep?" },
      { id: "q4", text: "Do you have trouble staying asleep?" },
      { id: "q5", text: "Do you rely on caffeine to get through the day?" },
      { id: "q6", text: "Do you feel unrested in the morning?" },
      { id: "q7", text: "Do you experience nightmares or disturbed sleep?" },
      { id: "q8", text: "Do you have a regular sleep schedule?" }
    ],
    time: "4 min"
  }
};

export default function MentalHealthAssessment() {
  const { testType } = useParams<{ testType: string }>();
  const navigate = useNavigate();
  const assessment = assessments[testType || "depression"] || assessments["depression"];
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleComplete = (totalScore: number) => {
    setScore(totalScore);
    setCompleted(true);
  };

  const maxPossibleScore = assessment.questions.length * 3;
  const percentage = (score / maxPossibleScore) * 100;

  let interpretation = "";
  let recommendations: string[] = [];
  let scoreColor = "bg-green-500";

  if (percentage <= 25) {
    interpretation = "Your responses suggest a good state of mental well-being.";
    recommendations = [
      "Continue practicing self-care activities.",
      "Maintain a healthy lifestyle with regular exercise and a balanced diet.",
      "Stay connected with friends and family for social support.",
    ];
    scoreColor = "bg-green-500";
  } else if (percentage <= 50) {
    interpretation = "Your responses indicate mild mental health concerns.";
    recommendations = [
      "Consider incorporating stress-reduction techniques into your daily routine.",
      "Engage in activities that bring you joy and relaxation.",
      "Talk to a trusted friend or family member about your feelings.",
    ];
    scoreColor = "bg-yellow-500";
  } else if (percentage <= 75) {
    interpretation = "Your responses suggest moderate mental health concerns.";
    recommendations = [
      "Seek professional support from a therapist or counselor.",
      "Explore mindfulness and meditation practices to manage stress.",
      "Prioritize self-care activities and set realistic goals.",
    ];
    scoreColor = "bg-orange-500";
  } else {
    interpretation = "Your responses indicate significant mental health concerns.";
    recommendations = [
      "Seek immediate professional help from a mental health specialist.",
      "Consider reaching out to a crisis hotline or mental health support group.",
      "Focus on creating a safe and supportive environment for yourself.",
    ];
    scoreColor = "bg-red-500";
  }

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{assessment.title}</h1>
          <p className="text-muted-foreground mt-2">{assessment.description}</p>
        </div>

        {!started ? (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{assessment.title}</CardTitle>
              <CardDescription>
                This assessment takes about {assessment.time} to complete and will help identify potential mental health concerns.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Answer the following questions to assess your mental well-being.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStarted(true)}>Start Assessment</Button>
            </CardFooter>
          </Card>
        ) : !completed ? (
          <SimpleSelfAssessment
            questions={assessment.questions}
            onComplete={handleComplete}
            onCancel={() => setStarted(false)}
          />
        ) : (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Assessment Results</CardTitle>
              <CardDescription>
                Based on your responses, here's a summary of your mental health.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-lg font-semibold mb-2">Your Score: {score} out of {assessment.questions.length * 3}</p>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${scoreColor}`}
                    style={{ width: `${(score / (assessment.questions.length * 3)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-lg font-semibold mb-2">Interpretation:</p>
                <p>{interpretation}</p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setStarted(false);
                  setCompleted(false);
                  setScore(0);
                }}
                className="mr-2"
              >
                Retake Assessment
              </Button>
              <Button onClick={() => navigate("/mental-health")}>
                Explore Mental Health Resources
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
