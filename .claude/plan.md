# TIMS Certification Marketing Platform - Implementation Plan

## Project Overview

A marketing campaign platform for TIMS Centroamerica certification exams and coaching services:

**Business Context:**
- Target Market: Central America (bilingual Spanish/English)
- Products: PCA and MIL certification exams + coaching sessions
- Coaches: Andres Tafur (premium) + team member (regular coaching)

**Core Features:**
- 250,000+ email database (XLSX import with email domain filtering)
  - Starting: 6,000 contacts (Month 1 testing)
  - 2025 database: 140,000 contacts
  - Total available: 250,000+ emails
- Large-scale campaign sending via AWS SES + Lambda + SQS
- Stripe payment integration (6 product plans)
- Auto-sent assessment emails (one-time use links)
- Post-payment coaching booking via Calendly (auto-assigned coach)
- Admin notifications (email + dashboard) for payment tracking

---

## 1. Technology Stack

### Backend (Serverless)
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Runtime | Node.js 20 LTS | Async I/O, excellent for serverless |
| API | AWS Lambda + API Gateway | Pay-per-request, auto-scaling |
| Queue | AWS SQS | Pay-per-message, handles retries |
| Database | DynamoDB (on-demand) | Pay-per-request, scales to any size |
| Email | AWS SES + Lambda | Batch processing, rate limited |
| Framework | Serverless Framework or SST | Easy Lambda deployment |

### Frontend
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | Next.js 14 | SSR, API routes, React ecosystem |
| UI | Shadcn/ui + Tailwind | Production-ready components |
| State | TanStack Query | Server state management, caching |
| Forms | React Hook Form + Zod | Validation, TypeScript integration |

### External Services
| Service | Provider | Purpose |
|---------|----------|---------|
| Email Sending | AWS SES | Cost-effective ($0.10/1000 emails) |
| Payments | Stripe | Embedded checkout, webhooks |
| Booking | Calendly | Coach scheduling (auto-assigned) |
| Auth | AWS Cognito or simple JWT | Admin dashboard authentication |
| Assessments | External links | PCA/MIL assessment software |

### Infrastructure (AWS Serverless - Pay-Per-Request)

**Scale Context:**
- Month 1: 6,000 contacts (testing)
- Month 2+: Scale to 140,000+ contacts
- Total available: 250,000+ emails

| Component | Service | Pricing Model | Est. Month 1 |
|-----------|---------|---------------|--------------|
| API | Lambda + API Gateway | Pay per request | ~$5 |
| Database | DynamoDB (on-demand) | Pay per read/write | ~$5 |
| Email Queue | SQS | Pay per message | ~$1 |
| Email Sending | AWS SES | $0.10/1000 emails | ~$1 (6K) |
| Frontend | Vercel (Free tier) | Free | $0 |
| Booking | Calendly | Free/Pro tier | $0-12 |
| **Total Month 1** | | | **~$12-24** |

**Why Serverless Pay-Per-Request:**
- Start small: Month 1 with 6K emails costs < $25
- Auto-scales: No changes needed when scaling to 250K
- No idle costs: Pay only when system is used
- Your $90 credits: Lasts 4-6 months at this usage

**Scaling Costs (Automatic):**
- 6K emails/month: ~$12-24
- 50K emails/month: ~$30-50
- 250K emails/month: ~$80-120

**AWS SES Setup Required:**
1. Exit sandbox mode (request via AWS Support, 24-48h)
2. Verify sending domain (DNS records)
3. Request sending limit increase as needed
4. Set up SNS for bounce/complaint notifications

---

## 2. Complete Pipeline (Finalized)

### STEP 1: Contact Import
```
Upload XLSX (Data TIMS Centroamerica)
    ↓
Auto-filter: Keep only personal emails (@gmail, @yahoo, @outlook, @hotmail)
    ↓
Skip duplicates (if email exists, ignore new row)
    ↓
Store in database with is_personal_email = true
```

### STEP 2: Campaign Creation
```
Admin Dashboard:
1. Select recipients:
   - All eligible contacts (personal email, not unsubscribed)
   - Filter by fields (company, evaluation, date range)
   - Upload custom list
2. Write bilingual email content
3. Include ONE link → Landing page
4. Send immediately OR schedule for later
```

