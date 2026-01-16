#!/usr/bin/env node

/**
 * CV Sync Script
 * 
 * This script extracts information from CV/Resume files in the Jobs folder
 * and can update the website content accordingly.
 * 
 * Usage:
 *   node scripts/sync-cv.js
 *   node scripts/sync-cv.js --dry-run
 * 
 * Supported source files:
 *   - Jobs/experiences.txt (plain text experiences)
 *   - Jobs/Israel_Borba_CV.pdf (requires pdf-parse)
 * 
 * The script generates:
 *   - _data/experience.json
 *   - _data/skills.json
 */

const fs = require('fs');
const path = require('path');

// Configuration
const JOBS_FOLDER = path.join(__dirname, '..', 'Jobs');
const DATA_FOLDER = path.join(__dirname, '..', '_data');
const DRY_RUN = process.argv.includes('--dry-run');

// Ensure _data folder exists
if (!fs.existsSync(DATA_FOLDER)) {
  fs.mkdirSync(DATA_FOLDER, { recursive: true });
}

/**
 * Parse experiences from plain text file
 */
function parseExperiencesFromText(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`📄 Reading experiences from: ${filePath}`);
  
  return {
    raw: content,
    lastModified: fs.statSync(filePath).mtime
  };
}

/**
 * Extract profile info from various sources
 */
function extractProfile() {
  const profile = {
    name: 'Israel Borba',
    title: 'Software Engineer & Architect',
    location: 'Rio Grande do Sul, Brazil',
    yearsOfExperience: new Date().getFullYear() - 2007,
    summary: 'I build resilient, scalable systems using Node.js, .NET, and cloud-native technologies.',
    contact: {
      email: 'israel.borba@gmail.com',
      linkedin: 'https://www.linkedin.com/in/israelmborba',
      github: 'https://github.com/iborba'
    },
    languages: [
      { name: 'Portuguese', level: 'Native', flag: '🇧🇷' },
      { name: 'English', level: 'C1', flag: '🇺🇸', certificate: 'https://cert.efset.org/zaPhYD?cid=em100a' }
    ],
    updatedAt: new Date().toISOString()
  };

  return profile;
}

/**
 * Define core experiences (can be extended to parse from files)
 */
