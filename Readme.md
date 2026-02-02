# Sección 6. PRUEBAS

Esta sección describe todas las actividades de prueba del proyecto CF_V1.0.2, incluyendo pruebas unitarias, de integración, de rendimiento, de aceptación, y técnicas especializadas para detectar errores y monitorear recursos del sistema.

## Visión General de Pruebas

Las actividades de prueba del proyecto CF_V1.0.2 incluyen:

1. **Pruebas Unitarias (Unit Testing)** – Nivel de componente individual
2. **Pruebas de Integración (Integration Testing)** – Integración entre módulos y servicios
3. **Pruebas de Rendimiento/Carga (Performance Testing)** – Calificación de CI (Configuration Item)
4. **Pruebas de Aceptación/Sistema (System Acceptance Testing)** – Calificación de sistema completo
5. **Pruebas de Regresión (Regression Testing)** – Post-cambios y correcciones
6. **Pruebas de Seguridad (Security Testing)** – Validación de controles OWASP Top 10
7. **Pruebas de Usabilidad (Usability Testing)** – Validación frontend con usuarios

La Figura 6-1 proporciona el Flujo del Proceso de Pruebas.

## Tabla 6-1. Diagrama de Flujo del Proceso de Pruebas

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    INICIO: Planificación de Pruebas                      │
│              (Basado en Requisitos - IEEE 829-2008)                      │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│           FASE 1: PRUEBAS UNITARIAS (Unit Testing)                      │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Backend (Java/Spring Boot)              Frontend (React/JS)        │ │
│  │ • JUnit 5 + Mockito                     • Jest/Vitest              │ │
│  │ • Cobertura: ≥ 70% líneas               • Cobertura: ≥ 70% líneas  │ │
│  │ • Pruebas de métodos                    • Pruebas de componentes    │ │
│  │ • Mocks de dependencias                 • Mocks de API calls        │ │
│  │ • Validación de lógica de negocio       • Pruebas de hooks/state   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  Artefactos: reporte JaCoCo, cobertura Jest                             │
│  Criterio Paso: ≥ 95% pruebas verdes, cobertura ≥ 70%                  │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│           FASE 2: PRUEBAS DE INTEGRACIÓN (Integration Testing)          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Backend Integration Tests                Database Integration       │
│  │ • TestRestTemplate + Spring Boot Test   • Pruebas de esquema DB   │
│  │ • Pruebas API REST endpoints            • Transacciones ACID       │
│  │ • Mocks de BD en memoria (H2)           • Validación de constraints │
│  │ • Validación de flujos completos        • Test data setup/teardown │
│  │ • Autenticación + Autorización          • Migration scripts         │
│  │                                                                      │
│  │ Frontend-Backend Integration                                        │
│  │ • Pruebas de consumo de API             • Validación de respuestas  │
│  │ • Error handling (400, 401, 404, 500)   • Manejo de timeouts       │
│  │ • Testing de auth tokens                • CORS validation          │
│  │ • Estado sincronizado frontend-backend  • Rate limiting tests       │
│  └────────────────────────────────────────────────────────────────────┘ │
│  Artefactos: reporte de pruebas integración, logs de BD                 │
│  Criterio Paso: 100% flujos críticos probados, ≥ 90% casos positivos   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│       FASE 3: PRUEBAS DE RENDIMIENTO/CARGA (Performance Testing)        │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Backend Performance (Load Testing)                                 │ │
│  │ • Apache JMeter / Gatling                                          │ │
│  │ • Escenario nominal: 50 usuarios simultáneos                       │ │
│  │ • Escenario pico: 100 usuarios simultáneos                         │ │
│  │ • Tiempo respuesta objetivo: < 2 segundos (p95)                    │ │
│  │ • Monitoreo: CPU, memoria, conexiones BD                           │ │
│  │ • Identificación de cuellos de botella                             │ │
│  │                                                                     │ │
│  │ Frontend Performance (Lighthouse / WebPageTest)                    │ │
│  │ • Métricas: LCP, FID, CLS (Core Web Vitals)                        │ │
│  │ • Target: Performance Score ≥ 80                                   │ │
│  │ • Bundle size: < 500 KB gzipped                                    │ │
│  │ • Tiempo carga inicial: < 3 segundos                               │ │
│  │                                                                     │ │
│  │ Database Performance                                               │ │
│  │ • Índices validados en queries lentas                              │ │
│  │ • Query time objetivo: < 500ms para consultas complejas             │ │
│  │ • Conexión pool optimization                                       │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  Artefactos: reportes JMeter, Lighthouse reports, análisis CPU/memoria  │
│  Criterio Paso: Tiempo respuesta dentro especificación, sin memory leaks │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│        FASE 4: PRUEBAS DE SEGURIDAD (Security Testing)                  │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ OWASP Top 10 Validations                                           │ │
│  │ • SQL Injection: Pruebas con payloads maliciosos                   │ │
│  │ • XSS (Cross-Site Scripting): Inyección de scripts en campos       │ │
│  │ • CSRF (Cross-Site Request Forgery): Validación de tokens          │ │
│  │ • Autenticación/Autorización: Bypass attempts, token expiration    │ │
│  │ • Exposición de datos sensibles: Validar no se exponen claves      │ │
│  │ • Broken Access Control: Acceso a recursos no autorizados          │ │
│  │ • XML External Entities (XXE): Si aplica                           │ │
│  │ • Insecure Deserialization: Validación de entrada                  │ │
│  │ • Using Components with Known Vulnerabilities: Scan con OWASP ZAP  │ │
│  │ • Insufficient Logging & Monitoring: Auditoría de logs             │ │
│  │                                                                     │ │
│  │ Herramientas:                                                       │ │
│  │ • OWASP ZAP (Automated scanning)                                    │ │
│  │ • Burp Suite Community (Manual testing)                             │ │
│  │ • Dependency Check (Vulnerabilidades en librerías)                  │ │
│  │ • SonarQube (Code quality + security hotspots)                      │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  Artefactos: reporte OWASP ZAP, lista de hallazgos, plan remediación    │
│  Criterio Paso: 0 vulnerabilidades CRÍTICAS/ALTAS, hallazgos LOW cerrados│
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│       FASE 5: PRUEBAS FUNCIONALES/ACEPTACIÓN (System Acceptance)        │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Requisitos a Probar: Cada requisito del SRS (IEEE 830)             │ │
│  │                                                                     │ │
│  │ Escenarios de Prueba (Test Cases per Requirement)                  │ │
│  │ • Caso positivo: Flujo happy path                                  │ │
│  │ • Casos negativo: Validaciones, errores esperados                  │ │
│  │ • Casos límite: Valores edge, límites de negocio                   │ │
│  │ • Casos alternos: Flujos secundarios                               │ │
│  │                                                                     │ │
│  │ Técnicas de Prueba:                                                │ │
│  │ • Equivalence Partitioning: Agrupar entradas similares              │ │
│  │ • Boundary Value Analysis: Pruebas en límites                      │ │
│  │ • Decision Table Testing: Para lógica condicional compleja          │ │
│  │ • State Transition Testing: Cambios de estado                      │ │
│  │ • Use Case Testing: Basadas en casos de uso del SRS                 │ │
│  │                                                                     │ │
│  │ Módulos CF_V1.0.2 a Probar:                                        │ │
│  │ • Gestión de Clientes (CRUD, búsqueda, validaciones)               │ │
│  │ • Gestión de Materia Prima (inventario, alertas stock)             │ │
│  │ • Órdenes de Trabajo (creación, asignación, cierre)                │ │
│  │ • Reportes en PDF (generación, validación de datos)                │ │
│  │ • Autenticación (login, logout, recuperación contraseña)           │ │
│  │ • Dashboard (cálculos, actualizaciones en tiempo real)              │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  Artefactos: matriz de trazabilidad requisitos-pruebas, reporte de      │
│              resultados, bugs/defects identificados                      │
│  Criterio Paso: 100% requisitos probados, ≥ 95% pruebas verdes          │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│         FASE 6: PRUEBAS DE REGRESIÓN (Regression Testing)               │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Trigger: Post-corrección de defectos (P/CR, STR)                   │ │
│  │          Post-cambios de requisitos aprobados                       │ │
│  │          Post-merge de ramas de desarrollo                         │ │
│  │                                                                     │ │
│  │ Método:                                                             │ │
│  │ • Ejecución de suite de regresión automatizada                     │ │
│  │ • Re-prueba de área modificada + áreas relacionadas                │ │
│  │ • Validación de que corrección no introduce nuevo defecto          │ │
│  │                                                                     │ │
│  │ Suite de Regresión: Conjunto de casos prueba críticos              │ │
│  │ • ~ 40-50 casos de prueba (cobertura de funcionalidad principal)   │ │
│  │ • Ejecución: < 15 minutos                                          │ │
│  │ • Automatización: Selenium (frontend), API tests (backend)          │ │
│  │                                                                     │ │
│  │ Rastreabilidad:                                                     │ │
│  │ • P/CR/STR → Defecto → Prueba de regresión → Evidencia de cierre   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│  Artefactos: reporte regresión, logs de ejecución                        │
│  Criterio Paso: 100% pruebas de regresión verdes sin nuevos defectos    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              AUDITORÍA SQA: Validación de Pruebas                        │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ SQA Audit Checklist:                                               │ │
│  │ ✓ Plan de pruebas conforme IEEE 829-2008                          │ │
│  │ ✓ Casos de prueba trazables a requisitos (SRS)                    │ │
│  │ ✓ Datos de prueba adecuados y representativos                      │ │
│  │ ✓ Documentación de pruebas bajo CM (Configuration Management)      │ │
│  │ ✓ Resultados de pruebas registrados completamente                  │ │
│  │ ✓ Evaluación de resultados (paso/fallo) documentada                │ │
│  │ ✓ Seguimiento de defectos (P/CR/STR) hasta cierre                  │ │
│  │ ✓ Pruebas de regresión ejecutadas post-corrección                  │ │
│  │ ✓ Recursos del sistema monitoreados (CPU, memoria, I/O)            │ │
│  │ ✓ Entorno de pruebas controlado y reproducible                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│        GESTIÓN DE DEFECTOS: Problem/Change Reports (P/CR)               │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Cada defecto descubierto se registra en P/CR:                      │ │
│  │                                                                     │ │
│  │ P/CR Contenido Mínimo:                                              │ │
│  │ • ID único (ej: DEF-001, defect-2026-0001)                         │ │
│  │ • Descripción clara del defecto (pasos reproducir)                 │ │
│  │ • Severidad: CRÍTICA, ALTA, MEDIA, BAJA                           │ │
│  │ • Módulo/componente afectado                                       │ │
│  │ • Ambiente reproducción (dev, test, staging)                       │ │
│  │ • Evidencia (screenshot, log, stack trace)                         │ │
│  │ • Asignado a desarrollador                                         │ │
│  │ • Estado: NEW → IN_PROGRESS → RESOLVED → CLOSED → RE-OPENED        │ │
│  │ • Fecha apertura, target cierre, fecha real cierre                 │ │
│  │                                                                     │ │
│  │ Criterio Entrada (Definition of Ready):                            │ │
│  │ • Defecto reproducible en ambiente controlado                      │ │
│  │ • No es duplicado de defecto existente                             │ │
│  │ • Información suficiente para reproducción                         │ │
│  │                                                                     │ │
│  │ Criterio Salida (Definition of Done):                              │ │
│  │ • Código corregido revisado y aprobado (peer review)               │ │
│  │ • Pruebas unitarias cubren la corrección (≥ 70% cobertura)         │ │
│  │ • Suite de regresión 100% verde                                    │ │
│  │ • Cambio en CM (commit con referencia a P/CR)                      │ │
│  │ • Documentación actualizada si aplica                              │ │
│  │ • Testing en ambiente de prueba confirmado                         │ │
│  │                                                                     │ │
│  │ Almacenamiento: Repositorio de issues (GitHub Issues / Jira)       │ │
│  │ Coordinación: SQA verifica cierre, SCM mantiene logs               │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│       DECISIÓN: ¿Criterios de Aceptación Cumplidos?                    │
├─────────────────────────────────────────────────────────────────────────┤
│  Criterios de Aceptación para Liberación (Release Gate):                 │
│  ✓ Cobertura código ≥ 70% (backend + frontend)                          │
│  ✓ 100% requisitos mapeados y probados (trazabilidad)                   │
│  ✓ 0 defectos CRÍTICOS/ALTOS abiertos                                   │
│  ✓ 95%+ pruebas unitarias verdes                                        │
│  ✓ 95%+ pruebas de integración verdes                                   │
│  ✓ 95%+ pruebas funcionales verdes                                      │
│  ✓ Performance dentro especificación (tiempo respuesta, memoria)        │
│  ✓ 0 vulnerabilidades CRÍTICAS/ALTAS (seguridad)                        │
│  ✓ Documentación de pruebas completa y bajo CM                          │
│  ✓ Auditoría SQA aprobada                                               │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐                          ┌──────────────────┐      │
│  │   SÍ: APROBADO  │──────► PRODUCCIÓN        │ NO: RECHAZADO    │      │
│  │   Liberar a Prod│                          │ Volver a Diseño/ │      │
│  │                 │                          │ Desarrollo       │      │
│  └─────────────────┘                          └─────────────────┬┘      │
│                                                                  │       │
│                                                    ┌─────────────▼──┐    │
│                                                    │  Correcciones  │    │
│                                                    │  Retesting     │    │
│                                                    └─────────────┬──┘    │
│                                                                  │       │
│                                                    ┌─────────────▼──┐    │
│                                                    │ Regresión      │    │
│                                                    │ Nuevas Pruebas │    │
│                                                    └────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         FIN: Reporte Final                              │
│     • Evidencia de todas pruebas completadas                            │
│     • Logs de ejecución archivados                                      │
│     • Defectos cerrados o aceptados por stakeholders                    │
│     • Aprobación formal de Project Manager + Sponsor                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6.1 Pruebas No Incluidas en V&V Formal