### STEP 3: Customer Journey
```
┌─────────────────────────────────────────────────────────────────────────┐
│  CUSTOMER FLOW                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  📧 Marketing Email (received)                                          │
│      └── Click link                                                     │
│              ↓                                                          │
│  🌐 Landing Page (public, no login)                                     │
│      └── Shows MIL & PCA software information                           │
│      └── "View Plans" button                                            │
│              ↓                                                          │
│  💰 Pricing Page (6 tiers, SaaS-style)                                  │
│      └── Customer selects a plan                                        │
│      └── Click "Buy Now"                                                │
│              ↓                                                          │
│  💳 Embedded Stripe Checkout (stays on your site)                       │
│      └── Customer completes payment                                     │
│              ↓                                                          │
│  ✅ Payment Success                                                      │
│      └── Thank you popup displayed                                      │
│      └── AUTO EMAIL sent with assessment link(s)                        │
│          (one-time use, expires on completion)                          │
│              ↓                                                          │
│  📅 If coaching plan → Redirect to Calendly                             │
│      └── Shows auto-assigned coach availability                         │
│      └── Premium plans → Andres Tafur                                   │
│      └── Regular plans → Other coach                                    │
│      └── Customer books slot                                            │
│      └── Both parties notified                                          │
│              ↓                                                          │
│  📋 Assessment (external link from email)                               │
│      └── Customer takes PCA (and MIL if included)                       │
│      └── Link disabled after completion                                 │
│              ↓                                                          │
│  📄 PDF Delivery (manual, external)                                     │
│      └── Admin creates PDF in external system                           │
│      └── Admin sends PDF via email manually                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### STEP 4: Booking Flow (via Calendly)
```
- Calendly shows coach availability (9 AM - 7 PM weekdays)
- Auto-assigned based on plan (premium → Andres, regular → other coach)
- Customer books → Both parties notified automatically by Calendly
- 24h + 1h reminders sent automatically by Calendly
- Can reschedule/cancel up to 24 hours before
```

### STEP 5: Admin Flow
```
Dashboard (Federico & Andres only):
├── Payment notification (email + dashboard)
│   └── Basic info: customer name, email, product, amount
├── Full funnel tracking
│   └── Emails: sent, opened, clicked
│   └── Conversions: who purchased
├── Contact management
│   └── View all contacts
│   └── Unsubscribed marked (kept in DB, never emailed)
└── Campaign analytics
```

### STEP 6: External (NOT in platform)
```
- Assessments: External software (general links)
- PDF creation: External system (manual)
- PDF delivery: Manual email
```

### Product Plans Summary
| # | Plan Name | Price | Includes | Coaching |
|---|-----------|-------|----------|----------|
| 1 | Examen PCA | $45 | PCA exam | None |
| 2 | Examen MIL + PCA | $60 | MIL + PCA exams | None |
| 3 | Examen PCA + Coaching | $100 | PCA exam | Regular coach (60 min) |
| 4 | Examen PCA + Coaching con Andres | $160 | PCA exam | Andres Tafur (60 min) |
| 5 | Examen PCA + MIL + Coaching | $115 | PCA + MIL exams | Regular coach (60 min) |
| 6 | Examen PCA + MIL + Coaching con Andres | $175 | PCA + MIL + Personality | Andres Tafur (60 min) |

---

## 3. System Architecture (renumbered from original)

```
                                    +------------------+
                                    |   Admin Panel    |
                                    |   (Next.js)      |
                                    +--------+---------+
                                             |
                                             | HTTPS (OAuth protected)
                                             v
+------------------+              +------------------+              +------------------+
|                  |   Webhook   |                  |              |                  |
|      Stripe      +------------>+   API Gateway    +<------------>+    Database      |
|                  |             |   (NestJS BFF)   |              |   (PostgreSQL)   |
+------------------+              +--------+---------+              +------------------+
                                          |
                                          | Jobs
                                          v
+------------------+              +------------------+              +------------------+
|                  |   SMTP      |                  |   Graph API  |                  |
|    AWS SES       +<------------+   Job Queue      +------------->+    Microsoft     |
|                  |             |   (Bull/Redis)   |              |    Outlook       |
+------------------+              +------------------+              +------------------+
```

---

## 3. Database Schema (DynamoDB)

### DynamoDB Tables

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TABLE: Contacts                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  PK: email (String)                                                     │
│  Attributes:                                                            │
│    - firstName, lastName (from XLSX: Nombres, Apellidos)                │
│    - company (from XLSX: Compañia)                                      │
│    - evaluation (from XLSX: Evaluacion)                                 │
│    - startDate, endDate (from XLSX: Fecha de inicio/fin)                │
│    - recordStatus (from XLSX: Estado)                                   │
│    - emailStatus: "active" | "unsubscribed" | "bounced"                 │
│    - isPersonalEmail: true/false                                        │
│    - createdAt, updatedAt                                               │
│                                                                          │
│  GSI: emailStatus-index (for querying active contacts)                  │
│  GSI: isPersonalEmail-index (for filtering sendable contacts)           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  TABLE: Campaigns                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  PK: campaignId (String - UUID)                                         │
│  Attributes:                                                            │
│    - name, subject                                                      │
│    - fromName, fromEmail                                                │
│    - htmlContent, textContent                                           │
│    - status: "draft" | "scheduled" | "sending" | "sent"                 │
│    - scheduledAt (ISO timestamp)                                        │
│    - totalRecipients, sentCount, openCount, clickCount                  │
│    - createdAt                                                          │
│                                                                          │
│  GSI: status-index (for querying campaigns by status)                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  TABLE: CampaignRecipients                                              │
├─────────────────────────────────────────────────────────────────────────┤
│  PK: campaignId (String)                                                │
│  SK: email (String)                                                     │
│  Attributes:                                                            │
│    - status: "pending" | "sent" | "opened" | "clicked" | "bounced"     │
│    - sentAt, openedAt, clickedAt                                        │
│    - messageId (SES message ID)                                         │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  TABLE: Products                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  PK: productId (String - matches Stripe product ID)                     │
│  Attributes:                                                            │
│    - name, nameEs (bilingual)                                           │
│    - description, descriptionEs                                         │
│    - priceCents, currency                                               │
│    - stripePriceId                                                      │
│    - includesPca, includesMil, includesCoaching, isPremiumCoaching      │
│    - includesPersonalityExam                                            │
│    - calendlyLink (coach-specific Calendly URL)                         │
│    - assessmentLinks: { pca: "url", mil: "url" }                        │
│    - isActive                                                           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  TABLE: Orders                                                           │
├─────────────────────────────────────────────────────────────────────────┤
│  PK: orderId (String - UUID)                                            │
│  Attributes:                                                            │
│    - stripeSessionId, stripePaymentIntentId                             │
│    - productId                                                          │
│    - customerEmail, customerName                                        │
│    - amountCents, currency                                              │
│    - status: "pending" | "paid" | "refunded"                            │
│    - assessmentToken (unique token for assessment access)               │
│    - assessmentCompleted: { pca: false, mil: false }                    │
│    - calendlyBooked: true/false                                         │
│    - createdAt, paidAt                                                  │
│                                                                          │
│  GSI: stripeSessionId-index (for webhook lookup)                        │
│  GSI: customerEmail-index (for customer order history)                  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  TABLE: WebhookEvents (idempotency)                                     │
├─────────────────────────────────────────────────────────────────────────┤
│  PK: eventId (String - Stripe event ID)                                 │
│  Attributes:                                                            │
│    - eventType                                                          │
│    - processedAt                                                        │
│  TTL: 7 days (auto-delete old events)                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Product Plans Data

```javascript
// 6 TIMS certification plans
const products = [
  { id: "1", name: "Examen PCA", price: 4500, includesPca: true, includesMil: false, includesCoaching: false },
  { id: "2", name: "Examen MIL + PCA", price: 6000, includesPca: true, includesMil: true, includesCoaching: false },
  { id: "3", name: "Examen PCA + Coaching", price: 10000, includesPca: true, includesMil: false, includesCoaching: true, isPremiumCoaching: false },
  { id: "4", name: "Examen PCA + Coaching con Andres", price: 16000, includesPca: true, includesMil: false, includesCoaching: true, isPremiumCoaching: true },
  { id: "5", name: "Examen PCA + MIL + Coaching", price: 11500, includesPca: true, includesMil: true, includesCoaching: true, isPremiumCoaching: false },
  { id: "6", name: "Examen PCA + MIL + Coaching con Andres", price: 17500, includesPca: true, includesMil: true, includesCoaching: true, isPremiumCoaching: true, includesPersonalityExam: true }
];
```

---

## 4. Security Architecture

### Authentication (OAuth 2.0 with Microsoft Entra ID)

```
User → Frontend → Backend BFF → Microsoft Entra ID
                      ↓
              Session stored in Redis
              HTTP-only cookie returned
