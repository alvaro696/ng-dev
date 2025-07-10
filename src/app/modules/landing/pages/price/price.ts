import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ComparisonFeature {
  name: string;
  free: string;
  pro: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-price',
  imports: [CommonModule],
  templateUrl: './price.html',
  styles: ``
})
export class Price {
  isYearly = false;
  openFaq: number | null = null;

  comparisonFeatures: ComparisonFeature[] = [
    { name: 'Premium model', free: '10 / month', pro: '600 / month' },
    { name: 'Fast requests', free: '10 / month', pro: '600 / month' },
    { name: 'Slow requests', free: '50 / month', pro: 'unlimited' },
    { name: 'Extra fast requests', free: '×', pro: '✓' },
    { name: 'Advanced model', free: '1000 / month', pro: 'unlimited' },
    { name: 'All request', free: '1000 / month', pro: 'unlimited' },
    { name: 'Autocomplete', free: '5000 / month', pro: 'unlimited' },
    { name: 'AI Completion', free: '5000 / month', pro: 'unlimited' }
  ];

  faqs: FAQ[] = [
    {
      id: 1,
      question: 'What is a "new subscriber"?',
      answer: 'A "new subscriber" refers to a user who subscribes to Trae\'s Pro plan for the first time and is eligible for a discounted price. If the first subscription is refunded, any future subscriptions will no longer qualify for the benefits of a "new subscriber".'
    },
    {
      id: 2,
      question: 'How does Trae count the number of AI requests consumed?',
      answer: 'Trae counts each interaction with AI models as a request. This includes code completions, chat messages, and other AI-powered features.'
    },
    {
      id: 3,
      question: 'What happens if I run out of AI requests?',
      answer: 'If you exceed your monthly limit, you can upgrade to a higher plan or wait until the next billing cycle for your requests to reset.'
    },
    {
      id: 4,
      question: 'What if I want to get a refund? Where can I contact for billing issues?',
      answer: 'For refunds and billing issues, please contact our support team at feedback@mail.trae.ai or through our support portal.'
    },
    {
      id: 5,
      question: 'Is there a student discount?',
      answer: 'Yes, we offer student discounts. Please contact us with your student verification for more information.'
    }
  ];

  toggleBilling(): void {
    this.isYearly = !this.isYearly;
  }

  toggleFaq(id: number): void {
    this.openFaq = this.openFaq === id ? null : id;
  }
}
