import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: string;
  text: string;
}

interface SimpleSelfAssessmentProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export default function SimpleSelfAssessment({ questions, onComplete, onCancel }: SimpleSelfAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedValue !== null) {
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: parseInt(selectedValue)
      });
      setSelectedValue(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate score when all questions are answered
        const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0) + 
          (selectedValue ? parseInt(selectedValue) : 0);
        onComplete(totalScore);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedValue(answers[questions[currentQuestion - 1].id]?.toString() || null);
    }
  };

  const question = questions[currentQuestion];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
        <CardDescription>{question.text}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedValue || ""} onValueChange={setSelectedValue}>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="0" id="q-0" />
            <Label htmlFor="q-0">Not at all</Label>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="1" id="q-1" />
            <Label htmlFor="q-1">Several days</Label>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="2" id="q-2" />
            <Label htmlFor="q-2">More than half the days</Label>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <RadioGroupItem value="3" id="q-3" />
            <Label htmlFor="q-3">Nearly every day</Label>
          </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={currentQuestion === 0 ? onCancel : handlePrevious}>
          {currentQuestion === 0 ? 'Cancel' : 'Previous'}
        </Button>
        <Button onClick={handleNext} disabled={selectedValue === null}>
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
}