```

**Token Strategy:**
- Access Token: Server-side only (Redis), 15 min expiry
- Refresh Token: Server-side only (Redis), 7 days expiry
- Session ID: HTTP-only, Secure, SameSite=Strict cookie

### API Security Middleware Stack (in order)

1. **Rate Limiter** - Token bucket per user/IP
2. **CORS Validation** - Strict origin whitelist
3. **CSRF Protection** - Double-submit cookie pattern
4. **Session Validation** - Verify HTTP-only cookie
5. **Input Validation** - Zod schemas on all endpoints
6. **Authorization** - Role-based access control
7. **Audit Logging** - All requests logged

### Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| Authentication | 5 req | 1 min |
| Campaign send | 10 req | 1 min |
| Contact import | 5 req | 10 min |
| API read | 100 req | 1 min |
| API write | 30 req | 1 min |
| Webhooks | 1000 req | 1 min |

### Data Encryption

- **In Transit**: TLS 1.3 everywhere
- **At Rest**: AES-256-GCM for PII (emails, names, OAuth tokens)
- **Database**: PostgreSQL disk encryption

### Webhook Security

- **Stripe**: Signature verification with `stripe.webhooks.constructEvent()`
- **AWS SES**: SNS notifications for bounces/complaints
- **Idempotency**: Store processed event IDs, skip duplicates

---

## 5. Email Campaign System (250K+ Scale)

### Architecture: Lambda + SQS for Batch Processing

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Campaign Send Flow (250K+ emails)                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Admin clicks "Send Campaign"                                           │
│           │                                                              │
│           ▼                                                              │
│  ┌─────────────────────┐                                                │
│  │ NestJS API          │ 1. Create campaign_recipients records          │
│  │ (Lightsail)         │ 2. Split into batches (1000 per message)       │
│  └──────────┬──────────┘ 3. Push batches to SQS                         │
│             │                                                            │
│             ▼                                                            │
│  ┌─────────────────────┐                                                │
│  │ AWS SQS Queue       │ Stores batches with retry + dead letter        │
│  │ (email-batches)     │                                                │
│  └──────────┬──────────┘                                                │
│             │ Triggers (concurrency: 10)                                │
│             ▼                                                            │
│  ┌─────────────────────┐                                                │
│  │ Lambda Function     │ 1. Process 1000 emails per invocation         │
│  │ (email-processor)   │ 2. Rate limit: 14/sec (SES limit)             │
│  └──────────┬──────────┘ 3. Send via SES                                │
│             │                                                            │
│             ▼                                                            │
│  ┌─────────────────────┐                                                │
│  │ AWS SES             │ Actually sends emails                          │
│  └──────────┬──────────┘                                                │
│             │                                                            │
│             ▼                                                            │
│  ┌─────────────────────┐                                                │
│  │ SNS Notifications   │ Bounces, complaints → update contact status   │
│  └─────────────────────┘                                                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Throughput Calculation

| Metric | Value | Notes |
|--------|-------|-------|
| SES Rate Limit | 14/sec | Default production, request higher |
| Lambda Concurrency | 10 | 10 parallel executions |
| Batch Size | 1000 | Emails per SQS message |
| **Effective Rate** | ~14/sec | ~50K/hour |
| **250K Campaign** | ~5 hours | Can be faster with higher SES limits |

### AWS SES Setup (Critical)

1. **Exit Sandbox Mode** (Day 1)
   - Submit request via AWS Support
   - Takes 24-48 hours approval

2. **Verify Domain** (Required)
   - Add DNS records (DKIM, SPF)
   - Enables sending from your domain

3. **Request Sending Limit Increase**
   - Default: 50,000/day
   - Request: 300,000/day (for 250K campaigns)

4. **Configure Notifications**
   - SNS topic for bounces/complaints
   - Auto-update contact status

### Rate Limiting Strategy

```typescript
// Lambda email processor
const SES_RATE_LIMIT = 14; // emails per second
const BATCH_SIZE = 1000;

