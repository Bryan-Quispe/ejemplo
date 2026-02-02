# Sección 5. ESTÁNDARES, PRÁCTICAS, CONVENCIONES Y MÉTRICAS

Para verificar la entrega de un producto completamente conforme y de alta calidad, todo individuo asignado al proyecto CF_V1.0.2 participará en el aseguramiento de la calidad. Esta sección describe los procedimientos utilizados por SQA para verificar que las disposiciones de aseguramiento de calidad de este Plan SQA y los estándares, prácticas, convenciones y métricas aplicables sean cumplidos.

## Estándares Aplicables (Requisitos Obligatorios)

El proyecto CF_V1.0.2 adopta los siguientes estándares para el desarrollo de software:

### Estándares Base

| Estándar | Aplicabilidad | Referencia |
| --- | --- | --- |
| IEEE 830-1998 / ISO/IEC/IEEE 29148 | Especificación de Requisitos de Software (SRS) | Requisitos funcionales y criterios de aceptación |
| IEEE 1016-2009 | Descripción de Diseño de Software (SDD) | Arquitectura del sistema (Frontend React + Backend Spring Boot) |
| IEEE 829-2008 / ISO/IEC/IEEE 29119 | Plan e Informe de Pruebas | Pruebas funcionales, de integración y de sistema |
| IEEE 1063-2001 | Manual de Usuario | Documentación de características y guías de uso |
| IEEE 828-2012 | Plan de Gestión de Configuración | Control de versiones y cambios |
| IEEE 730-2014 | Plan de Aseguramiento de Calidad de Software | Este documento (SQA Plan) |
| REST Guidelines / OpenAPI 3.0 | Especificación de Interfaces API | Endpoints backend documentados |
| ISO/IEC 27001 | Seguridad de la Información (Aplica) | Protección de datos sensibles del cliente y materia prima |

### Estándares de Codificación

El proyecto CF_V1.0.2 adopta convenciones estándar de la industria:

**Backend Java/Spring Boot:**
- Google Java Style Guide (google-java-format)
- Convenciones de nomenclatura: CamelCase para clases, camelCase para métodos y variables
- Máximo 120 caracteres por línea
- Indentación de 4 espacios
- Documentación JavaDoc obligatoria para clases públicas y métodos públicos
- ESLint configurado para verificación estática

**Frontend React/JavaScript:**
- ESLint con configuración Eslint.config.js
- Prettier para formateo automático
- Convenciones: camelCase para variables/funciones, PascalCase para componentes React
- Máximo 120 caracteres por línea
- Comentarios descriptivos en lógica compleja

**Base de Datos PostgreSQL:**
- Nomenclatura: snake_case para tablas y columnas
- Índices nombrados explícitamente
- Documentación de esquema en `querys.sql`
- Restricciones de integridad referencial documentadas

## Monitoreo y Aseguramiento de Cumplimiento

### 5.1 Verificación de Requisitos y Diseño

SQA verifica el cumplimiento con IEEE 830 e IEEE 1016 mediante:

- **Trazabilidad de Requisitos:** Cada requisito funcional tiene un ID único y es rastreado desde el SRS hasta:
  - Especificación de diseño (SDD)
  - Componentes de implementación
  - Casos de prueba
  - Criterios de aceptación

- **Revisión por Pares (Peer Review):** 
  - Cada documento (SRS, SDD) es revisado por mínimo 2 miembros del equipo
  - Criterios de revisión: completitud, consistencia, claridad, conformidad con estándares
  - Registro de hallazgos y seguimiento en checklist interno
  - Aprobación por SQA antes de liberación

- **Auditorías de Diseño:**
  - Arquitectura revisada contra patrones de Spring Boot 3.5.3
  - Diseño de API REST validado contra OpenAPI 3.0
  - Diseño de base de datos validado contra normalización (3NF mínimo)

### 5.2 Verificación de Implementación

SQA verifica el cumplimiento con estándares de código mediante:

**Análisis Estático de Código:**
- Herramientas: ESLint (frontend), PMD/Checkstyle (backend)
- Ejecución: Pre-commit hooks + CI/CD pipeline
- Métricas monitoreadas:
  - Violaciones de estilo de código (Error/Warning)
  - Complejidad ciclomática (máximo permitido: 10)
  - Duplicación de código (máximo: 5%)
  - Cobertura de código (mínimo: 70%)

