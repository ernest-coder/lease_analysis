import { Component } from '@angular/core';

@Component({
  selector: 'app-uplad-file',
  templateUrl: './uplad-file.component.html',
  styleUrls: ['./uplad-file.component.scss']
})
export class UpladFileComponent {
    // This is called when a file is selected via the browse button
    onFileSelected(event: any) {
      const files = event.target?.files;
      if (files && files.length > 0) {
        this.handleFileUpload(files[0]);
      }
    }
    
    onDrop(event: DragEvent) {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (files && files.length > 0) {
        this.handleFileUpload(files[0]);
      }
    }
    
  
    // Prevent default behavior for drag over to allow drop
    onDragOver(event: DragEvent) {
      event.preventDefault();
    }
  
    // Handle the case when the drag leaves the drop zone
    onDragLeave(event: DragEvent) {
      event.preventDefault();
    }
  
    // Handle file upload logic (you can modify this to suit your needs)
    handleFileUpload(file: File) {
      console.log('File selected or dropped:', file);
      // You can now upload the file or perform further actions here
    }
}