async function processEmailBatch(batch: Contact[]) {
  for (const contact of batch) {
    await sendEmail(contact);
    await sleep(1000 / SES_RATE_LIMIT); // Rate limit delay
  }
}
```

### Failure Handling

- **SQS Dead Letter Queue** - Failed batches after 3 retries
- **Contact Status Updates** - Bounced/complained emails marked automatically
- **Dashboard Alerts** - Notify admin of delivery issues

### Email Tracking

- Open tracking via pixel
- Click tracking via redirect URLs
- Bounce/complaint handling via webhooks
- Unsubscribe link in all emails

---

## 6. Payment & Booking Flow

### User Journey
```
Email CTA → Landing Page → Pricing Page → Embedded Checkout → Success Page
                                                                   ↓
                                          ┌────────────────────────────────┐
                                          │ Auto-email sent with           │
                                          │ assessment link(s)             │
                                          └────────────────────────────────┘
                                                                   ↓
                                          ┌────────────────────────────────┐
                                          │ If coaching plan:              │
                                          │ Redirect to Calendly           │
                                          │ (auto-assigned coach)          │
                                          └────────────────────────────────┘
```

### Stripe Integration

1. **Embedded Checkout** - Customer stays on your site
2. **Webhook Handler** for `checkout.session.completed`
3. **Idempotent Processing** - Store processed webhook IDs
4. **Assessment Token** - Generate unique token for one-time assessment access

### Calendly Integration (No Custom Code Needed!)

1. **Two Calendly accounts**: Andres (premium) + Regular coach
2. **Auto-redirect**: Based on product purchased
   - Premium plans → Andres's Calendly link
   - Regular plans → Other coach's Calendly link
3. **Calendly handles**: Availability, reminders, rescheduling, cancellation

### Assessment Link Flow

```javascript
// After payment confirmed:
1. Generate unique assessmentToken (UUID)
2. Store in Orders table: { orderId, assessmentToken, assessmentCompleted: false }
3. Send email with link: /assess/{assessmentToken}
4. When customer visits link:
   - Validate token exists and not completed
   - Redirect to external assessment URL
   - Mark assessmentCompleted: true (one-time use)
```

### Edge Cases

- **Duplicate payment webhook**: Idempotency check prevents double processing
- **Assessment link reuse**: Token marked completed, shows "already completed" message
- **Calendly no-show**: Handled by Calendly's policies (you configure in Calendly)

---

## 7. Project Structure (Serverless)

```
/
├── apps/
│   └── web/                    # Next.js Frontend (Vercel)
│       ├── app/
│       │   ├── (auth)/         # Admin login
│       │   ├── (dashboard)/    # Admin dashboard (protected)
│       │   │   ├── contacts/   # Import XLSX, view/filter contacts
│       │   │   ├── campaigns/  # Create/send campaigns, templates
│       │   │   ├── orders/     # Payment history, notifications
│       │   │   └── analytics/  # Email + conversion tracking
│       │   │
│       │   ├── (public)/       # Public pages (no login)
│       │   │   ├── landing/    # MIL/PCA info page
│       │   │   ├── pricing/    # 6 product tiers
│       │   │   ├── checkout/   # Embedded Stripe checkout
│       │   │   ├── success/    # Thank you + Calendly redirect
│       │   │   └── assess/     # Assessment access page (token-based)
│       │   │
│       │   └── api/            # Next.js API routes (or separate Lambda)
│       │       ├── contacts/   # Contact CRUD
│       │       ├── campaigns/  # Campaign management
│       │       ├── checkout/   # Stripe session creation
│       │       └── webhooks/   # Stripe webhooks
│       │
│       └── components/
│           ├── email-editor/   # Bilingual template editor
│           └── ui/             # Shadcn components
│
├── lambda/                     # AWS Lambda Functions (if separate)
│   ├── email-processor/        # SQS → SES batch sending
│   ├── bounce-handler/         # SNS → DynamoDB update
│   └── assessment-email/       # Auto-send assessment links
│
├── infrastructure/             # AWS SAM or SST
│   ├── template.yaml           # SAM template
│   └── lib/
│       ├── api-stack.ts
│       ├── dynamodb-stack.ts
│       └── ses-stack.ts
│
└── packages/
    └── shared/                 # Shared types, utilities