Las siguientes actividades de prueba **no son parte de Verificación y Validación formal** pero se ejecutan para asegurar calidad:

| Tipo de Prueba | Descripción | Responsable | Artefactos |
| --- | --- | --- | --- |
| **Smoke Testing** | Verificación rápida post-build que funcionalidad crítica trabaja | QA Lead | Checklist ejecución |
| **Exploratory Testing** | Pruebas ad-hoc para descubrir defectos no previstos | QA Engineers | Notas de sesión, issues encontrados |
| **Usability Testing** | Validación con usuarios reales de interfaz y flujos | UX/QA | Feedback usuarios, reporte usabilidad |
| **Accessibility Testing** | Validación de conformidad WCAG 2.1 (si aplica) | QA Specialist | Reporte WAVE, axe results |
| **Compatibility Testing** | Validación en múltiples navegadores/dispositivos | QA Engineers | Matriz compatibilidad |
| **Sanity Testing** | Verificación rápida post-corrección de defecto | Developer | Log de ejecución |

---

## 6.2 Métodos y Técnicas de Prueba para Detectar Errores

### 6.2.1 Técnicas de Diseño de Casos de Prueba

El proyecto CF_V1.0.2 utiliza las siguientes técnicas basadas en IEEE 1008-1987 (Software Unit Testing):

