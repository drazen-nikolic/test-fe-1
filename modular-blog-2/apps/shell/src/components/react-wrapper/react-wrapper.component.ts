import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  templateUrl: './react-wrapper.component.html',
  styleUrl: './react-wrapper.component.css',
})
export class ReactWrapperComponent implements OnInit {
  postId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    // Get the postId parameter
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId');
    });

    await loadRemote('admin/Module');
  }
}
