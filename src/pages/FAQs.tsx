
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs = () => {
  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is AgriLearnNetwork?",
          answer: "AgriLearnNetwork is an AI-powered platform designed to help farmers improve their agricultural practices through disease detection, crop suggestions, weather monitoring, and educational resources. Our platform aims to make modern farming techniques and knowledge accessible to all farmers."
        },
        {
          question: "Is AgriLearnNetwork available worldwide?",
          answer: "Yes, AgriLearnNetwork is available globally. However, some features like weather forecasts and crop suggestions may be more accurate in regions with more comprehensive data. We're continuously expanding our database to improve accuracy across all regions."
        },
        {
          question: "Do I need to create an account to use AgriLearnNetwork?",
          answer: "While basic features are available without an account, we recommend creating a free account to access personalized recommendations, save your history, and receive customized insights based on your farming location and practices."
        }
      ]
    },
    {
      category: "Disease Detection",
      questions: [
        {
          question: "How accurate is the plant disease detection feature?",
          answer: "Our disease detection system uses advanced AI models and is regularly updated to improve accuracy. It currently has an accuracy rate of approximately 85-90% for common plant diseases. For critical decisions, we recommend consulting with a local agricultural expert to confirm the diagnosis."
        },
        {
          question: "What types of plants and diseases can the system detect?",
          answer: "Our system can identify diseases in over 30 common crops including rice, wheat, maize, tomatoes, potatoes, and various fruits. We can detect more than 50 common diseases, and we're continuously expanding our database to include more plants and diseases."
        },
        {
          question: "How should I take photos for the most accurate disease detection?",
          answer: "For best results, take clear, well-lit photos of the affected plant parts (leaves, stems, fruits) showing the symptoms. Try to include both healthy and affected parts in the same image for comparison. Avoid shadows and blurry images. Multiple photos from different angles may improve accuracy."
        }
      ]
    },
    {
      category: "Crop Suggestions",
      questions: [
        {
          question: "How does the crop suggestion system work?",
          answer: "Our crop suggestion system analyzes multiple factors including your location, current season, soil conditions, market trends, and weather forecasts. It then recommends crops that are likely to grow well and potentially provide good returns based on historical and predicted data."
        },
        {
          question: "Can I get crop suggestions for organic farming?",
          answer: "Yes, you can specify that you practice organic farming in your profile or when requesting crop suggestions. The system will then provide recommendations suited to organic farming methods, including appropriate crop rotations and natural pest management strategies."
        },
        {
          question: "How often should I update my soil data for accurate crop suggestions?",
          answer: "We recommend updating your soil data at least once a year, ideally after harvesting a major crop. If you make significant changes to your soil (like adding large amounts of amendments or after heavy flooding), it's good to update the data to receive more accurate suggestions."
        }
      ]
    },
    {
      category: "Weather Forecasts",
      questions: [
        {
          question: "How accurate are the weather forecasts?",
          answer: "We source our weather data from reliable meteorological services and provide 7-day forecasts that are generally accurate for planning purposes. However, like all weather forecasts, accuracy decreases for predictions further in the future, and local microclimate variations might occur."
        },
        {
          question: "Can I receive weather alerts for extreme conditions?",
          answer: "Yes, premium users can set up weather alerts for specific conditions like frost, heavy rain, or extreme temperatures. These alerts can be delivered via email, SMS, or app notifications based on your preferences."
        }
      ]
    },
    {
      category: "Account & Subscription",
      questions: [
        {
          question: "Is AgriLearnNetwork free to use?",
          answer: "We offer a free basic tier that includes limited access to disease detection, crop suggestions, and educational resources. Premium subscriptions provide unlimited access to all features, personalized recommendations, priority support, and advanced analytics for a monthly or annual fee."
        },
        {
          question: "How can I update my farm location and size?",
          answer: "You can update your farm details by logging into your account, navigating to the Profile section, and editing your farm information. Keeping this information current helps us provide more accurate and relevant recommendations for your specific situation."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription at any time from the Account Settings page. Your premium access will continue until the end of your current billing period. We don't offer refunds for partial months or years of service."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about AgriLearnNetwork's features, services, and how to get the most out of our platform.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqCategories.map((category, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{category.category}</h2>
            <Accordion type="single" collapsible className="border rounded-lg">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`faq-${index}-${faqIndex}`}>
                  <AccordionTrigger className="px-4 py-4 hover:no-underline text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-1 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-16 text-center p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
        <p className="mb-6 text-gray-600">
          If you couldn't find the answer you were looking for, please contact our support team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="mailto:support@agrilearnetwork.com"
            className="inline-block bg-agri-green text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-green-700 transition-colors"
          >
            Email Support
          </a>
          <a 
            href="#"
            className="inline-block bg-white border border-agri-green text-agri-green px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-50 transition-colors"
          >
            Live Chat
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