#### **Equivalence Partitioning**
Agrupa valores de entrada en conjuntos equivalentes donde se espera comportamiento similar.

**Ejemplo - Módulo Gestión de Clientes:**
```
Entrada: Edad del cliente
Particiones válidas:   [18-65] años
Particiones inválidas: [<18], [>65]
Casos de prueba:
  • Edad = 18 (límite inferior válido) ✓
  • Edad = 17 (límite inferior inválido) ✗
  • Edad = 65 (límite superior válido) ✓
  • Edad = 66 (límite superior inválido) ✗
```

#### **Boundary Value Analysis**
Enfatiza valores en límites de particiones, donde frecuentemente ocurren errores.

**Ejemplo - Cantidad de Materia Prima:**
```
Rango válido: 1 - 9999 unidades
Casos límite:
  • 0 unidades (debajo mínimo) ✗
  • 1 unidad (mínimo válido) ✓
  • 9999 unidades (máximo válido) ✓
  • 10000 unidades (sobre máximo) ✗
```

#### **Decision Table Testing**
Documenta todas las combinaciones de entradas y salidas esperadas para lógica compleja.

**Ejemplo - Auditoría de Orden de Trabajo:**
```
┌──────────────────┬──────────┬──────────┬──────────┬──────────┐
│ Estado Actual    │ PENDIENT │ EN CURSO │ PAUSADA  │ COMPLETD │
├──────────────────┼──────────┼──────────┼──────────┼──────────┤
│ Puede avanzar    │ SÍ → ICC  │ SÍ → PAS │ SÍ → ICC  │ NO      │
│ Puede retroceder │ NO       │ SÍ → PEN │ SÍ → PEN │ SÍ → PEN│
│ Puede cancelar   │ SÍ       │ SÍ       │ NO       │ NO      │
│ Permiso requerido│ Manager  │ Manager  │ Técnico  │ Admin   │
└──────────────────┴──────────┴──────────┴──────────┴──────────┘

Test Cases:
  TC1: PENDIENTE + Avanzar + Manager → ÉXITO (ICC)
  TC2: EN_CURSO + Retroceder + Manager → ÉXITO (PENDIENTE)
  TC3: COMPLETADA + Avanzar → FALLO (No permitido)
```

