import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import SimpleSelfAssessment from "../components/SimpleSelfAssessment";

const questions = [
  { id: "q1", text: "Little interest or pleasure in doing things?" },
  { id: "q2", text: "Feeling down, depressed, or hopeless?" },
  { id: "q3", text: "Trouble falling or staying asleep, or sleeping too much?" },
  { id: "q4", text: "Feeling tired or having little energy?" },
  { id: "q5", text: "Poor appetite or overeating?" },
  { id: "q6", text: "Feeling bad about yourself - or that you're a failure or have let yourself or your family down?" },
  { id: "q7", text: "Trouble concentrating on things, such as reading or watching television?" },
  { id: "q8", text: "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?" },
  { id: "q9", text: "Thoughts that you would be better off dead, or of hurting yourself in some way?" },
];

export default function GeneralHealthAssessment() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleComplete = (totalScore: number) => {
    setScore(totalScore);
    setCompleted(true);
  };

  const maxScore = questions.length * 3;
  const percentage = (score / maxScore) * 100;

  let interpretation = "";
  let recommendations: string[] = [];
  let scoreColor = "bg-green-500";

  if (percentage <= 25) {
    interpretation = "Your score indicates excellent physical health. Keep up the great work!";
    recommendations = [
      "Maintain a balanced diet and regular exercise routine.",
      "Get regular check-ups with your healthcare provider.",
      "Stay hydrated and get enough sleep."
    ];
    scoreColor = "bg-green-500";
  } else if (percentage <= 50) {
    interpretation = "Your score suggests good physical health, but there's room for improvement.";
    recommendations = [
      "Incorporate more fruits and vegetables into your diet.",
      "Increase your physical activity levels.",
      "Consider stress-reduction techniques like meditation or yoga."
    ];
    scoreColor = "bg-yellow-500";
  } else if (percentage <= 75) {
    interpretation = "Your score indicates some potential physical health concerns that warrant attention.";
    recommendations = [
      "Consult with your healthcare provider for a comprehensive evaluation.",
      "Address any underlying health conditions or risk factors.",
      "Make gradual lifestyle changes to improve your overall well-being."
    ];
    scoreColor = "bg-orange-500";
  } else {
    interpretation = "Your score suggests significant physical health concerns that require immediate attention.";
    recommendations = [
      "Seek medical attention as soon as possible.",
      "Follow your healthcare provider's recommendations for treatment and management.",
      "Prioritize self-care and stress management."
    ];
    scoreColor = "bg-red-500";
  }

  return (
    <div className="container py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Physical Health Assessment</h1>
        <p className="text-muted-foreground mt-2">
          Answer the following questions to assess your physical health.
        </p>
      </div>

      {!started ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Physical Health Assessment</CardTitle>
            <CardDescription>
              This quick assessment will help identify potential physical health concerns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This assessment takes about 2 minutes to complete and asks about your physical well-being.
            </p>
            <p className="mb-4">
              Your responses will be used to provide personalized health guidance.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setStarted(true)}>Start Assessment</Button>
          </CardFooter>
        </Card>
      ) : !completed ? (
        <SimpleSelfAssessment
          questions={questions}
          onComplete={handleComplete}
          onCancel={() => setStarted(false)}
        />
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription>
              Based on your responses, here's a summary of your physical health.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-lg font-semibold mb-2">Your Score: {score} out of {questions.length * 3}</p>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${scoreColor}`}
                  style={{ width: `${(score / (questions.length * 3)) * 100}%` }}
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
            <Button onClick={() => navigate("/general-health")}>
              Explore Health Resources
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}