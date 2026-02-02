# SECCIÓN 6: PRUEBAS

**Documento:** Sección 6 del Plan de Aseguramiento de Calidad  
**Proyecto:** Sistema de Gestión PintAuto - CF_V1.0.2  
**Versión:** 1.0  
**Fecha:** Febrero 2026

---

## Tabla de Contenidos

1. [Diagrama de Flujo de Pruebas](#diagrama)
2. [Técnicas de Diseño de Pruebas](#tecnicas)
3. [Desarrollo de Datos de Prueba](#datos)
4. [Monitoreo de Recursos](#monitoreo)
5. [Gestión de Defectos](#defectos)
6. [Auditoría SQA](#auditoria)

---

## 1. Diagrama de Flujo de Pruebas {#diagrama}

```
┌──────────────────────────────────────────────────────────────────┐
│                    PROCESO DE PRUEBAS INTEGRAL                   │
└──────────────────────────────────────────────────────────────────┘

        ┌─────────────────────────────────────────┐
        │    1. PRUEBAS UNITARIAS                 │
        │    ├─ Framework: JUnit 5 / Jest / Vitest
        │    ├─ Cobertura: ≥70%                   │
        │    ├─ Pass Rate: ≥95%                   │
        │    └─ Enfoque: Funciones individuales   │
        └────────────────┬────────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────────┐
        │    2. PRUEBAS DE INTEGRACIÓN            │
        │    ├─ Herramienta: TestRestTemplate     │
        │    ├─ BD: H2 in-memory                  │
        │    ├─ Cobertura: 100% flujos críticos   │
        │    └─ Enfoque: Interacción entre módulos│
        └────────────────┬────────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────────┐
        │    3. PRUEBAS DE RENDIMIENTO            │
        │    ├─ Herramienta: JMeter / Lighthouse │
        │    ├─ Objetivo: <2s P95 respuesta       │
        │    ├─ Objetivo: ≥80 performance score   │
        │    └─ Enfoque: Carga y escalabilidad    │
        └────────────────┬────────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────────┐
        │    4. PRUEBAS DE SEGURIDAD              │
        │    ├─ Estándar: OWASP Top 10            │
        │    ├─ Herramienta: OWASP ZAP            │
        │    ├─ Objetivo: 0 críticas/altas        │
        │    └─ Enfoque: Vulnerabilidades comunes │
        └────────────────┬────────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────────┐
        │    5. PRUEBAS FUNCIONALES/ACEPTACIÓN    │
        │    ├─ Estándar: IEEE 829                │
        │    ├─ Cobertura: 100% requisitos        │
        │    ├─ Pass Rate: ≥95%                   │
        │    └─ Enfoque: Comportamiento esperado  │
        └────────────────┬────────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────────────┐
        │    6. PRUEBAS DE REGRESIÓN              │
        │    ├─ Timing: Post-P/CR                 │
        │    ├─ Duración: <15 minutos             │
        │    ├─ Resultado: 100% verde             │
        │    └─ Enfoque: Cambios no generan bugs  │
        └────────────────┬────────────────────────┘
                         │
                         ▼
        ┌──────────────────────────────────────────┐
        │       ✓ APROBADO PARA PRODUCCIÓN         │
        └──────────────────────────────────────────┘
```

### 1.1 Flujo de Pruebas por Fase

#### Fase 1: Pruebas Unitarias
- **Objetivo:** Validar correctitud de unidades individuales
- **Responsable:** Desarrollador
- **Criterio de Entrada:**
  - Código fuente compilable
  - Casos de prueba diseñados
- **Criterio de Salida:**
  - Cobertura ≥70%
  - Todos los tests ≥95% pass
  - 0 defectos críticos
- **Herramientas:**
  - Backend: JUnit 5, Mockito
  - Frontend: Jest, Vitest

#### Fase 2: Pruebas de Integración
- **Objetivo:** Validar interacción entre módulos
- **Responsable:** QA Engineer
- **Criterio de Entrada:**
  - Pruebas unitarias pasadas
  - Interfaces definidas
- **Criterio de Salida:**
  - 100% flujos críticos probados
  - BD test funcionando
  - 0 errores de integración
- **Herramientas:**
  - TestRestTemplate, H2 Database, Postman

#### Fase 3: Pruebas de Rendimiento
- **Objetivo:** Validar límites y escalabilidad
- **Responsable:** Performance QA
- **Criterio de Entrada:**
  - Sistema integrado funcionando
  - Métricas de referencia establecidas
- **Criterio de Salida:**
  - Respuesta <2s P95
  - Heaps <70% utilizado
  - 0 memory leaks
- **Herramientas:**
  - JMeter, Lighthouse, JProfiler

#### Fase 4: Pruebas de Seguridad
- **Objetivo:** Identificar vulnerabilidades
- **Responsable:** Security QA
- **Criterio de Entrada:**
  - Código revisado
  - OWASP checklist completada
- **Criterio de Salida:**
  - 0 vulnerabilidades críticas/altas
  - 100% OWASP Top 10 validadas
  - Reporte de seguridad completado
- **Herramientas:**
  - OWASP ZAP, SonarQube, Dependency Check

#### Fase 5: Pruebas Funcionales
- **Objetivo:** Validar requisitos del usuario
- **Responsable:** QA Tester
- **Criterio de Entrada:**
  - Requisitos documentados
  - Casos de prueba escritos
- **Criterio de Salida:**
  - 100% requisitos con test case
  - ≥95% pass rate
  - 0 defectos no resueltos
- **Herramientas:**
  - Manual testing, Selenium, Cypress

#### Fase 6: Pruebas de Regresión
- **Objetivo:** Garantizar cambios no rompan funcionalidad existente
- **Responsable:** QA Team
- **Criterio de Entrada:**
  - P/CR (Problem/Change Report) aprobado
  - Fix implementado
- **Criterio de Salida:**
  - Suite completa ejecutada <15 min
  - 100% tests en verde
  - Variación de métricas <5%
- **Herramientas:**
  - Automated test suite, CI/CD pipeline

---

## 2. Técnicas de Diseño de Pruebas {#tecnicas}

### 2.1 Particionamiento por Equivalencia
```
Entrada: Cantidad de materia prima (0-1000 kg)

Clases válidas:
- [1, 50]: Cantidad pequeña
- [51, 500]: Cantidad media
- [501, 1000]: Cantidad grande

Clases inválidas:
- (-∞, 0]: Cantidad negativa
- [1001, +∞): Cantidad superior al límite
```

### 2.2 Análisis de Valores Límite
```
Prueba: Validación de rango de fechas

Valores límite:
- Fecha mínima: 01/01/2020
- Fecha máxima: 31/12/2026
- Just before: 31/12/2019 (inválido)
- Just after: 01/01/2027 (inválido)
- Dentro: 15/06/2023 (válido)
```

### 2.3 Tablas de Decisión
```
Condiciones:
A: Cliente activo (T/F)
B: Orden válida (T/F)
C: Stock disponible (T/F)

| A | B | C | Acción           |
|---|---|---|------------------|
| T | T | T | Procesar orden   |
| T | T | F | Esperar stock    |
| T | F | T | Rechazar orden   |
| T | F | F | Rechazar orden   |
| F | T | T | Activar cliente  |
| F | F | - | Rechazar         |
```

### 2.4 Prueba de Transiciones de Estado
```
Estados: [NUEVO] → [EN_PROGRESO] → [COMPLETADO] → [CERRADO]

Transiciones válidas:
- NUEVO → EN_PROGRESO (Asignar recurso)
- EN_PROGRESO → COMPLETADO (Completar trabajo)
- COMPLETADO → CERRADO (Archivar)

Transiciones inválidas:
- NUEVO → CERRADO (debe pasar por estados intermedios)
- COMPLETADO → EN_PROGRESO (no regresión)
```

### 2.5 Prueba de Casos de Uso
```
Caso: Registrar Orden de Trabajo

Flujo Principal:
1. Usuario selecciona "Nueva Orden"
2. Ingresa datos: cliente, descripción, fecha
3. Sistema valida completitud
4. Sistema asigna ID
5. Confirma creación

Flujos Alternativos:
- 3a: Datos incompletos → Mensaje de error
- 4a: ID duplicado → Reintentar asignación
```

---

## 3. Desarrollo de Datos de Prueba {#datos}

### 3.1 Pruebas Unitarias
```java
// Datos de prueba unitarias
@DataProvider
public Object[][] testDataClienteCreation() {
    return new Object[][] {
        {
            new ClienteDTO("Juan Pérez", "juan@email.com", "0987654321"),
            "Cliente válido creado exitosamente"
        },
        {
            new ClienteDTO("", "invalid@email.com", "0987654321"),
            "Nombre requerido - ValidationException"
        },
        {
            new ClienteDTO("María López", "invalid-email", "0987654321"),
            "Email inválido - ValidationException"
        }
    };
}
```

### 3.2 Pruebas de Integración
```sql
-- Datos iniciales para BD de prueba
INSERT INTO cliente (id, nombre, email, telefono, estado) VALUES
(1, 'Cliente Prueba 1', 'cliente1@test.com', '0987654321', 'ACTIVO'),
(2, 'Cliente Prueba 2', 'cliente2@test.com', '0987654322', 'ACTIVO'),
(3, 'Cliente Inactivo', 'cliente3@test.com', '0987654323', 'INACTIVO');

INSERT INTO materia_prima (id, nombre, cantidad, unidad, precio_unitario) VALUES
(1, 'Pintura Roja', 100, 'litros', 25.50),
(2, 'Pintura Azul', 50, 'litros', 25.50),
(3, 'Disolvente', 200, 'litros', 10.00);
```

### 3.3 Pruebas de Rendimiento
```javascript
// Generación de datos masivos
const generateLoadTestData = (numberOfRecords) => {
  const clients = [];
  for (let i = 0; i < numberOfRecords; i++) {
    clients.push({
      id: i + 1,
      nombre: `Cliente ${i}`,
      email: `client${i}@test.com`,
      telefono: `09876543${String(i).padStart(2, '0')}`
    });
  }
  return clients;
};

// Uso: generateLoadTestData(10000) para 10k registros
```

### 3.4 Pruebas de Seguridad
```yaml
# OWASP ZAP Test Data Payload
xss_payloads:
  - "<script>alert('XSS')</script>"
  - "<img src=x onerror=alert('XSS')>"
  - "javascript:alert('XSS')"

sql_injection:
  - "' OR '1'='1"
  - "'; DROP TABLE cliente; --"
  - "admin' --"

csrf:
  - Missing CSRF token
  - Invalid CSRF token signature
```

---

## 4. Monitoreo de Recursos {#monitoreo}

### 4.1 Métricas CPU

| Métrica | Umbral Alerta | Umbral Crítico | Acción |
|---------|---------------|-----------------|---------|
| Uso CPU Promedio | 70% | 85% | Escalar recursos |
| CPU Pico | 80% | 95% | Reducir carga |
| Contexto Switch | 1000/s | 5000/s | Revisar locks |

### 4.2 Métricas Memoria

| Métrica | Umbral Alerta | Umbral Crítico | Acción |
|---------|---------------|-----------------|---------|
| Heap Usado | 60% | 80% | Aumentar heap |
| Non-Heap | 50% | 70% | Revisar metadata |
| GC Tiempo | >100ms | >500ms | Optimizar |
| Memory Leak | >5MB/h | >20MB/h | Investigar |

### 4.3 Métricas Base de Datos

| Métrica | Target | Alerta | Crítico |
|---------|--------|--------|---------|
| Conexiones Pool | 20 | 35 | 40 |
| Query Latencia | <50ms | <200ms | >500ms |
| Transacciones/s | >100 | <50 | <10 |
| Índice Hit Ratio | >95% | >90% | <80% |

### 4.4 Métricas Frontend

| Métrica | Target | Alerta | Crítico |
|---------|--------|--------|---------|
| Tiempo Carga | <2s | <3s | >5s |
| First Contentful Paint | <1s | <1.5s | >2.5s |
| Largest Paint | <2.5s | <3s | >4s |
| Cumulative Layout Shift | <0.1 | <0.25 | >0.5 |

### 4.5 Dashboard de Monitoreo

```
┌─────────────────────────────────────────────────────────┐
│           DASHBOARD DE MONITOREO REAL-TIME               │
├─────────────────────────────────────────────────────────┤
│                                                           │
│ CPU: [████████░░░░░░░░░░░░░░░░░░] 35% ✓               │
│ MEM: [██████░░░░░░░░░░░░░░░░░░░░░░] 42% ✓             │
│ GC:  [░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 15ms ✓            │
│                                                           │
│ DB Conn: 12/40 ✓  Query Latency: 45ms ✓              │
│ API P95: 1.8s ✓    Error Rate: 0.02% ✓                │
│                                                           │
│ Última actualización: 2026-02-02 14:32:15 UTC           │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Gestión de Defectos {#defectos}

### 5.1 Ciclo de Vida P/CR (Problem/Change Report)

```
┌─────────┐     ┌──────────────┐     ┌──────────────┐
│   NEW   │────→│  IN_PROGRESS │────→│  RESOLVED    │
└─────────┘     └──────────────┘     └──────────────┘
                        │                      │
                        │                      ▼
                        │              ┌──────────────┐
                        │              │   VERIFIED   │
                        │              └──────────────┘
                        │                      │
                        └──────────────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │    CLOSED    │
                        └──────────────┘
```

### 5.2 Atributos P/CR

```
ID: BUG-2026-0042
Título: Login no valida contraseña vacía
Severidad: ALTO
Prioridad: CRÍTICA
Estado: NEW
Reportado por: QA Team (2026-02-01)
Asignado a: Backend Team

Descripción:
Al ingresar usuario válido y contraseña vacía,
el sistema no rechaza la solicitud.

Pasos de Reproducción:
1. Navegar a login
2. Ingresar "admin" en usuario
3. Dejar contraseña en blanco
4. Click en "Ingresar"

Resultado Esperado:
Mensaje: "Contraseña requerida"

Resultado Actual:
Login permite acceso sin validar contraseña

Criterios de Aceptación:
- Validación en frontend y backend
- Mensaje de error claro
- ≥95% tests pasando
```

### 5.3 Matriz de Severidad/Prioridad

| Severidad | Definición | P1 | P2 | P3 |
|-----------|-----------|----|----|-----|
| CRÍTICA | Bloquea funcionalidad principal | 4h | 8h | 16h |
| ALTA | Afecta feature importante | 8h | 16h | 32h |
| MEDIA | Afecta flujo secundario | 16h | 32h | 64h |
| BAJA | Cosmética/UX minor | 32h | 64h | ∞ |

---

## 6. Auditoría SQA {#auditoria}

### 6.1 Checklist de Plan de Pruebas

- [ ] Plan de pruebas documentado
- [ ] Casos de prueba escritos y revisados
- [ ] Datos de prueba preparados
- [ ] Entorno de prueba configurado
- [ ] Herramientas de prueba instaladas
- [ ] Cronograma de pruebas aprobado
- [ ] Recursos asignados y capacitados

### 6.2 Checklist de Ejecución

- [ ] Pruebas unitarias ejecutadas (cobertura ≥70%)
- [ ] Pruebas integración completadas (BD OK)
- [ ] Pruebas rendimiento dentro de SLA
- [ ] Pruebas seguridad sin críticas
- [ ] Pruebas funcionales ≥95% pass
- [ ] Pruebas regresión sin nuevos defectos
- [ ] Métricas documentadas

### 6.3 Checklist de Defectos

- [ ] Todos P/CR registrados en tracker
- [ ] Severidad/Prioridad asignada correctamente
- [ ] Defectos críticos solucionados
- [ ] Defectos verificados post-fix
- [ ] Tendencia de defectos analizada
- [ ] Reporte de defectos completado

### 6.4 Checklist de Entregables

- [ ] Documento Plan de Pruebas
- [ ] Casos de Prueba (documentación)
- [ ] Resultados de Ejecución
- [ ] Reporte de Cobertura
- [ ] Reporte de Defectos
- [ ] Métricas de Calidad
- [ ] Certificado de Liberación

---

## Referencias

- IEEE 829-2008: Software and Systems Engineering – Test Documentation
- IEEE 1008-1987: Software Unit Testing
- IEEE 1044-2009: Classification for Software Anomalies
- ISTQB Certified Tester Foundation Level
- OWASP Testing Guide v4.2
- [JUnit 5 Documentation](https://junit.org/junit5/)
- [Jest Documentation](https://jestjs.io/)
- [OWASP ZAP](https://www.zaproxy.org/)

---

**Aprobación:**

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| QA Lead | Bryan Quispe | 02-Feb-2026 | ✓ |
| Tech Lead | Sistema PintAuto | 02-Feb-2026 | ✓ |

---

*Este documento es parte del Plan de Aseguramiento de Calidad (SQA Plan) del proyecto CF_V1.0.2*