#### **State Transition Testing**
Valida cambios válidos entre estados del sistema.

**Ejemplo - Autenticación:**
```
Estados: [Desautenticado] → [Autenticando] → [Autenticado] → [Expirado]

Transiciones válidas:
  • Desautenticado → Autenticando: Login attempt
  • Autenticando → Autenticado: Credentials OK
  • Autenticado → Expirado: Token expiration
  • Expirado → Autenticando: Re-login

Transiciones inválidas:
  • Autenticado → Autenticando (no sin logout)
  • Desautenticado → Autenticado (sin credenciales)
```

#### **Use Case Testing**
Desarrolla casos de prueba basados en casos de uso del SRS.

**Ejemplo - Caso de Uso: "Crear Nueva Orden de Trabajo"**
```
Precondiciones:
  • Usuario autenticado como Manager
  • BD disponible
  • Cliente existe en sistema

Flujo Principal:
  1. Usuario selecciona "Nueva Orden"
  2. Sistema abre formulario OT
  3. Usuario completa campos obligatorios
  4. Usuario selecciona materia prima del inventario
  5. Usuario asigna técnico responsable
  6. Usuario confirma creación
  7. Sistema guarda OT con estado PENDIENTE
  8. Sistema muestra confirmación

Casos Prueba:
  • CP1: Flujo feliz (todos campos válidos)
  • CP2: Cliente no seleccionado → ERROR
  • CP3: Materia prima insuficiente en stock → WARNING
  • CP4: Técnico no disponible → AVISO
  • CP5: Cancelar a mitad del formulario → No crear OT
```