```

---

## 8. Implementation Phases

### Phase 1: AWS Setup + Stripe + Calendly (Week 1)
- [ ] Set up AWS account and IAM
- [ ] Create DynamoDB tables (on-demand capacity)
- [ ] Request AWS SES production access (24-48h wait)
- [ ] Verify sending domain in SES
- [ ] Create SQS queues (email-batches, dead-letter)
- [ ] Set up 6 Stripe products/prices
- [ ] Configure 2 Calendly accounts (Andres + regular coach)
- [ ] Get Calendly booking links for each coach

### Phase 2: Public Customer Flow (Week 1-2)
- [ ] Next.js project setup (Vercel deployment)
- [ ] Landing page (MIL/PCA info, bilingual)
- [ ] Pricing page (6 tiers, SaaS-style)
- [ ] Embedded Stripe checkout page
- [ ] Success page with Calendly redirect logic
- [ ] Assessment access page (token validation)
- [ ] Test full customer journey

### Phase 3: Contact Management (Week 2-3)
- [ ] Simple admin authentication (JWT or Cognito)
- [ ] Dashboard layout
- [ ] XLSX import with auto-filtering
- [ ] Contact list with search/filter
- [ ] Unsubscribe handling
- [ ] Test with 6000 contacts

### Phase 4: Email Campaigns (Week 3-4)
- [ ] Campaign creation UI (bilingual template editor)
- [ ] Recipient selection (all, filtered, custom list)
- [ ] Lambda for batch email sending
- [ ] Send now + schedule for later
- [ ] Open/click tracking (pixel + redirect)
- [ ] Campaign analytics dashboard
- [ ] Bounce/complaint handling (SNS → Lambda)

### Phase 5: Payment & Automation (Week 4-5)
- [ ] Stripe webhook handler
- [ ] Auto-send assessment email (Lambda)
- [ ] One-time assessment link logic
- [ ] Admin payment notifications
- [ ] Order history page
- [ ] Full funnel tracking (email → click → purchase)

### Phase 6: Polish & Testing (Week 5-6)
- [ ] Error monitoring (CloudWatch + Sentry)
- [ ] Test with 6K email campaign
- [ ] Security review
- [ ] Mobile responsiveness
- [ ] Documentation
- [ ] Production deployment

---

## 9. Critical Files to Create

### Public Pages (Next.js - no auth)
| File | Purpose |
|------|---------|
| `/apps/web/app/(public)/landing/page.tsx` | MIL/PCA information page |
| `/apps/web/app/(public)/pricing/page.tsx` | 6-tier pricing page |
| `/apps/web/app/(public)/checkout/[productId]/page.tsx` | Embedded Stripe checkout |
| `/apps/web/app/(public)/success/page.tsx` | Thank you + Calendly redirect |
| `/apps/web/app/(public)/assess/[token]/page.tsx` | Assessment access (one-time link) |

### Admin Dashboard (Next.js - protected)
| File | Purpose |
|------|---------|
| `/apps/web/app/(dashboard)/page.tsx` | Dashboard home with notifications |
| `/apps/web/app/(dashboard)/contacts/page.tsx` | XLSX import, contact management |
| `/apps/web/app/(dashboard)/campaigns/page.tsx` | Campaign creation, template editor |
| `/apps/web/app/(dashboard)/campaigns/[id]/page.tsx` | Campaign details + analytics |
| `/apps/web/app/(dashboard)/orders/page.tsx` | Payment history, full funnel view |

### API Routes (Next.js or Lambda)
| File | Purpose |
|------|---------|
| `/apps/web/app/api/contacts/import/route.ts` | XLSX import with filtering |
| `/apps/web/app/api/campaigns/send/route.ts` | Dispatch to SQS for sending |
| `/apps/web/app/api/checkout/route.ts` | Create Stripe checkout session |
| `/apps/web/app/api/webhooks/stripe/route.ts` | Stripe payment webhooks |

### Lambda Functions (AWS)
| File | Purpose |
|------|---------|
| `/lambda/email-processor/handler.ts` | SQS → SES batch sending |
| `/lambda/assessment-email/handler.ts` | Auto-send assessment links post-payment |
| `/lambda/bounce-handler/handler.ts` | SNS → DynamoDB (update contact status) |

---

## 10. Environment Variables Required

```env
# AWS (for Lambda, DynamoDB, SES, SQS)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

# AWS SES
SES_FROM_EMAIL=noreply@yourdomain.com
SES_FROM_NAME=TIMS International

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Calendly Links (per coach)
CALENDLY_LINK_ANDRES=https://calendly.com/andres-tafur/coaching
CALENDLY_LINK_REGULAR=https://calendly.com/tims-coach/coaching

# Assessment Links (external)
ASSESSMENT_PCA_URL=https://external-assessment-site.com/pca
ASSESSMENT_MIL_URL=https://external-assessment-site.com/mil

# Admin Auth
JWT_SECRET=your-secret-key
ADMIN_EMAILS=andres@tims.com,federico@tims.com

# URLs
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## 11. Verification & Testing Plan

### Unit Tests
- Auth middleware
- Input validation schemas
- Encryption/decryption utilities
- Rate limiting logic

### Integration Tests
- OAuth flow end-to-end
- Stripe checkout + webhook flow
- Email sending + tracking
- Calendar event creation

### E2E Tests
- Full user journey: Login → Create Campaign → Send → Track
- Payment flow: Email CTA → Checkout → Booking → Confirmation

### Load Testing
- 5000 email campaign send
- 100 concurrent checkout sessions
- Calendar availability under load

### Security Testing
- OWASP ZAP scan
- Rate limit bypass attempts
- Webhook signature spoofing
- SQL injection attempts

---

## 12. Estimated Monthly Costs (Pay-Per-Request)

| Service | Month 1 (6K) | Month 2+ (50K) | Full Scale (250K) |
|---------|--------------|----------------|-------------------|
| AWS Lambda + API Gateway | ~$5 | ~$10 | ~$25 |
| AWS DynamoDB (on-demand) | ~$5 | ~$10 | ~$20 |
| AWS SQS | ~$1 | ~$2 | ~$5 |
| AWS SES | ~$1 | ~$5 | ~$25 |
| Vercel (Frontend) | $0 | $0 | $0 |
| Calendly | $0-12 | $0-12 | $0-12 |
| Stripe | 2.9% + $0.30/txn | Variable | Variable |
| **Total** | **~$12-24** | **~$30-50** | **~$80-120** |

