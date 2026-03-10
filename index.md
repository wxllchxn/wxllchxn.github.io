---
layout: home
title: William Wei-Chi Chen
---

<section id="introduction" class="page-section">
  <div class="intro-content">
    <img src="{{ site.baseurl }}/assets/images/profile.jpg" alt="William Wei-Chi Chen" class="profile-photo" />
    <div class="intro-text">
      <h1>{{ site.author }}</h1>
      <p class="intro-subtitle">Software Engineer · Bellevue, WA</p>
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
    </div>
  </div>
</section>

<section id="work" class="page-section">
  <h2>Work Experience</h2>
  <div class="work-tabs" role="tablist" aria-label="Work experience">
    <div class="tab-buttons">
      {% for exp in site.data.experience %}
      <button type="button" role="tab" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" aria-controls="panel-{{ forloop.index0 }}" id="tab-{{ forloop.index0 }}" data-tab-index="{{ forloop.index0 }}">{{ exp.company }}</button>
      {% endfor %}
    </div>
    {% for exp in site.data.experience %}
    <div role="tabpanel" id="panel-{{ forloop.index0 }}" class="tab-panel" {% unless forloop.first %}hidden{% endunless %}>
      <h3>{{ exp.title }}</h3>
      <p class="work-meta">{{ exp.company }} · {{ exp.location }} · <em>{{ exp.dates }}</em></p>
      <ul>
        {% for bullet in exp.bullets %}
        <li>{{ bullet }}</li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
  </div>
</section>

<section id="education" class="page-section">
  <h2>Education</h2>
  {% for edu in site.data.education %}
  <div class="education-item">
    <p><strong>{{ edu.degree }}</strong> — {{ edu.school }}</p>
    <p class="edu-meta"><em>{{ edu.dates }}</em> · {{ edu.location }} · GPA {{ edu.gpa }}</p>
  </div>
  {% endfor %}
</section>

<section id="certifications" class="page-section">
  <h2>Certifications</h2>
  <ul class="cert-list">
    {% for cert in site.data.certifications %}
    <li><strong>{{ cert.name }}</strong> ({{ cert.date }})</li>
    {% endfor %}
  </ul>
</section>

<section id="contact" class="page-section">
  <h2>Contact</h2>
  <p>{{ site.email }} · {{ site.phone }}</p>
  <a href="mailto:{{ site.email }}" class="contact-mailto">Email me</a>
</section>