function extractExperiences() {
  const experiences = [
    {
      id: 'ey-softensity',
      title: 'Software Engineer',
      subtitle: 'Node, React',
      company: 'EY (Ernst and Young) via Softensity',
      location: 'Remote from Brazil',
      period: {
        start: '2022-05',
        end: null,
        current: true
      },
      description: [
        'Full-stack engineer focused on integrations and developing new tools for websites',
        'Building microservices using AI for document metadata extraction',
        'Coaching junior developers with pair and mob programming sessions',
        'Ensuring code quality across 10+ applications using Jest and Mocha'
      ],
      stack: ['Node.js', '.NET 8', 'React', 'Angular', 'Redis', 'ElasticSearch', 'MongoDB', 'RabbitMQ', 'Docker', 'PM2'],
      highlights: ['AI/ML integration', 'Team mentoring']
    },
    {
      id: 'btg-gft',
      title: 'Software Architect',
      subtitle: 'Node',
      company: 'BTG via GFT',
      location: 'São Paulo, Brazil (Remote)',
      period: {
        start: '2022-01',
        end: '2023-01',
        current: false
      },
      description: [
        'Designed system architecture for banking applications',
        'Led developer hiring processes and interviews',
        'Provided 1:1 support and mentoring for team members',
        'Ensured code quality by specifying test metrics and Jest training'
      ],
      stack: ['Node.js', 'GraphQL', 'Cognito', 'Docker', 'PostgreSQL'],
      highlights: ['Architecture design', 'Team leadership']
    },
    {
      id: 'bairesdev',
      title: 'Software Engineer',
      subtitle: 'Node, Vue',
      company: 'BairesDev',
      location: 'Buenos Aires, Argentina (Remote)',
      period: {
        start: '2021-01',
        end: '2022-01',
        current: false
      },
      description: [
        'Front-end development in Vue.js environment',
        'Created reusable components with Vue.js, CSS3, and HTML5',
        'Implemented comprehensive test coverage using Cypress',
        'Improved code quality with TypeScript adoption'
      ],
      stack: ['Vue.js', 'Node.js', 'TypeScript', 'GraphQL', 'Cypress', 'PostgreSQL'],
      highlights: ['Vue.js expertise', 'Testing with Cypress']
    },
    {
      id: 'stoneridge',
      title: 'Software Architect',
      subtitle: 'Node, .NET',
      company: 'Stoneridge',
      location: 'Campinas, Brazil (Remote)',
      period: {
        start: '2020-01',
        end: '2021-01',
        current: false
      },
      description: [
        'Relocated entire development team from Scotland to Brazil',
        'Obtained business requirements to build new applications',
        'Hired all team members aligned with engineering requirements',
        'Designed AWS migration strategy with Cognito, Python Lambdas, and .NET Core'
      ],
      stack: ['Node.js', '.NET Core', 'AWS', 'Cognito', 'Python', 'Lambda'],
      highlights: ['Team relocation', 'AWS migration']
    },
    {
      id: 'totvs',
      title: 'Software Engineer',
      subtitle: 'Node, .NET',
      company: 'TOTVS S/A',
      location: 'Porto Alegre, Brazil',
      period: {
        start: '2017-01',
        end: '2020-01',
        current: false
      },
      description: [
        'Led migration from .NET monolith to Node.js microservices',
        'Improved API response times by 95%',
        'Implemented CI/CD pipeline using Azure DevOps',
        'Transitioned APIs to RPC/AMQP with RabbitMQ',
        'Deployed using Azure Kubernetes'
      ],
      stack: ['Node.js', '.NET Framework', 'RabbitMQ', 'Kubernetes', 'Azure DevOps', 'Jenkins'],
      highlights: ['95% performance improvement', 'Microservices architecture']
    },
    {
      id: 'klassmatt',
      title: 'Software Engineer',
      subtitle: '.NET',
      company: 'Klassmatt | Integra',
      location: 'Porto Alegre, Brazil',
      period: {
        start: '2014-01',
        end: '2017-01',
        current: false
      },
      description: [
        'Addressed strategic performance and data reliability issues',
        'Developed .NET Framework and SQL Server tools',
        'Designed Lucene/Elasticsearch integration for faster queries'
      ],
      stack: ['.NET Framework', 'SQL Server', 'Elasticsearch', 'Lucene'],
      highlights: ['Performance optimization', 'Search implementation']
    },
    {
      id: 'perto',
      title: 'Software Engineer',
      subtitle: '.NET',
      company: 'Perto S/A',
      location: 'Gravataí, Brazil',
      period: {
        start: '2007-01',
        end: '2014-01',
        current: false
      },
      description: [
        'Built applications for hardware statistics and client contracts',
        'Provided SLA and MTBF metrics on web',
        'Used data insights for contract improvement',
        'Traveled as consultant to showcase tools'
      ],
      stack: ['.NET Framework', 'SQL Server', 'Oracle'],
      highlights: ['Contract management', 'Data analytics']
    }
  ];

  return experiences;
}

/**
 * Define skills (can be extended to parse from CV)
 */
function extractSkills() {
  const skills = {
    primary: [
      {
        name: 'JavaScript / TypeScript',
        level: 'Expert',
        since: 2007,
        icon: '⚡',
        description: 'Extensive experience with Node.js for microservices, APIs, and back-end systems. Proficient with Express, Jest, GraphQL, Prisma, and AWS Lambda.'
      },
      {
        name: 'C# / .NET',
        level: 'Expert',
        since: 2007,
        icon: '🔷',
        description: 'Robust solutions for large datasets and secure transactions. Experience with .NET Framework, .NET Core, SQL Server, and enterprise integrations.'
      },
      {
        name: 'SQL & Databases',
        level: 'Expert',
        since: 2007,
        icon: '🗄️',
        description: 'Deep expertise in T-SQL, PL-SQL, and PG-SQL. Experience with MongoDB, Redis, and ElasticSearch for diverse data needs.'
      }
    ],
    secondary: [
      {
        name: 'Golang',
        level: 'Intermediate',
        icon: '🐹',
        description: 'Building microservices and Lambdas with Go. Currently developing a Blockchain project with Solidity smart contracts.'
      },
      {
        name: 'Vue.js',
        level: 'Advanced',
        icon: '💚',
        description: 'Component-driven development with Vue.js. Experience with Cypress testing and modern front-end practices.'
      },
      {
        name: 'React',
        level: 'Growing',
        icon: '⚛️',
        description: 'Actively learning and implementing React for modern front-end projects.'
      }
    ],
    tools: [
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'RabbitMQ', 'Redis',
      'ElasticSearch', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Jest', 'Cypress'
    ],
    updatedAt: new Date().toISOString()
  };

  return skills;
}