**Your $90 AWS Credits:**
- Month 1 (6K emails): ~$12 → Credits last 7+ months
- If scaling to 50K/month: Credits last 2-3 months
- Revenue should cover costs before credits run out

**Key Benefit: True Pay-Per-Request**
- No idle costs when not sending campaigns
- Scales automatically without configuration changes
- Perfect for variable campaign frequency

---

## 13. Email Templates (Bilingual)

### Template Types
1. **Marketing Campaign** - Promotional emails with Stripe payment links
2. **Payment Confirmation** - Receipt with exam delivery notice
3. **Booking Link** - For plans with coaching (includes scheduling link)
4. **Appointment Confirmation** - Calendar details + meeting link
5. **Appointment Reminder** - 24h and 1h before session

### Personalization Variables
- `{{first_name}}` / `{{nombres}}`
- `{{company}}` / `{{compañia}}`
- `{{product_name}}` / `{{nombre_producto}}`
- `{{payment_link}}` - Stripe checkout URL
- `{{booking_link}}` - Appointment scheduling URL
- `{{meeting_link}}` - Teams/Zoom link

---

## 14. Admin Dashboard Features

### Pages
1. **Dashboard Home** - Recent payments, pending deliveries, upcoming appointments
2. **Contacts** - Import XLSX, view/filter contacts, email status
3. **Campaigns** - Create/edit campaigns, template editor, send/schedule
4. **Products** - Manage 6 Stripe products, pricing, descriptions
5. **Orders** - Payment history, mark as delivered, filter by status
6. **Appointments** - Calendar view, upcoming sessions, coach assignment
7. **Analytics** - Emails sent/opened/clicked, payments received

### Notifications Panel
- Real-time notifications for new payments
- Quick action: "Mark as Delivered" button
- Filter: Unread / All

---

## 15. Key Implementation Details

### Email Domain Filtering (Contact Import)
```typescript
const ALLOWED_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

function isPersonalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return ALLOWED_DOMAINS.includes(domain);
}
```

### Coach Assignment Logic
```typescript
function assignCoach(product: Product): Coach {
  if (product.is_premium_coaching) {
    return findCoach({ name: 'Andres Tafur' });
  }
  return findCoach({ is_premium: false, is_active: true });
}
```

