async function obtenerSecciones() {
  try {
    const response = await fetch('https://sss.espe.edu.ec/StudentSelfService/ssb/studentAttendanceTracking/getRegisteredSections?filterText=27917&pageMaxSize=10&pageOffset=0&sortColumn=courseReferenceNumber&sortDirection=asc', {
      method: 'GET',
      headers: {
        'Cookie': 'JSESSIONID=1BCEC82882AE73B84EC9D5EC89716609',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://sss.espe.edu.ec/StudentSelfService/'
      }
    });

    const data = await response.json();
    
    if (data.success) {
      console.log(`Total de secciones: ${data.totalCount}`);
      
      data.data.forEach((seccion, index) => {
        console.log(`\n--- Sección ${index + 1} ---`);
        console.log(`Materia: ${seccion.subjectDesc}`);
        console.log(`Título: ${seccion.sectionTitle}`);
        console.log(`Faltas: ${seccion.missed}`);
        console.log(`Porcentaje asistencia: ${seccion.percentage}%`);
        console.log(`Horario: ${seccion.time}`);
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

obtenerSecciones();