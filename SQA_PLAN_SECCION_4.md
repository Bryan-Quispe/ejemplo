# Sección 4. DOCUMENTACIÓN

La documentación que describe y respalda el software del proyecto CF_V1.0.2 o el proceso de desarrollo se creará y actualizará periódicamente durante el ciclo de vida del proyecto. Las Tablas 4-1 y 4-2 identifican los productos de software entregables y no entregables, así como los estándares, guías y/o DIDs aplicables. Si se requiere documentación adicional no listada, SQA apoyará en la identificación de especificaciones, estándares y DIDs aplicables.

## Tabla 4-1. Productos de software entregables

| NOMENCLATURA (CI) | DOCUMENTACIÓN ENTREGABLE | DID / ESTÁNDAR / GUÍA | LINEAMIENTOS DE TAILORING |
| --- | --- | --- | --- |
| CF_V1.0.2-FE | Especificación de Requisitos de Software (SRS) | IEEE 830-1998 (o ISO/IEC/IEEE 29148) | Adaptación a proyecto académico: se priorizan requisitos funcionales y criterios de aceptación. |
| CF_V1.0.2-FE | Diseño de Software / Arquitectura (SDD) | IEEE 1016-2009 | Se documenta arquitectura lógica y componentes (frontend React + backend Spring). |
| CF_V1.0.2-BE | Especificación de Interfaces/API | OpenAPI 3.0 / REST Guidelines | Se documentan endpoints usados por el frontend. |
| CF_V1.0.2 | Plan de Pruebas | IEEE 829-2008 (o ISO/IEC/IEEE 29119) | Enfoque en pruebas funcionales y de integración. |
| CF_V1.0.2 | Informe de Pruebas | IEEE 829-2008 (o ISO/IEC/IEEE 29119) | Reporte consolidado por iteración. |
| CF_V1.0.2 | Manual de Usuario | IEEE 1063-2001 | Manual breve y orientado a tareas. |
| CF_V1.0.2 | Manual Técnico / Instalación | Buenas prácticas DevOps | Incluye pasos de build, ejecución local y docker-compose. |
| CF_V1.0.2 | Plan de Gestión de Configuración (CM Plan) | IEEE 828-2012 | Incluye versionado y control de cambios. |
| CF_V1.0.2 | Plan de Aseguramiento de Calidad (SQA Plan) | IEEE 730-2014 | Sección 4 incluida en este documento. |

## Tabla 4-2. Productos de software no entregables

| TÍTULO DEL DOCUMENTO |
| --- |
| Minutas de reuniones y acuerdos internos |
| Registros de revisiones por pares |
| Checklists internos de revisión |
| Bitácora de incidencias / issues internos |
| Evidencias temporales de pruebas (logs locales) |

## Adecuación y revisión de documentos

Todos los documentos serán verificados para su adecuación mediante revisión por pares conforme al Proceso de Peer Review. La revisión considera, como mínimo, los siguientes criterios:

- Cumplimiento del estándar/guía aplicable.
- Consistencia interna y con los requisitos del proyecto.
- Trazabilidad entre requisitos, diseño, pruebas y entregables.
- Claridad, completitud y ausencia de ambigüedad.

Al finalizar la revisión por pares, SQA registra y reporta a SEPO las métricas de la revisión (ítem revisado, número de errores detectados, fase de revisión, número de reportes cerrados y abiertos).

Una vez aprobada la revisión por pares, el producto de software se entrega a SCM y se coloca bajo control de configuración. Posteriormente, se gestiona según el proceso de aprobación y liberación descrito en el CM Plan.