---

### 6.2.2 Técnicas de Ejecución de Pruebas

#### **Black Box Testing**
Pruebas sin conocimiento de código interno. Enfoque en entradas/salidas.

**Aplicación en CF_V1.0.2:**
- QA Engineers prueban endpoints API sin ver código backend
- Testers validan interfaz React sin conocer lógica JavaScript interna
- Validación de respuestas HTTP contra especificación OpenAPI

#### **White Box Testing**
Pruebas con conocimiento del código interno. Enfoque en cobertura de código.

**Aplicación en CF_V1.0.2:**
- Desarrolladores escriben pruebas unitarias (JUnit 5)
- Cobertura de ramas condicionales (if/else, switch)
- Pruebas de excepciones y path del error
- Validación de ciclos (loops)

**Métricas de Cobertura esperadas:**
- Línea (Line Coverage): ≥ 70%
- Rama (Branch Coverage): ≥ 65%
- Método (Method Coverage): ≥ 75%

#### **Gray Box Testing**
Combinación de black box y white box. Conocimiento parcial de estructura interna.

**Aplicación en CF_V1.0.2:**
- Pruebas de integración que validan contratos API
- Pruebas de BD que validan constraints y triggers
- Pruebas que validan flujos críticos de negocio

---

## 6.3 Desarrollo de Conjuntos de Datos de Prueba

### 6.3.1 Estrategia de Datos de Prueba

Los datos de prueba para CF_V1.0.2 se gestionan según:

#### **Datos para Pruebas Unitarias**
- **Origen:** Datos sintetizados/mocks
- **Volumen:** Mínimo necesario para cobertura
- **BD:** En memoria (H2 para unitarias)
- **Responsable:** Developer
- **Limpieza:** Automática post-ejecución

