---
title: "Hands On: Development"
category: "Miscellaneous"
draft: true
sourcePath: "docs/misc/hands-on-development.md"
---

Dieses Thema beschäftigt sich mit der Realität von Softwareentwicklung.
Wir schauen uns an, wie in der Praxis Software entwickelt wird, welche Technologien/Methoden wirklich verwendet werden, und was man verstanden haben sollte.

## Why do we need it? Where do we use it?

Der gesamte Bereich der IT und Softwareentwicklung ist extrem umfangreich, was beim Einstieg in die Materie oft sehr verwirrend sein kann.
Dieser Abschnitt soll dabei helfen zu verstehen, welche Dinge unmittelbar wichtig sind, und welche man vorerst aufschieben kann.
Wir gehen den typischen Ablauf der Entwicklung eines Softwareprojektes durch und schauen uns Schritt für Schritt an, was passiert.
Dieser Abschnitt ist der Schwesternabschnitt zu "Hands On: Cloud Native Infrastructure", welcher sich mit der Verwaltung von (cloud nativer) Infrastruktur befasst.
Für eine vollständige Lösung müssen beide Abschnitte betrachtet werden - dieser kümmert sich um die Applikationsseite.

## Interaction with other topics?

tbd

## How does it work?

Die Entwicklung neuer Software, beginnt üblicherweise mit einem Problem das gelöst werden soll.
In dieser Phase ist man noch sehr stark im Ideen- / Innovationsmanagement angesiedelt.
Es geht darum eine konkrete Vorstellung zu bekommen, was der Markt/die Kunden eigentlich wollen, und wie man das erreichen kann.
Unser Einstiegspunkt ist an einer Stelle gewählt, in der wir zumindest schon wissen was die Software können soll, und für wen wir entwickeln.
Dies bringt uns zur ersten Etappe, `Architektur und Design`:

### Architektur und Design

Unser Ziel hier ist es, folgende Aufgaben zu lösen:

- Wir müssen die organisatorischen Fragen klären..
  - Wer entwickelt die Software?
  - Wer ist für Betrieb, Überwachung und Support verantwortlich?
  - Wie sehen die Prozesse rund um unsere Software aus?
  - Welchen Anforderungen muss unsere Software genügen?
- Aus welchen Bestandteilen soll unsere Software bestehen?
  - Datenbank, Cache, API, Frontend, Backend, ...
- Wo soll die Software betrieben werden?
  - Cloud, On-Premises; VM, Container; Linux, Windows
- Wie soll die Architektur auf den verschiedenen Ebenen aussehen?
  - Context, Container, Component, Code

Aber der Reihe nach, gehen wir diese Punkte systematisch durch!

#### Organisatorisches

Die organisatorischen Fragen sind meistens nicht Aufgabe der Entwickler, sondern des Managements und der Enterprise Architekten.
Das heißt konkret, wir gehen davon aus, dass für uns entschieden wurde: wir entwickeln, betreiben und supporten die Software - toll!
Die Prozesse (Change-, Release-, Incident-, Problemmanagement..) nehmen wir an dieser Stelle als gegeben an.
Diese richten sich üblicherweise nach Standards (zB ITIL), sind aber in jeder Organisation individuell implementiert.
Aber _WICHTIG_, es gibt Prozesse an die wir uns halten müssen!
Die Anforderungen müssen uns zumindest einmalig schriftlich übermittelt werden, damit wir diese initial aufplanen können.
An dieser Stelle kommen Rollen wie Produktmanager/Product Owner, sowie Frameworks wie [SCRUM](/kb/agile/scrum) ins Spiel.
Hier sehen wir auch zum ersten Mal, wie sehr viele unserer folgenden Themen zum ersten Mal auftreten und zusammenspielen - nämlich über die Anforderungen!

_Anforderungen_ können funktional, oder nicht-funktional sein:

- funktionale Anforderungen: konkrete Funktionen die eine Software erfüllen muss.
  - "GUI muss Deutsch/Englisch unterstützen", "API muss pagination unterstützen", "SSO login", "User Profil muss Alter anzeigen"..
- nicht-funktionale Anforderungen: Qualitätsmerkmale die erfüllt werden müssen
  - "Responsezeiten 99% <5ms", "Code Coverage >50%", "PCI DSS compliance",..

Mehr Details zum Thema Anforderungen gibt's im gleichnamigen Abschnitt: [Requirements Engineering](/kb/misc/requirements-engineering).

Sobald wir die Anforderungen erhalten und verstanden haben, geben wir diese in unser Product Backlog.
Je nach Unternehmen können dies zB Jira Tasks, GitHub Issues, Trello Cards, etc.. sein.
Wichtig: Alle Product Backlog Items müssen für das gesamte Team sichtbar sein!

An dieser Stelle gehen wir für dieses Beispiel davon aus, dass wir unsere gesamte Entwicklung in GitHub abwickeln.
Das heißt, jede Anforderung wird ein GitHub Issue.

#### Bestandteile

Um zu bestimmen aus welchen Bestandteilen eine Applikation letztendlich besteht, gibt es mehrere Möglichkeiten und Dinge zu berücksichtigen.
Als sehr guter Einstiegspunkt in die gesamte Thematik, hat sich jedoch das Thema "Domain Driven Design" herausgestellt.
Diese Methode hilft uns dabei..

- mehr Verständnis für die fachlichen Abläufe der Software zu erhalten
- das korrekte Wording, angepasst an die fachliche Domäne zu finden
- Teilsysteme, Komponenten und Teilnehmer herauszuarbeiten
- konkrete Applikationsbestandteile abzuleiten

Domain Driven Design - [hier genauer erklärt](/kb/misc/ddd) - hilft uns am Ende dabei, fachliche Teilsysteme zu definieren, welche wir meistens auch als eigene Software-Teilsysteme (zb Microservices) bauen können.

[//]: # "TODO: hier weitermachen"

## Examples: Usage or Theory

tbd

## References and further reading

tbd