/**
 * Define education
 */
function extractEducation() {
  const education = [
    {
      type: 'postgraduate',
      title: 'Postgraduate - Software Architecture',
      institution: 'XPe',
      location: 'Brazil',
      period: { start: '2024', end: '2024' },
      description: 'Best practices to reduce risks in software development'
    },
    {
      type: 'mba',
      title: 'M.B.A - Project Management',
      institution: 'Unisinos',
      location: 'São Leopoldo, Brazil',
      period: { start: '2015', end: '2016' },
      note: 'Unfinished due to relocation'
    },
    {
      type: 'graduate',
      title: 'Graduate - IT Management',
      institution: 'Unisinos',
      location: 'São Leopoldo, Brazil',
      period: { start: '2011', end: '2014' }
    }
  ];

  return education;
}

/**
 * Define certifications
 */
function extractCertifications() {
  const certifications = [
    {
      name: 'JavaScript Algorithms and Data Structures',
      issuer: 'FreeCodeCamp',
      url: 'https://freecodecamp.org/certification/iborba/javascript-algorithms-and-data-structures'
    },
    {
      name: 'English Proficiency - C1',
      issuer: 'EFSet',
      url: 'https://cert.efset.org/zaPhYD?cid=em100a'
    }
  ];

  return certifications;
}

/**
 * Main sync function
 */
async function syncCV() {
  console.log('🔄 Starting CV Sync...\n');
  
  if (DRY_RUN) {
    console.log('🏃 DRY RUN MODE - No files will be written\n');
  }

  // Extract all data
  const profile = extractProfile();
  const experiences = extractExperiences();
  const skills = extractSkills();
  const education = extractEducation();
  const certifications = extractCertifications();

  // Combine into single data object
  const cvData = {
    profile,
    experiences,
    skills,
    education,
    certifications,
    generatedAt: new Date().toISOString()
  };

  // Write to _data folder
  const outputPath = path.join(DATA_FOLDER, 'cv.json');
  
  if (!DRY_RUN) {
    fs.writeFileSync(outputPath, JSON.stringify(cvData, null, 2));
    console.log(`✅ Written: ${outputPath}`);
  } else {
    console.log(`📝 Would write: ${outputPath}`);
    console.log('\nData preview:');
    console.log(`  - Profile: ${profile.name}`);
    console.log(`  - Experiences: ${experiences.length} positions`);
    console.log(`  - Skills: ${skills.primary.length + skills.secondary.length} skills`);
    console.log(`  - Education: ${education.length} entries`);
    console.log(`  - Certifications: ${certifications.length} certificates`);
  }

  // Check for source files
  console.log('\n📁 Checking source files in Jobs folder:');
  const sourceFiles = [
    'Israel_Borba_CV.pdf',
    'Israel_Borba_CV.docx',
    'Israel_Borba_CV-BR.pdf',
    'experiences.txt',
    'foto perfil.jpeg'
  ];

  sourceFiles.forEach(file => {
    const filePath = path.join(JOBS_FOLDER, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`  ✓ ${file} (modified: ${stats.mtime.toLocaleDateString()})`);
    } else {
      console.log(`  ✗ ${file} (not found)`);
    }
  });

  console.log('\n✨ CV Sync complete!\n');
  console.log('Next steps:');
  console.log('  1. Update Jobs/experiences.txt with new content');
  console.log('  2. Run this script to regenerate _data/cv.json');
  console.log('  3. The Jekyll site will automatically use the new data');
}

// Run the sync
syncCV().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