**Ejemplo:**
```java
@Test
void testCalcularCostoOT() {
    // Arrange - Datos de prueba sintéticos
    OrdenTrabajo ot = new OrdenTrabajo(
        id: "OT-001",
        horasEstimadas: 8.5,
        tarifaHora: 50.00,
        materiaPrima: List.of(
            new Item("Pintura Roja", cantidad: 5, valor: 25.00),
            new Item("Disolvente", cantidad: 2, valor: 10.00)
        )
    );
    
    // Act
    BigDecimal costo = ot.calcularCostoTotal();
    
    // Assert
    assertEquals(new BigDecimal("665.00"), costo);
}
```

#### **Datos para Pruebas de Integración**
- **Origen:** Mezcla de datos reales y sintéticos
- **Volumen:** Representativo (50-100 registros por tabla)
- **BD:** PostgreSQL testdb en contenedor Docker
- **Responsable:** QA Lead + Developer
- **Limpieza:** Datos reset entre suites

**Data Setup Script:**
```sql
-- test-data-setup.sql
DELETE FROM ordenes_trabajo;
DELETE FROM clientes;
DELETE FROM materias_primas;

INSERT INTO clientes VALUES
  (1, 'Taller López', '0987654321', 'lopez@email.com', true),
  (2, 'Pintura Industrial SA', '0912345678', 'contacto@pintura.com', true),
  (3, 'Cliente Inactivo', '0999999999', 'inactivo@email.com', false);

INSERT INTO materias_primas VALUES
  (1, 'Pintura Roja 1L', 'PINT-001', 50.00, 100, 10),
  (2, 'Pintura Azul 1L', 'PINT-002', 50.00, 80, 10),
  (3, 'Disolvente 500ml', 'DISOL-001', 15.00, 200, 20);

INSERT INTO ordenes_trabajo VALUES
  (1, 1, '2026-01-15', 'En proceso', ...),
  (2, 2, '2026-01-20', 'Completada', ...);
```

#### **Datos para Pruebas Funcionales**
- **Origen:** Datos realistas que reflejan negocio real
- **Volumen:** Suficiente para validar todos flujos (500+ registros)
- **BD:** PostgreSQL staging
- **Responsable:** QA Engineers
- **Limpieza:** Snapshot pre-prueba, restauración post-prueba

**Ejemplo Test Data Set:**
- 10 clientes variados (activos/inactivos)
- 50 órdenes de trabajo en diferentes estados
- 30 items de materia prima con stock variable
- 20 usuarios con diferentes roles (Admin, Manager, Técnico)
- Datos históricos para validar reportes

#### **Datos para Pruebas de Rendimiento**
- **Origen:** Datos sintetizados a escala (Data Generation Tools)
- **Volumen:** 100K+ registros (escalado)
- **BD:** PostgreSQL con datos reales en volumen
- **Responsable:** Performance Engineer
- **Herramientas:** Apache JMeter Data Generators, Faker libraries

**Generador de Datos para Carga:**
```groovy
// Groovy script para generar datos masivos
1000.times { i ->
  sql.execute("""
    INSERT INTO clientes (nombre, telefono, email, activo)
    VALUES ('Cliente ${i}', '${generatePhone()}', '${generateEmail()}', true)
  """)
}
```

### 6.3.2 Gestión de Datos Sensibles

**Política:**
- No usar datos reales de producción en desarrollo/testing
- Datos personales: Nombre genérico, email fake, teléfono sintético
- Datos financieros: Valores realistas pero no auténticos
- Contraseñas: Hashes de prueba, nunca reales

**Ejemplos de Datos Seguros:**
- ✅ cliente: "Cliente Test", email: "test@example.com", teléfono: "0999999999"
- ❌ cliente: "Juan Pérez", email: "juan@corpreal.com", teléfono: "0987654321"

---

## 6.4 Monitoreo de Recursos del Sistema

Durante la ejecución de pruebas, SQA monitorea recursos críticos:

### 6.4.1 Métricas de Rendimiento Backend

**Durante Pruebas de Integración/Carga:**

| Métrica | Herramienta | Objetivo | Alerta |
| --- | --- | --- | --- |
| **CPU** | JMeter, Docker stats | < 80% | > 85% |
| **Memoria Heap** | JVM monitoring, New Relic | < 70% | > 80% |
| **Memoria Libre (OS)** | Top, htop | > 20% | < 15% |
| **Conexiones BD** | PostgreSQL monitoring | < 50/max | > 60/max |
| **I/O Disk** | iostat | < 70% utilización | > 80% |
| **Tiempo Respuesta P95** | JMeter | < 2 segundos | > 3 seg |
| **Garbage Collection** | JVM logs | < 10% overhead | > 20% overhead |

