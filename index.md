---
layout: home
title: William Wei-Chi Chen
---

<section id="introduction" class="page-section">
  <div class="section-inner">
    <div class="intro-content">
      <img src="{{ site.baseurl }}/assets/images/profile.jpg" alt="William Wei-Chi Chen" class="profile-photo" />
      <div class="intro-text">
        <h1>{{ site.author }}</h1>
        <p class="intro-subtitle">Software Engineer · Bellevue, WA</p>
        <p class="intro-tagline">Building reliable systems and great product experiences.</p>
        <div class="intro-links">
          <a href="{{ site.resume_url }}">Resume (PDF)</a>
          <a href="{{ site.linkedin_url }}">LinkedIn</a>
          <a href="{{ site.github_url }}">GitHub</a>
        </div>
        <ul class="intro-bullets">
          {% for bullet in site.data.intro.bullets %}
          <li>{{ bullet }}</li>
          {% endfor %}
        </ul>
        {% if site.data.skills %}
        <p class="intro-skills-label">Tech: {{ site.data.skills.general_purpose.items | join: ", " }}, {{ site.data.skills.frontend.items | join: ", " }}, {{ site.data.skills.devops.items | join: ", " }}</p>
        {% endif %}
      </div>
    </div>
    <div class="scroll-hint" aria-hidden="true">Scroll</div>
  </div>
</section>

<section id="work" class="page-section">
  <div class="section-inner">
    <h2>Work Experience</h2>
    <p class="section-tagline">Building products at scale — from mobile to platform.</p>
    <div class="work-tabs" role="tablist" aria-label="Work experience">
      <div class="tab-buttons">
        {% for company in site.data.experience %}
        <button type="button" role="tab" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" aria-controls="panel-{{ forloop.index0 }}" id="tab-{{ forloop.index0 }}" data-tab-index="{{ forloop.index0 }}">
          <span class="work-tab-icon work-tab-icon-{{ company.icon_key }}">{{ company.icon_label }}</span>
          <span class="work-tab-copy">
            <span class="work-tab-company">{{ company.company }}</span>
            <span class="work-tab-dates">{{ company.button_dates }}</span>
          </span>
        </button>
        {% endfor %}
      </div>
      {% for company in site.data.experience %}
      <div role="tabpanel" id="panel-{{ forloop.index0 }}" class="tab-panel" {% unless forloop.first %}hidden{% endunless %}>
        <div class="tab-panel-header">
          <div>
            <h3>{{ company.company }}</h3>
            <p class="work-meta">{{ company.location }} · <em>{{ company.button_dates }}</em></p>
          </div>
          <span class="work-panel-badge work-panel-badge-{{ company.icon_key }}">{{ company.icon_label }}</span>
        </div>
        <div class="work-role-list">
          {% for role in company.roles %}
          <article class="work-role-card">
            <div class="work-role-topline">
              <h4>{{ role.title }}</h4>
              <span class="work-role-dates">{{ role.dates }}</span>
            </div>
            <ul>
              {% for bullet in role.bullets %}
              <li>{{ bullet }}</li>
              {% endfor %}
            </ul>
          </article>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section id="education-certifications" class="page-section">
  <div class="section-inner">
    <div class="split-section-grid">
      <div class="split-section-column">
        <h2>Education</h2>
        <p class="section-tagline">Graduate and undergraduate studies in computer science.</p>
        {% for edu in site.data.education %}
        <div class="education-item">
          <div class="rail-icon rail-icon-{{ edu.icon_key }}">{{ edu.icon_label }}</div>
          <div class="rail-card-body">
            <p><strong>{{ edu.degree }}</strong> — {{ edu.school }}</p>
            <p class="edu-meta"><em>{{ edu.dates }}</em> · {{ edu.location }} · GPA {{ edu.gpa }}</p>
          </div>
        </div>
        {% endfor %}
      </div>
      <div class="split-section-column">
        <h2>Certifications</h2>
        <p class="section-tagline">Continuous learning and industry credentials.</p>
        {% for cert in site.data.certifications %}
        <div class="education-item certification-item">
          <div class="rail-icon rail-icon-{{ cert.icon_key }}">{{ cert.icon_label }}</div>
          <div class="rail-card-body">
            <p><strong>{{ cert.name }}</strong></p>
            <p class="edu-meta">{{ cert.provider }} · <em>{{ cert.date }}</em></p>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
  </div>
</section>

<section id="contact" class="page-section">
  <div class="section-inner">
    <h2>Contact</h2>
    <p class="section-tagline">Let's connect — open to opportunities and conversations.</p>
    <p>{{ site.email }} · {{ site.phone }}</p>
    <a href="mailto:{{ site.email }}" class="contact-mailto">Email me</a>
  </div>
</section>
