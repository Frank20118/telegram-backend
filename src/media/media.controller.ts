import { Express } from 'express';
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Controller('media')
export class MediaController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, `${uuid()}${extname(file.originalname)}`)
  })
}))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  return { filename: file.filename, path: file.path };
}

        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename, path: file.path };
  }
}