### Working Hours (Central America)
- Monday-Friday: 9:00 AM - 7:00 PM
- Timezone: America/Guatemala (or user's local timezone)
- Appointment slots: 60 minutes each

---

## 16. Project Structure (Clean Architecture)

```
tims-marketing-platform/
├── Root Configuration
│   ├── package.json                    # Dependencies & scripts
│   ├── next.config.js                  # Next.js configuration
│   ├── tailwind.config.js              # Tailwind + Shadcn theme
│   ├── tsconfig.json                   # TypeScript config
│   ├── vercel.json                     # Vercel deployment
│   ├── .env.local                      # Environment variables
│   └── README.md
│
├── docs/                               # Documentation
│   ├── 01-system-overview.md
│   ├── 02-aws-integration.md
│   ├── 03-stripe-setup.md
│   ├── 04-email-campaign-flow.md
│   └── 05-deployment-guide.md
│
├── apps/
│   └── web/                            # Next.js 14 Frontend
│       ├── package.json
│       │
│       └── src/
│           ├── app/                    # Next.js App Router
│           │   ├── layout.tsx          # Root layout
│           │   ├── globals.css
│           │   │
│           │   ├── (public)/           # Public pages (no auth)
│           │   │   ├── page.tsx                    # Landing page
│           │   │   ├── pricing/
│           │   │   │   └── page.tsx                # Pricing page (6 tiers)
│           │   │   ├── checkout/
│           │   │   │   └── [productId]/
│           │   │   │       └── page.tsx            # Stripe embedded checkout
│           │   │   ├── success/
│           │   │   │   └── page.tsx                # Thank you + Calendly redirect
│           │   │   └── assess/
│           │   │       └── [token]/
│           │   │           └── page.tsx            # Assessment access (one-time)
│           │   │
│           │   ├── (auth)/             # Auth pages
│           │   │   ├── login/
│           │   │   │   └── page.tsx
│           │   │   └── layout.tsx
│           │   │
│           │   ├── (dashboard)/        # Protected admin pages
│           │   │   ├── layout.tsx                  # Dashboard layout with sidebar
│           │   │   ├── page.tsx                    # Dashboard home
│           │   │   │
│           │   │   ├── contacts/
│           │   │   │   ├── page.tsx                # Contact list
│           │   │   │   └── import/
│           │   │   │       └── page.tsx            # XLSX import
│           │   │   │
│           │   │   ├── campaigns/
│           │   │   │   ├── page.tsx                # Campaign list
│           │   │   │   ├── new/
│           │   │   │   │   └── page.tsx            # Create campaign
│           │   │   │   └── [id]/
│           │   │   │       ├── page.tsx            # Campaign details
│           │   │   │       └── analytics/
│           │   │   │           └── page.tsx        # Campaign analytics
│           │   │   │
│           │   │   ├── orders/
│           │   │   │   ├── page.tsx                # Order history
│           │   │   │   └── [id]/
│           │   │   │       └── page.tsx            # Order details
│           │   │   │
│           │   │   ├── analytics/
│           │   │   │   └── page.tsx                # Full funnel analytics
│           │   │   │
│           │   │   └── settings/
│           │   │       └── page.tsx                # Admin settings
│           │   │
│           │   └── api/                # API Routes
│           │       ├── contacts/
│           │       │   ├── route.ts                # GET/POST contacts
│           │       │   ├── [id]/
│           │       │   │   └── route.ts            # GET/PATCH/DELETE contact
│           │       │   └── import/
│           │       │       └── route.ts            # XLSX import endpoint
│           │       │
│           │       ├── campaigns/
│           │       │   ├── route.ts                # GET/POST campaigns
│           │       │   ├── [id]/
│           │       │   │   └── route.ts            # Campaign CRUD
│           │       │   └── send/
│           │       │       └── route.ts            # Trigger campaign send
│           │       │
│           │       ├── checkout/
│           │       │   └── route.ts                # Create Stripe session
│           │       │
│           │       ├── webhooks/
│           │       │   ├── stripe/
│           │       │   │   └── route.ts            # Stripe webhooks
│           │       │   └── ses/
│           │       │       └── route.ts            # SES bounce/complaint
│           │       │
│           │       └── assess/
│           │           └── [token]/
│           │               └── route.ts            # Validate assessment token
│           │
│           ├── core/                   # Core Application Logic
│           │   ├── auth/
│           │   │   ├── AuthContext.tsx
│           │   │   ├── ProtectedRoute.tsx
│           │   │   ├── hooks/
│           │   │   │   └── useAuth.ts
│           │   │   └── components/
│           │   │       ├── LoginForm.tsx
│           │   │       └── AuthGuard.tsx
│           │   │
│           │   └── i18n/               # Bilingual (ES/EN)
│           │       ├── LanguageContext.tsx
│           │       ├── useTranslation.ts
│           │       └── locales/
│           │           ├── en.json
│           │           └── es.json
│           │
│           ├── features/               # Feature Modules
│           │   ├── landing/
│           │   │   ├── components/
│           │   │   │   ├── Hero.tsx
│           │   │   │   ├── Features.tsx
│           │   │   │   ├── Testimonials.tsx
│           │   │   │   ├── CTASection.tsx
│           │   │   │   └── index.ts
│           │   │   └── data/
│           │   │       └── content.ts
│           │   │
│           │   ├── pricing/
│           │   │   ├── components/
│           │   │   │   ├── PricingGrid.tsx
│           │   │   │   ├── PricingCard.tsx
│           │   │   │   ├── FeatureList.tsx
│           │   │   │   └── index.ts
│           │   │   ├── hooks/
│           │   │   │   └── useProducts.ts
│           │   │   ├── types/
│           │   │   │   └── Product.types.ts
│           │   │   └── data/
│           │   │       └── products.ts             # 6 product definitions
│           │   │
│           │   ├── checkout/
│           │   │   ├── components/
│           │   │   │   ├── CheckoutForm.tsx
│           │   │   │   ├── OrderSummary.tsx
│           │   │   │   ├── SuccessMessage.tsx
│           │   │   │   └── index.ts
│           │   │   ├── hooks/
│           │   │   │   ├── useCheckout.ts
│           │   │   │   └── useCalendlyRedirect.ts
│           │   │   └── types/
│           │   │       └── Checkout.types.ts
│           │   │
│           │   ├── contacts/
│           │   │   ├── components/
│           │   │   │   ├── ContactList.tsx
│           │   │   │   ├── ContactTable.tsx
│           │   │   │   ├── ContactFilters.tsx
│           │   │   │   ├── ImportModal.tsx
│           │   │   │   ├── ImportProgress.tsx
│           │   │   │   └── index.ts
│           │   │   ├── hooks/
│           │   │   │   ├── useContacts.ts
│           │   │   │   └── useContactImport.ts
│           │   │   ├── api/
│           │   │   │   └── contacts.ts
│           │   │   ├── types/
│           │   │   │   └── Contact.types.ts
│           │   │   └── utils/
│           │   │       ├── xlsxParser.ts
│           │   │       ├── emailFilter.ts          # Personal email filtering
│           │   │       └── contactHelpers.ts
│           │   │
│           │   ├── campaigns/
│           │   │   ├── components/
│           │   │   │   ├── CampaignList.tsx
│           │   │   │   ├── CampaignCard.tsx
│           │   │   │   ├── CampaignForm.tsx
│           │   │   │   ├── EmailEditor.tsx         # Bilingual template editor
│           │   │   │   ├── RecipientSelector.tsx
│           │   │   │   ├── SchedulePicker.tsx
│           │   │   │   ├── CampaignStats.tsx
│           │   │   │   └── index.ts
│           │   │   ├── hooks/
│           │   │   │   ├── useCampaigns.ts
│           │   │   │   ├── useCampaignMutations.ts
│           │   │   │   └── useCampaignAnalytics.ts
│           │   │   ├── api/
│           │   │   │   └── campaigns.ts
│           │   │   ├── types/
│           │   │   │   └── Campaign.types.ts
│           │   │   └── utils/
│           │   │       ├── templateHelpers.ts
│           │   │       └── recipientFilters.ts
│           │   │
│           │   ├── orders/
│           │   │   ├── components/
│           │   │   │   ├── OrderList.tsx
│           │   │   │   ├── OrderTable.tsx
│           │   │   │   ├── OrderDetails.tsx
│           │   │   │   ├── PaymentStatus.tsx
│           │   │   │   └── index.ts
│           │   │   ├── hooks/
│           │   │   │   └── useOrders.ts
│           │   │   ├── api/
│           │   │   │   └── orders.ts
│           │   │   └── types/
│           │   │       └── Order.types.ts
│           │   │
│           │   ├── analytics/
│           │   │   ├── components/
│           │   │   │   ├── AnalyticsDashboard.tsx
│           │   │   │   ├── FunnelChart.tsx
│           │   │   │   ├── EmailMetrics.tsx
│           │   │   │   ├── ConversionStats.tsx
│           │   │   │   └── index.ts
│           │   │   ├── hooks/
│           │   │   │   └── useAnalytics.ts
│           │   │   └── types/
│           │   │       └── Analytics.types.ts
│           │   │
│           │   └── dashboard/
│           │       ├── components/
│           │       │   ├── DashboardLayout.tsx
│           │       │   ├── Sidebar.tsx
│           │       │   ├── Header.tsx
│           │       │   ├── NotificationPanel.tsx
│           │       │   ├── QuickStats.tsx
│           │       │   ├── RecentPayments.tsx
│           │       │   └── index.ts
│           │       └── hooks/
│           │           └── useDashboardData.ts
│           │
│           ├── shared/                 # Shared Components
│           │   ├── components/
│           │   │   ├── ui/             # Shadcn/ui components
│           │   │   │   ├── Button.tsx
│           │   │   │   ├── Input.tsx
│           │   │   │   ├── Card.tsx
│           │   │   │   ├── Modal.tsx
│           │   │   │   ├── Table.tsx
│           │   │   │   ├── Badge.tsx
│           │   │   │   ├── Tabs.tsx
│           │   │   │   └── index.ts
│           │   │   ├── layout/
│           │   │   │   ├── Container.tsx
│           │   │   │   ├── PageHeader.tsx
│           │   │   │   └── index.ts
│           │   │   └── feedback/
│           │   │       ├── LoadingSpinner.tsx
│           │   │       ├── ErrorMessage.tsx
│           │   │       ├── Toast.tsx
│           │   │       ├── EmptyState.tsx
│           │   │       └── index.ts
│           │   │
│           │   ├── hooks/
│           │   │   ├── useDebounce.ts
│           │   │   ├── useLocalStorage.ts
│           │   │   ├── usePagination.ts
│           │   │   └── useMediaQuery.ts
│           │   │
│           │   └── utils/
│           │       ├── formatters.ts               # Date, currency formatters
│           │       ├── validators.ts               # Email, form validation
│           │       └── helpers.ts
│           │
│           ├── lib/                    # Third-party Integrations
│           │   ├── stripe/
│           │   │   ├── client.ts
│           │   │   └── webhooks.ts
│           │   ├── aws/
│           │   │   ├── dynamodb.ts
│           │   │   ├── sqs.ts
│           │   │   └── ses.ts
│           │   └── calendly/
│           │       └── redirects.ts
│           │
│           ├── config/
│           │   ├── index.ts                        # Central config export
│           │   ├── constants.ts                    # App constants
│           │   ├── products.ts                     # 6 product definitions
│           │   └── env.ts                          # Environment validation
│           │
│           └── types/
│               ├── common.types.ts
│               └── api.types.ts
│
├── lambda/                             # AWS Lambda Functions
│   ├── package.json
│   ├── tsconfig.json
│   │
│   ├── shared/                         # Shared Lambda utilities
│   │   ├── dynamodb.ts
│   │   ├── ses.ts
│   │   ├── response.ts
│   │   └── validators.ts
│   │
│   ├── email-processor/                # SQS → SES batch sending
│   │   ├── handler.ts
│   │   └── utils/
│   │       ├── rateLimiter.ts
│   │       └── emailBuilder.ts
│   │
│   ├── assessment-email/               # Auto-send assessment links
│   │   ├── handler.ts
│   │   └── templates/
│   │       ├── assessment-en.html
│   │       └── assessment-es.html
│   │
│   └── bounce-handler/                 # SNS → DynamoDB update
│       └── handler.ts
│
├── infrastructure/                     # AWS SAM/SST
│   ├── template.yaml                   # SAM template
│   └── lib/
│       ├── api-stack.ts
│       ├── dynamodb-stack.ts
│       ├── sqs-stack.ts
│       └── ses-stack.ts
│
└── packages/                           # Shared packages (if monorepo)
    └── shared/
        ├── package.json
        └── src/
            ├── types/
            │   ├── Contact.ts
            │   ├── Campaign.ts
            │   ├── Order.ts
            │   └── Product.ts
            └── utils/
                ├── emailFilter.ts
                └── coachAssignment.ts
```

---

## 17. File Size & Organization Rules

### Maximum File Sizes
- **Components**: 200 lines max (split into sub-components if larger)
- **Hooks**: 100 lines max (extract utilities if larger)
- **API modules**: 150 lines max
- **Utils/Helpers**: 100 lines max

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PricingCard.tsx` |
| Hooks | camelCase + use prefix | `useContacts.ts` |
| Utils | camelCase | `emailFilter.ts` |
| Types | PascalCase + .types | `Contact.types.ts` |
| API | camelCase | `campaigns.ts` |
| Constants | SCREAMING_SNAKE | `MAX_BATCH_SIZE` |

### Feature Module Structure
Each feature MUST follow this pattern:
```
features/[name]/
├── components/     # UI components
├── hooks/          # Data fetching & state
├── api/            # API calls
├── types/          # TypeScript types
├── utils/          # Feature-specific helpers
└── index.ts        # Public exports
```

### Import Order
1. React/Next.js imports
2. External libraries
3. Internal absolute paths (@/)
4. Relative imports
5. Styles
