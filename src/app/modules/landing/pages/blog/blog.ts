import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface BlogArticle {
  id: number;
  imageTitle: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  gradient: string;
}

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styles: ``
})
export class Blog {
  articles: BlogArticle[] = [
    {
      id: 1,
      imageTitle: 'Working with Context',
      title: 'Mastering Context in Trae',
      author: 'Albert Shen',
      date: 'June 8, 2025',
      excerpt: 'We\'ve put together this guide that shows you how to make smart use of context in Trae to collaborate seamlessly with your AI partner.',
      gradient: 'bg-gradient-to-br from-cyan-400 to-yellow-400'
    },
    {
      id: 2,
      imageTitle: 'Trae by Benchmark',
      title: 'Trae Achieves #1 on SWE-bench Verified with Claude 3.7',
      author: 'Pengfei Gao, Zhao Tian, Chao Peng',
      date: 'May 27, 2025',
      excerpt: 'Trae achieved 71.0% accuracy on SWE-bench Verified with Claude 3.7, pushing the boundaries of...',
      gradient: 'bg-gradient-to-br from-purple-400 to-orange-400'
    },
    {
      id: 3,
      imageTitle: 'More Agentic',
      title: 'More Agentic',
      author: 'Yang Shi',
      date: 'May 25, 2025',
      excerpt: 'We\'ve improved our agent capabilities with better context understanding and greater autonomy.',
      gradient: 'bg-gradient-to-br from-purple-600 to-red-500'
    }
  ];

  secondRowArticles: BlogArticle[] = [
    {
      id: 4,
      imageTitle: 'Agents by Design',
      title: '@Agent: Rules + Tools to Define Your Future Agents',
      author: 'Yang Shi',
      date: 'April 27, 2025',
      excerpt: 'Deep dive into @Agent and how we built it.',
      gradient: 'bg-gradient-to-br from-orange-400 to-red-500'
    },
    {
      id: 5,
      imageTitle: 'Beyond Builder',
      title: 'Collaborate with Intelligence',
      author: 'Yang Shi',
      date: 'April 20, 2025',
      excerpt: 'Trae unveils major updates: a unified Chat + Builder interface, @Agent system with MCP for multi - agent collaboration, and smarter context',
      gradient: 'bg-gradient-to-br from-red-400 to-purple-500'
    },
    {
      id: 6,
      imageTitle: 'Code without Borders',
      title: 'Beyond AI Coding: Trae\'s Vision for Human-AI Collaboration',
      author: 'Yang Shi',
      date: 'April 15, 2025',
      excerpt: 'Trae\'s vision is to empower seamless collaboration between humans and AI by advancing AI-driven coding...',
      gradient: 'bg-gradient-to-br from-blue-400 to-purple-500'
    }
  ];
}