**Revisión de Código:**
- Pull requests requieren revisión de mínimo 2 desarrolladores
- Criterios: estilo, lógica, seguridad, rendimiento
- Comentarios resueltos antes de merge

**Verificación de Seguridad:**
- OWASP Top 10 controles verificados en revisión
- Validación de entrada en todos los endpoints
- Autenticación y autorización verificadas
- SQL injection prevention verificado
- XSS protection en frontend verificado

### 5.3 Verificación de Pruebas

SQA verifica el cumplimiento con IEEE 829 / ISO/IEC/IEEE 29119 mediante:

**Plan de Pruebas:**
- Cobertura de pruebas: funcional, integración, sistema, aceptación
- Criterios de aprobación definidos antes de ejecución
- Trazabilidad entre requisitos y casos de prueba

**Ejecución de Pruebas:**
- Pruebas unitarias: JUnit 5 (Backend), Jest/Vitest (Frontend)
- Pruebas de integración: Spring Boot TestRestTemplate
- Pruebas funcionales: Postman/REST Client
- Automatización en CI/CD pipeline

**Reportes de Pruebas:**
- Ejecución de pruebas reportada por iteración
- Defectos registrados y trazados hasta cierre
- Cobertura de pruebas documentada (líneas, ramas, métodos)

### 5.4 Verificación de Documentación

SQA verifica cumplimiento con DIDs y estándares de documentación mediante:

- **Formato:** Conformidad con estructura especificada en Tabla 4-1
- **Contenido:** Completitud según DID / estándar aplicable
- **Trazabilidad:** Consistencia con requisitos, diseño, implementación
- **Claridad:** Ausencia de ambigüedad, uso de diagramas cuando aplique
- **Vigencia:** Actualización con cambios aprobados en CM Plan

---

## 5.1 Métricas

### Definición y Recolección de Métricas

Se adoptarán las convenciones descritas en:
- **IEEE 1045-1992:** Software Productivity Metrics
- **IEEE 1061-1992:** Software Quality Metrics Methodology
- **IEEE 982.1-1988 y 982.2-1988:** Measures to Produce Reliable Software

### Métricas de Costo y Cronograma (SQA)

SQA reportará mensualmente las siguientes mediciones para determinar estado de costo y cronograma:

| Métrica | Tipo | Frecuencia | Responsable |
| --- | --- | --- | --- |
| Fechas hitos SQA (planificadas) | Cronograma | Mensual | SQA Lead |
| Fechas hitos SQA (completadas) | Cronograma | Mensual | SQA Lead |
| Trabajo SQA programado (planificado) | Horas-hombre | Mensual | SQA Lead |
| Trabajo SQA completado (real) | Horas-hombre | Mensual | SQA Lead |
| Esfuerzo SQA expuesto (planificado) | Horas | Mensual | SQA Lead |
| Esfuerzo SQA expuesto (real) | Horas | Mensual | SQA Lead |
| Fondos SQA expuesto (planificado) | USD | Mensual | Project Manager |
| Fondos SQA expuesto (real) | USD | Mensual | Project Manager |

### Métricas de Calidad

| Métrica | Meta | Monitoreo |
| --- | --- | --- |
| **Incumplimientos (Noncompliances)** | | |
| Número de ítems abiertos | < 5 por iteración | Semanal |
| Número de ítems cerrados | 100% antes de liberación | Mensual |
| Total de ítems | Histórico | Mensual |
| **Defectos** | | |
| Densidad de defectos | < 0.5 defectos/KLOC | Por liberación |
| Defectos rechazados en pruebas | 100% antes de producción | Mensual |
| Tiempo promedio cierre de defectos | < 5 días laborales | Mensual |
| **Pruebas** | | |
| Cobertura de código (unitarias) | ≥ 70% | Cada commit |
| Tasa de paso de pruebas | ≥ 95% | Diaria |
| Casos de prueba ejecutados | 100% antes de liberación | Mensual |
| **Documentación** | | |
| Documentos entregables completados | 100% a tiempo | Por fase |
| Hallazgos en revisión por pares | < 5 mayores por documento | Por documento |
| Documentación actualizada post-cambio | 100% dentro 2 días | Continuo |
| **Código** | | |
| Violaciones de estilo | 0 críticas, < 10 warnings | Cada commit |
| Complejidad ciclomática promedio | < 8 | Mensual |
| Duplicación de código | < 5% | Mensual |
| Vulnerabilidades de seguridad | 0 críticas/altas | Semanal |

