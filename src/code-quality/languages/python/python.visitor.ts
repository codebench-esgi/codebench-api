import { parse, createVisitor } from 'python-ast';
import { QualityDTO } from '../../dto/quality.dto';
import { CommonQualityFunction } from '../common/CommonQualityFunction';

export class PythonVisitor {
  private codeQuality: QualityDTO;

  run(source: string): QualityDTO {
    const astTree = parse(source);

    this.codeQuality = {
      score: 100,
    };

    createVisitor({
      visitFuncdef: (ctx) => {
        const lines = ctx.text.split('\n');
        lines.forEach((line) => {
          if (line.startsWith('def')) {
            const funcNameRaw = line.substring(3);
            const funcName = funcNameRaw.split('(')[0];
            console.log(funcName);
            // If function name is not written is snake case => quality -3
            if (!CommonQualityFunction.isSnakeCase(funcName)) {
              this.codeQuality.score -= 3;
            }
          }
        });
      },
    }).visit(astTree);

    return this.codeQuality;
  }
}