**Método de Captura:**
```bash
# Terminal 1: Monitoreo CPU/Memoria en tiempo real
watch -n 1 'ps aux | grep java'

# Terminal 2: Conexiones PostgreSQL
psql -U postgres -d cf_v1_test -c "SELECT count(*) FROM pg_stat_activity;"

# Terminal 3: Logs de JVM
tail -f app.log | grep "GC\|OutOfMemory"

# Terminal 4: JMeter reporting
jmeter -g results.jtl -o htmlreport/
```

### 6.4.2 Métricas de Rendimiento Frontend

**Durante Pruebas de Rendimiento Frontend:**

| Métrica | Herramienta | Objetivo | Alerta |
| --- | --- | --- | --- |
| **LCP (Largest Contentful Paint)** | Lighthouse, WebVitals API | < 2.5s | > 4s |
| **FID (First Input Delay)** | Lighthouse, WebVitals API | < 100ms | > 300ms |
| **CLS (Cumulative Layout Shift)** | Lighthouse, WebVitals API | < 0.1 | > 0.25 |
| **Bundle Size** | Webpack, Bundle Analyzer | < 500KB gzip | > 700KB |
| **Time to Interactive** | Lighthouse | < 3.5s | > 5s |
| **Memory (JS Heap)** | Chrome DevTools | < 100MB | > 150MB |

**Captura de Métricas:**
```javascript
// En aplicación React - Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log); // Layout shift
getFID(console.log); // Input delay
getFCP(console.log); // Paint
getLCP(console.log); // Largest paint
getTTFB(console.log); // Time to first byte

// DevTools Console
performance.measureUserAgentSpecificMemory();
```

### 6.4.3 Métricas de Base de Datos

**Durante Pruebas:**

| Métrica | Query | Objetivo | Acción |
| --- | --- | --- | --- |
| **Conexiones activas** | `SELECT count(*) FROM pg_stat_activity;` | < 10 | Revisar queries lentas |
| **Índices no usados** | `SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;` | 0 | Dropear índices innecesarios |
| **Queries lentas** | `SELECT query, mean_time FROM pg_stat_statements;` | < 500ms | Optimizar |
| **Tamaño BD** | `SELECT pg_size_pretty(pg_database_size(current_database()));` | < 5GB | Revisión archivos |
| **Bloqueos** | `SELECT * FROM pg_locks WHERE NOT granted;` | 0 | Deadlock investigation |
| **Transacciones largas** | `SELECT now() - xact_start FROM pg_stat_activity;` | < 1 min | Kill si > 5 min |

**Monitoreo PostgreSQL:**
```bash
# Comando para monitoreo en tiempo real
watch -n 1 'psql -U postgres -c "SELECT datname, numbackends FROM pg_stat_database WHERE datname = '"'"'cf_v1_test'"'"';"'

# Queries lentas
psql -U postgres -d cf_v1_test << EOF
CREATE EXTENSION pg_stat_statements;
SELECT query, calls, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;
EOF
```

---

## 6.5 Auditoría de Pruebas por SQA

SQA realiza auditoría continua de actividades de prueba:

### 6.5.1 Checklist de Auditoría SQA

**Auditoría de Plan de Pruebas:**
- [ ] Plan conforme IEEE 829-2008
- [ ] Estrategia de pruebas clara y razonable
- [ ] Alcance de pruebas definido (funcionalidad a probar)
- [ ] Criterios de entrada/salida establecidos
- [ ] Casos de prueba trazables a requisitos
- [ ] Datos de prueba documentados y controlados
- [ ] Ambiente de prueba especificado
- [ ] Recursos asignados (personas, herramientas)
- [ ] Cronograma realista y comunicado

**Auditoría de Ejecución de Pruebas:**
- [ ] Pruebas ejecutadas por personal calificado
- [ ] Ambiente de prueba conforme especificación
- [ ] Datos de prueba correctos (origen, integridad, confidencialidad)
- [ ] Resultados documentados completamente (pass/fail/inconcluso)
- [ ] Defectos registrados en P/CR sistema
- [ ] Evidencia disponible (logs, screenshots, datos de salida)
- [ ] Pruebas de regresión ejecutadas post-corrección
- [ ] Suite de pruebas bajo control de configuración (Git)
- [ ] No hay desviaciones del plan documentadas