### Métricas de Proceso

| Métrica | Descripción | Meta |
| --- | --- | --- |
| Tasa de cambio | % de requisitos modificados | < 10% por fase |
| Eficacia de revisión | Defectos encontrados en revisión vs. pruebas | > 60% encontrados en revisión |
| Productividad SQA | Horas-hombre inversión vs. defectos prevenidos | ROI positivo |
| Cumplimiento de plan | Actividades completadas según cronograma | ≥ 95% |

### Recolección y Reporte

**Métodos de Recolección:**
- Herramientas automatizadas: SonarQube (análisis estático), JaCoCo (cobertura), Maven reports
- Registros manuales: Hojas de control de actividades, logs de prueba
- Sistema de tickets: Tracking de defectos y noncompliances (issues en repositorio)

**Reporte:**
- **Frecuencia:** Mensualmente a Project Manager y SEPO (Sponsor/Ejecutivo)
- **Formato:** Dashboard ejecutivo + tabla detallada de métricas
- **Público:** Project Manager, SQA Lead, Development Lead, Sponsor
- **Acciones:** SQA propone acciones correctivas si métricas caen fuera de rango

**Archivado:**
- Histórico de métricas mantenido en repositorio (metrics/ folder)
- Análisis de tendencias trimestralmente
- Lecciones aprendidas incorporadas a procesos futuros

---

## Responsabilidades en Aseguramiento de Calidad

Todos los miembros del proyecto CF_V1.0.2 participan en QA:

| Rol | Responsabilidad SQA |
| --- | --- |
| **SQA Lead** | Supervisar plan, auditorías, reporte de métricas |
| **Desarrolladores** | Cumplir estándares de código, participar en peer review |
| **Testers/QA Analysts** | Planificar y ejecutar pruebas, reportar defectos |
| **Arquitecto** | Validar diseño contra estándares, revisar DIDs |
| **Project Manager** | Asegurar recursos, resolver bloqueadores SQA |
| **Sponsor/SEPO** | Revisar métricas, aprobar desviaciones |

---

## Seguimiento y Control

### Auditorías SQA

Se realizarán auditorías internas:

- **Auditorías de Proceso:** Trimestral – verificar adherencia a plan
- **Auditorías de Producto:** Por liberación – verificar conformidad con estándares
- **Auditorías Funcionales:** Mensual – verificar especificación de requisitos

### Acciones Correctivas

Si métricas se desvían de metas o se detectan noncompliances:

1. SQA notifica a Project Manager
2. Equipo investiga causa raíz
3. Plan de acción correctiva definido
4. Seguimiento semanal hasta cierre
5. Lección aprendida documentada

### Escalación

- **Desviaciones Menores:** Project Manager + SQA
- **Desviaciones Mayores:** Project Manager + Sponsor + SQA
- **Riesgo a Liberación:** Escalación inmediata a Sponsor, revisión del alcance

---

## Referencias Aplicables

Este SQA Plan Sección 5 se apoya en:
- (a) Este SQA Plan (todas las secciones)
- (e) Estándares de Desarrollo del Proyecto (reference a Engineering Plan)
- (o)/(b) MIL-STD-498 / IEEE/EIA 12207 (Procesos de Ciclo de Vida)
- (p) IEEE 1045-1992 (Software Productivity Metrics)
- (q) IEEE 1061-1992 (Software Quality Metrics Methodology)
- (r) IEEE 982.1-1988 (Dictionary of Measures)
- (s) IEEE 982.2-1988 (Guide to using IEEE 982.1)
- Sección 4 de este documento (Documentación)
- Sección 3 de este documento (Evaluaciones SQA por Fase)
