---
layout: page
title: William Wei-Chi Chen
---

**Software Engineer** · Bellevue, WA  
[chenwilliam101@gmail.com](mailto:chenwilliam101@gmail.com) · (734) 548-1203  
[LinkedIn](https://www.linkedin.com/in/wxllchxn/) · [GitHub](https://github.com/wxllchxn)

[**Download resume (PDF)**](/William%20Chen%20Resume%202026.pdf)

---

## Education

{% for edu in site.data.education %}
**{{ edu.degree }}** — {{ edu.school }}  
*{{ edu.dates }}* · {{ edu.location }} · GPA {{ edu.gpa }}
{% endfor %}

---

## Experience

{% for exp in site.data.experience %}
### {{ exp.title }}  
**{{ exp.company }}** · {{ exp.location }} · *{{ exp.dates }}*

{% for bullet in exp.bullets %}
- {{ bullet }}
{% endfor %}

{% endfor %}

---

## Certifications

{% for cert in site.data.certifications %}
- **{{ cert.name }}** ({{ cert.date }})
{% endfor %}

---

## Skills

{% for skill_group in site.data.skills %}
- **{{ skill_group[1].label }}:** {{ skill_group[1].items | join: ", " }}
{% endfor %}

---

## Languages

English, Chinese, learning Japanese.

---

## Class projects & coursework

Relevant coursework and class projects will be added here. (Coming soon.)