**Auditoría de Documentación:**
- [ ] Reporte de pruebas conforme IEEE 829-2008
- [ ] Resumen ejecutivo claro
- [ ] Matriz de trazabilidad requisitos-pruebas completa
- [ ] Defectos reportados con suficiente detalle
- [ ] Estadísticas de prueba (casos ejecutados, % pass, defectos por severidad)
- [ ] Recomendaciones (liberar, condicionalmente liberar, no liberar)
- [ ] Firmado por QA Lead y revisado por SQA

### 6.5.2 Testigos de SQA en Pruebas Críticas

Para pruebas de aceptación final, SQA designa testigos:

**Pruebas Atestiguadas por SQA:**
1. Pruebas funcionales (System Acceptance Testing)
2. Pruebas de rendimiento (Performance baseline)
3. Pruebas de seguridad (OWASP Top 10)
4. Cualquier prueba post-corrección crítica

**Actividades del Testigo SQA:**
- Verificar conformidad con plan de pruebas
- Observar ejecución de casos críticos
- Validar datos de entrada y salida
- Confirmar documentación de resultados
- Reportar cualquier desviación
- Firmar acta de ejecución

---

## 6.6 Gestión de Defectos (Problem/Change Reports)

Ver sección anterior "GESTIÓN DE DEFECTOS" en Tabla 6-1.

**Resumen:**
- Todo defecto → P/CR registrado
- Trazabilidad P/CR → Corrección → Regresión → Cierre
- SQA verifica cierre y efectividad de corrección
- P/CRs bajo CM (repositorio issues)

---

## 6.7 Control de Documentación de Pruebas

Toda documentación de pruebas bajo Configuration Management:

**Artefactos Controlados:**
- Plan de Pruebas (IEEE 829)
- Especificaciones de Caso de Prueba
- Scripts de Prueba Automatizada (Git)
- Datos de Prueba (DB snapshots versionadas)
- Reportes de Prueba Ejecutada
- Logs de Ejecución
- Evidencia (Screenshots, videos)

**Control:**
- Cambios a plan → Acta de cambio + aprobación
- Nuevos casos → Revisión por pares
- Cierre de suite → Tag en Git
- Archivado → Repositorio histórico

---

## 6.8 Matriz de Trazabilidad Requisitos-Pruebas

Cada requisito del SRS mapea a al menos UN caso de prueba:

```
SRS Requisito                          Prueba Unitaria         Prueba Integración    Prueba Funcional
────────────────────────────────────────────────────────────────────────────────────────────────────
REQ-001: Crear Cliente                 -                       IT-001-CreateClient   FT-001-NewClient
REQ-002: Validar Email Cliente         UT-ClientValidator      IT-002-ValidEmail     FT-002-EmailError
REQ-003: Listar Clientes Activos       UT-ClientFilter         IT-003-ListActive     FT-003-ClientList
REQ-004: Calcular Costo OT             UT-CostCalculator       IT-004-CostDetail     FT-004-OTCost
REQ-005: Generar PDF Reporte           UT-PDFGenerator         IT-005-ReportGen      FT-005-ReportPDF
REQ-006: Autenticar Usuario            UT-AuthService          IT-006-LoginFlow      FT-006-AuthFlow
...
────────────────────────────────────────────────────────────────────────────────────────────────────
Cobertura: 100% requisitos tienen al menos una prueba
```

---

## Referencias Aplicables

Este Plan de Pruebas (Sección 6) se apoya en:
- **(e)** Este SQA Plan (todas las secciones)
- **(b)** IEEE/EIA 12207 (Procesos del Ciclo de Vida de Software)
- **(o)** MIL-STD-498 (Métrica y Control de Pruebas)
- **IEEE 829-2008** (IEEE Standard for Software Test Documentation)
- **IEEE 1008-1987** (IEEE Standard for Software Unit Testing)
- **ISTQB Certified Tester Syllabus** (Conceptos y mejores prácticas)
- **OWASP Testing Guide** (Para pruebas de seguridad)
- **W3C Web Performance Working Group** (Para pruebas frontend)
- Sección 3 de este documento (Evaluaciones SQA por fase)
- Sección 5 de este documento (Métricas)
